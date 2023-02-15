import { useSelector } from 'react'

const MessagesBox = () => {
    const messages = useSelector(state => state.messages.messages);
    const { currentChannelId } = useSelector(state => state.channels)

    const currentMessages = messages
        .filter((message) => message.channelId === currentChannelId);

    const renderMessages = () => currentMessages
        .map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2"><b>{username}</b>: {body}</div>
        ));

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ minHeight: '60vh' }}>
            {renderMessages()}
        </div>
    )
}

export default MessagesBox;