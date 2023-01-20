type prop = {
    src: string;
    title: string;
};

const YouTubePlayer = ({ src, title }: prop) => {
    return (
        <>
            <iframe
                src={src}
                title={title}
                frameBorder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <style jsx>
                {`
                    iframe {
                        width: 35rem;
                        aspect-ratio: 16 / 9;
                        border-radius: 4px;
                        box-shadow: 5px 5px 0px #ffe15d;
                        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                    }

                    iframe:hover {
                        transform: translate(-2px, -2px);
                        box-shadow: 10px 10px 0px #ffe15d;
                    }

                    @media screen and (width <= 700px) {
                        iframe {
                            width: 100%;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default YouTubePlayer;
