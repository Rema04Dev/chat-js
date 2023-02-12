import ContentLoader from "react-content-loader"

const ChannelsSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#c2c2c2"
        foregroundColor="#383838"
        {...props}
    >
        <rect x="13" y="8" rx="5" ry="5" width="120" height="28" />
        <rect x="13" y="57" rx="5" ry="5" width="120" height="28" />
    </ContentLoader>
)

export default ChannelsSkeleton;