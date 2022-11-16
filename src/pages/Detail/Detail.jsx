import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Fragman from "../../components/Fragman/Fragman";
import "./detail.css";

const Detail = () => {
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [fragman, setFragman] = useState("");
  const { id } = useParams();
  const getFilm = async () => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    try {
      const { data } = await axios(url);
      setFilm(data);
    } catch (error) {}
  };
  const getFragman = async () => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
    try {
      const { data } = await axios(url);
      setFragman(data.results[0].key);
    } catch (error) {}
  };
  useEffect(() => {
    getFilm();
    getFragman();
    // eslint-disable-next-line
  }, []);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="detail-container">
      <h1>{film?.original_title}</h1>
      <div>{fragman && <Fragman fragmanKey={fragman} />}</div>
      <div className="film-detail">
        <p className="border">
          {" "}
          <b>Release Date</b> : {film?.release_date}{" "}
        </p>
        <p className="border">
          {" "}
          <b>Overview</b> : {film?.overview}
        </p>
        <p className="border">
          {" "}
          <b>Companies</b> :
          {film?.production_companies.map((item, index) => {
            return (
              <span key={index}>
                {" "}
                {index + 1} {"-"} {item.name} &emsp;
              </span>
            );
          })}
        </p>
        <p className="border">
          {" "}
          <b>Countries</b> :
          {film?.production_countries.map((item, index) => {
            return (
              <span key={index}>
                {index + 1} {"-"} {item.name} &emsp;
              </span>
            );
          })}
        </p>
        <button className="link" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button className="link" onClick={() => navigate("/")}>
          Go Home
        </button>
        {film?.homepage && (
          <button onClick={() => openInNewTab(film?.homepage)} className="link">
            {" "}
            Go Official Site
          </button>
        )}
      </div>
    </div>
  );
};

export default Detail;
