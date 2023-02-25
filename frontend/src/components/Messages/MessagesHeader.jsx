import { useTranslation } from 'react-i18next';
import MessagesHeaderSkeleton from '../skeletons/MessagesHeaderSkeleton.jsx.jsx';

const MessagesHeader = ({ currentMessages, currentChannel }) => {
  const { t } = useTranslation();
  if (!currentChannel) {
    return <MessagesHeaderSkeleton channelName="m-0" />;
  }

  const count = currentMessages.length;
  const channelName = currentChannel.name;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          { channelName }
        </b>
      </p>
      <span className="text-muted">{t('messagesCount.key', { count })}</span>
    </div>
  );
};

export default MessagesHeader;
