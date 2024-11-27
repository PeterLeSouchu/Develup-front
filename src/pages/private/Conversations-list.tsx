import axios from 'axios';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import { useSettingsStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { ConversationType } from '../../types';
import imageDefaultProject from '../../assets/images/default-project-image.jpg';
import Loader from '../../components/all/loader/Loader';

// eslint-disable-next-line react-refresh/only-export-components
export const loadConversations = async () => {
  const { setGlobalErrorMessage } = useSettingsStore.getState();
  try {
    const { data } = await axiosWithoutCSRFtoken.get('/conversations');
    const conversations = data.result;

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
  const { state } = useNavigation();

  if (state === 'loading') {
    return <Loader />;
  }
  return (
    <section className="flex flex-col items-center gap-3 dark:text-black">
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            className=" relative rounded-r-full border-2 p-2 overflow-hidden  max-w-55 md:w-2/3 w-full mx-auto bg-white2 dark:bg-slate-200 hover:shadow-md hover:translate-x-[10px] transition duration-300 ease-in-out pr-10 "
          >
            <IoIosArrowForward className="text-4xl absolute right-2 top-1/2 -translate-y-1/2" />
            <Link
              to={`/dashboard/conversation/${conversation.id}`}
              className="w-full"
            >
              <div>
                <div className="flex justify-start items-center  ">
                  <img
                    src={conversation.image || imageDefaultProject}
                    alt={conversation.title}
                    className="w-20 h-14 object-cover rounded-lg mr-4 "
                  />
                  <h2 className="text-2xl truncate">{conversation.title}</h2>
                </div>
                <p className="text-sm mt-2 truncate w-full">
                  <span className="font-extrabold underline underline-offset-2">
                    {conversation.author_message_pseudo}
                  </span>{' '}
                  : {conversation.message}
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="dark:text-white">Aucune conversation</p>
      )}
    </section>
  );
}
export default ConversationsList;
