import { useSelector } from 'react-redux'
import { } from '../store/slices/messagesSlice'
const MessagesHeader = () => {
    const { channels, currentChannelId } = useSelector(state => state.channels)
    const messages = useSelector(state => state.messages.messages)

    const currentChannel = [...channels]
        .find((channel) => channel.id === currentChannelId)

    const currentChannelMessages = [...messages]
        .filter((message) => message.channelId === currentChannelId)

    return (
        <>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {currentChannel.name}</b>
                </p>
                <span className="text-muted">{currentChannelMessages.length} сообщение</span>
            </div>
        </>
    )
}

export default MessagesHeader