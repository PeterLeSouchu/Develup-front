import { io, Socket } from 'socket.io-client';
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import axios from 'axios';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../store';
import {
  ConversationWithMessagesType,
  MessageType,
  MessageWebSocketType,
} from '../../types';
import imageDefaultProject from '../../assets/images/default-project-image.jpg';

export const loadMessages = async ({ params }: LoaderFunctionArgs) => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithCSRFtoken.get(`/conversation/${params.id}`);
    const conversation = data.result;
    return conversation;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      setGlobalErrorMessage(message);
      return 'erreur inattendu';
    }
    setGlobalErrorMessage('Erreur innatendu, essayez de vous reconnecter');
    return 'erreur inattendu';
  }
};

function Conversation() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const conversation = useLoaderData() as ConversationWithMessagesType;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { setGlobalErrorMessage } = useSettingsStore();
  const [inputValue, setinputValue] = useState<string>('');
  const { id: conversationId } = useParams();
  const [socket, setSocket] = useState<Socket>();

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    socket!.emit('newMessage', { message: inputValue, conversationId });
    setinputValue('');
  }

  useEffect(() => {
    const socketInstance = io(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true,
    });
    setSocket(socketInstance);
    let userId: string;

    async function getUserId() {
      const { data } = await axiosWithCSRFtoken.get('/get-user-id');
      userId = data.userId;
    }

    const handleNewMessage = (incomingMessage: MessageWebSocketType) => {
      const isMe = incomingMessage.user_id === userId;

      const { user_id: authorId, ...restOfMessage } = incomingMessage;

      const newMessage: MessageType = { ...restOfMessage, isMe };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socketInstance.on('connect', () => {
      socketInstance.emit('joinConversation', conversation.id);
    });

    socketInstance.on('newMessage', handleNewMessage);

    socketInstance.on('error', (errorMessage: string) => {
      setGlobalErrorMessage(errorMessage);
    });

    setMessages(conversation.messages);
    getUserId();
    return () => {
      socketInstance.off('newMessage', handleNewMessage);
      socketInstance.off('error');
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow flex flex-col h-0">
        <div className="flex justify-center items-center border-b-2 border-slate-300 pb-5">
          <img
            src={conversation.image || imageDefaultProject}
            alt="Profil"
            className="w-20 h-14 object-cover rounded-lg mr-4"
          />
          <div className="truncate flex flex-col">
            <h2 className="inline-block">
              <Link
                to={`/dashboard/project/${conversation.project_slug}`}
                className="text-2xl truncate max-w-full hover:text-darkgold transition dark:hover:text-gold "
              >
                {conversation.title}
              </Link>
            </h2>
            <h3 className="inline-block">
              <Link
                to={`/dashboard/user/${conversation.user_slug}`}
                className="text-md truncate max-w-full hover:text-darkgold transition dark:hover:text-gold "
              >
                {conversation.pseudo}
              </Link>
            </h3>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="lol overflow-y-auto flex-grow px-4 pt-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex  my-8 flex-col ${message.isMe ? 'items-end' : 'item-start'} `}
            >
              <p className="sm:max-w-72 max-w-36 flex-shrink-0  break-words md:text-base text-sm rounded-xl p-3 bg-lightgold dark:bg-shadowGold dark:text-black">
                {message.content}
              </p>
              <span className="text-xs mt-2 pl-3">{message.date}</span>
            </div>
          ))}
        </div>
      </div>
      <form className="relative" onSubmit={(e) => handleSendMessage(e)}>
        <input
          type="text"
          className="w-full rounded-lg h-14 p-2 pr-10 dark:text-black outline-none"
          placeholder="Envoyez un message ..."
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 dark:text-black"
        >
          <BiSolidSend />
        </button>
      </form>
    </div>
  );
}

export default Conversation;
