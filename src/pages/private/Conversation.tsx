import { io, Socket } from 'socket.io-client';
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { LuArrowLeft, LuSend } from 'react-icons/lu';
import axios from 'axios';
import axiosWithCSRFtoken from '../../utils/request/axios-with-csrf-token';
import { useSettingsStore } from '../../store';
import {
  ConversationWithMessagesType,
  MessageType,
  MessageWebSocketType,
} from '../../types';
import imageDefaultProject from '../../assets/images/default-project-image.jpg';

// eslint-disable-next-line react-refresh/only-export-components
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
    <div className="dv-surface flex h-[calc(100dvh-8.5rem)] flex-col overflow-hidden lg:h-[calc(100dvh-5rem)]">
      <div className="flex h-0 flex-grow flex-col">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3 dark:border-night-line sm:px-6">
          <Link
            to="/dashboard/conversation"
            className="dv-icon-btn -ml-2 shrink-0"
            aria-label="Retour aux conversations"
          >
            <LuArrowLeft />
          </Link>
          <img
            src={conversation.image || imageDefaultProject}
            alt=""
            className="h-11 w-11 shrink-0 rounded-xl object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <h2 className="truncate">
              <Link
                to={`/dashboard/project/${conversation.project_slug}`}
                className="font-display text-lg font-bold underline-offset-4 hover:underline"
              >
                {conversation.title}
              </Link>
            </h2>
            <h3 className="truncate">
              <Link
                to={`/dashboard/user/${conversation.user_slug}`}
                className="dv-muted text-sm underline-offset-4 hover:underline"
              >
                {conversation.pseudo}
              </Link>
            </h3>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto bg-paper px-4 py-6 dark:bg-night sm:px-6"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-5 flex flex-col ${message.isMe ? 'items-end' : 'items-start'} animate-fadeInSlideUp`}
            >
              <p
                className={`w-fit max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed sm:max-w-md ${
                  message.isMe
                    ? 'rounded-br-md bg-pollen text-ink'
                    : 'rounded-bl-md border border-line bg-white2 dark:border-night-line dark:bg-night-surface'
                }`}
              >
                {message.content}
              </p>
              <span className="dv-muted mt-1.5 px-1 text-xs">
                {message.date}
              </span>
            </div>
          ))}
        </div>
      </div>
      <form
        className="flex items-center gap-2 border-t border-line p-3 dark:border-night-line"
        onSubmit={(e) => handleSendMessage(e)}
      >
        <input
          type="text"
          className="dv-input rounded-full"
          placeholder="Écrire un message"
          aria-label="Message"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Envoyer le message"
          className="dv-btn-primary h-12 w-12 shrink-0 px-0"
        >
          <LuSend />
        </button>
      </form>
    </div>
  );
}

export default Conversation;
