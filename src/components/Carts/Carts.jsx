import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import filmImg from "../../assets/record.png";
import { useDispatch, useSelector } from "react-redux";
import { addList, removeList } from "../../features/favoritesSlice";
const Carts = ({
  id,
  poster_path,
  original_title,
  original_language,
  vote_average,
  vote_count,
}) => {
  const dispatch = useDispatch();
  const { filmsList } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let level = "";
  let img = "";
  if (vote_average >= 8) {
    level = "high";
  } else if (vote_average >= 6 && vote_average < 8) {
    level = "middle";
  } else {
    level = "low";
  }
  if (poster_path) {
    img = `https://image.tmdb.org/t/p/w1280${poster_path}`;
  }
  const handleFavorite = () => {
    if (filmsList.filter((item) => item.id === id).length > 0) {
      dispatch(
        removeList({
          payload: {
            id,
            poster_path,
            original_title,
            original_language,
            vote_average,
            vote_count,
          },
        })
      );
    } else if (!filmsList.filter((item) => item.id === id).length > 0) {
      dispatch(
        addList({
          payload: {
            id,
            poster_path,
            original_title,
            original_language,
            vote_average,
            vote_count,
          },
        })
      );
    }
  };
  return (
    <Card className="card">
      <Card.Img src={img || filmImg} className="film-img" />

      <Card.Body>
        <Card.Title className="title">{original_title}</Card.Title>
        <div>
          {user && filmsList.filter((item) => item.id === id).length > 0 && (
            <span onClick={handleFavorite}>
              <i className="fa-solid fa-heart"></i>
            </span>
          )}
          {user && !filmsList.filter((item) => item.id === id).length > 0 && (
            <span onClick={handleFavorite}>
              <i className="fa-regular fa-heart"></i>
            </span>
          )}
        </div>
      </Card.Body>
      <div className="table">
        <table>
          <tbody>
            <tr>
              <td>Language</td>
              <td>: {original_language.toLocaleUpperCase()}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Vote Count</td>
              <td> : {vote_count}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Vote Average</td>
              <td>
                : <span className={level}>{vote_average.toFixed(1)}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button className="link" onClick={() => navigate(`/detail/${id}`)}>
        Go Details
      </Button>
    </Card>
  );
};

export default Carts;
