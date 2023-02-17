import ContentLoader from "react-content-loader"

const MessagesSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#c2c2c2"
        foregroundColor="#383838"
        {...props}
    >
        <rect x="25" y="15" rx="5" ry="5" width="220" height="14" />
        <rect x="25" y="45" rx="5" ry="5" width="320" height="14" />
        <rect x="25" y="75" rx="5" ry="5" width="180" height="14" />
        <rect x="25" y="105" rx="5" ry="5" width="240" height="14" />
    </ContentLoader>
)

export default MessagesSkeleton;