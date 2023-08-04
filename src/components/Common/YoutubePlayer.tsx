type prop = {
  src: string;
  title: string;
};

const YouTubePlayer = ({ src, title }: prop) => {
  return (
    <>
      <iframe
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="400"
        src={src}
        title={title}
        frameBorder="0"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <style jsx>
        {`
          iframe {
            outline: none;
            width: 40rem;
            aspect-ratio: 16 / 9;
            border: none;
            border-radius: 4px;
            box-shadow: 5px 5px 0px #ffe15d;
            transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) !important;
          }

          iframe:hover {
            transform: translate(-2px, -2px);
            box-shadow: 10px 10px 0px #ffe15d;
          }

          @media screen and (max-width: 1700px) {
            iframe {
              width: 35rem;
            }
          }

          @media screen and (max-width: 1200px) {
            iframe {
              width: 30rem;
            }
          }

          @media screen and (max-width: 1000px) {
            iframe {
              width: 25rem;
            }
          }

          @media screen and (max-width: 700px) {
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
