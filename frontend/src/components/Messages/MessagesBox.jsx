import { useRef, useEffect } from 'react';

const MessagesBox = ({ currentMessages }) => {
  const scrollTrigger = useRef();
  useEffect(() => {
    scrollTrigger.current.scrollIntoView({
      behaivor: 'smooth',
    });
  });

  const renderMessages = () => currentMessages
    .map(({ id, body, username }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        :
        {' '}
        {body}
      </div>
    ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ height: '50vh' }}>
      {renderMessages()}
      <span ref={scrollTrigger} />
    </div>
  );
};

export default MessagesBox;
