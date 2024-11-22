import axios from 'axios';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useLoaderData } from 'react-router-dom';
import { useSettingsStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { ConversationType } from '../../types';

export const loadConversations = async () => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithoutCSRFtoken.get('/conversations');
    const conversations = data.result;
    console.log(conversations);
    return conversations;
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

function ConversationsList() {
  const conversations = useLoaderData() as ConversationType[];

  return (
    <section className="flex flex-col gap-3 dark:text-black">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          to={`/dashboard/conversation/${conversation.id}`}
        >
          <div className=" relative rounded-r-full border-2 p-2 px-20 max-w-55 md:w-2/3 w-full md:mx-auto bg-white2 dark:bg-slate-200 dark:hover:bg-slate-300/80 hover:bg-gray-500/20 transition-all duration-200 ">
            <IoIosArrowForward className="text-4xl absolute right-6 top-1/2 -translate-y-1/2" />
            <div className="flex justify-center items-center  ">
              <img
                src={conversation.image}
                alt={conversation.title}
                className="w-32 rounded-lg mr-4 "
              />
              <div>
                <h2 className="md:text-4xl text-2xl">{conversation.title}</h2>
                <h3 className="md:text-xl underline underline-offset-2">
                  {conversation.user_project_pseudo}
                </h3>
              </div>
            </div>
            <p className="text-center mt-2 truncate">
              {conversation.author_message_pseudo} : {conversation.message}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
export default ConversationsList;
