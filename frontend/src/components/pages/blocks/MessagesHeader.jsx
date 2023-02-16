const MessagesHeader = ({ channelName, count }) => {
    return (
        <>
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b># {channelName}</b>
                </p>
                <span className="text-muted">{count} сообщение</span>
            </div>
        </>
    )
}

export default MessagesHeader;