import "./fragman.css";

const Fragman = ({ fragmanKey }) => {
  return (
    <div className="video-div">
      <iframe
        src={`https://www.youtube.com/embed/${fragmanKey}?autoplay=1&mute=1`}
        width={"100%"}
        height="100%"
        title={fragmanKey}
      ></iframe>
    </div>
  );
};

export default Fragman;
