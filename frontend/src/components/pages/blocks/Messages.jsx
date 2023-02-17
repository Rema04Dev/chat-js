import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useSocket from '../../../hooks/useSocket.hook';
import MessagesSkeleton from '../../skeletons/MessagesSkeleton'
import MessagesHeader from './MessagesHeader';
// import MessagesBox from './MessagesBox';
import MessagesForm from './MessagesForm';
import { useEffect } from 'react';
const Messages = () => {
    const { message } = useSocket();
    const { channels, currentChannelId } = useSelector(state => state.channels)
    const { messages, loadingStatus, error } = useSelector(state => state.messages);
    useEffect(() => {
        message.listen()
    }, [message]);

    const currentMessages = messages
        .filter((message) => message.channelId === currentChannelId);

    const currentChannel = channels
        .find((channel) => channel.id === currentChannelId);

    const renderMessages = () => {
        if (loadingStatus === 'loading') {
            return <MessagesSkeleton />
        }
        const elements = currentMessages
            .map(({ id, body, username }) => (
                <div key={id} className="text-break mb-2"><b>{username}</b>: {body}</div>
            ));
        return elements
    };

    return (
        <Col className='p-0 h-100'>
            <div className="d-flex flex-column h-100">
                {/* <MessagesHeader count={currentMessages.length} channelName={currentChannel.name} /> */}
                {/* <MessagesBox /> */}
                <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ minHeight: '60vh' }}>
                    {renderMessages()}
                </div>
                <MessagesForm />
            </div>
        </Col>
    )
}

export default Messages;