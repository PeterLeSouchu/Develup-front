import axios from 'axios';
import { LuChevronRight, LuInbox } from 'react-icons/lu';
import { Link, useLoaderData } from 'react-router-dom';
import { useSettingsStore } from '../../store';
import axiosWithoutCSRFtoken from '../../utils/request/axios-without-csrf-token';
import { ConversationType } from '../../types';
import imageDefaultProject from '../../assets/images/default-project-image.jpg';
import PageHeader from '../../components/private/ui/Page-header';

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

  return (
    <div>
      <PageHeader
        title="Conversations"
        subtitle="Vos échanges autour des projets."
        action={null}
      />
      {conversations.length > 0 ? (
        <ul className="dv-surface divide-y divide-line overflow-hidden dark:divide-night-line">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <Link
                to={`/dashboard/conversation/${conversation.id}`}
                className="group flex items-center gap-4 p-4 transition hover:bg-paper focus-visible:bg-paper focus-visible:outline-none dark:hover:bg-night-line/60 dark:focus-visible:bg-night-line/60 sm:px-6"
              >
                <img
                  src={conversation.image || imageDefaultProject}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-lg font-bold">
                    {conversation.title}
                  </h2>
                  <p className="dv-muted mt-0.5 truncate text-sm">
                    <span className="font-semibold text-ink dark:text-paper">
                      {conversation.author_message_pseudo}
                    </span>{' '}
                    : {conversation.message}
                  </p>
                </div>
                <LuChevronRight
                  aria-hidden
                  className="dv-muted shrink-0 text-xl transition group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="dv-surface flex flex-col items-center px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-pollen text-2xl text-ink">
            <LuInbox aria-hidden />
          </span>
          <p className="mt-5 font-display text-xl font-bold">
            Aucune conversation
          </p>
          <p className="dv-muted mt-1 max-w-sm">
            Contactez l&apos;auteur d&apos;un projet pour démarrer un échange.
          </p>
          <Link to="/dashboard/search" className="dv-btn-primary mt-6">
            Trouver un projet
          </Link>
        </div>
      )}
    </div>
  );
}
export default ConversationsList;
