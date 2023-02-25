import ContentLoader from 'react-content-loader';

const MessagesHeaderSkeleton = () => (
  <ContentLoader
    speed={2}
    width={100}
    height={100}
    viewBox="0 0 100 100"
    backgroundColor="#c2c2c2"
    foregroundColor="#383838"
  >
    <circle cx="20" cy="20" r="8" />
    <rect x="35" y="15" rx="5" ry="5" width="180" height="10" />
    <circle cx="20" cy="50" r="8" />
    <rect x="35" y="45" rx="5" ry="5" width="180" height="10" />
  </ContentLoader>
);

export default MessagesHeaderSkeleton;
