import "./home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Carts from "../../components/Carts/Carts";
import { Link } from "react-router-dom";
import { toastWarnNotify } from "../../helpers/Toastify";

const Home = () => {
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [middlePage, setMiddlepage] = useState(3);
  const [goBack, setGoBack] = useState(false);
  const [sortMenu, setSortMenu] = useState("hidden");
  const [orderByRating, setOrderByRating] = useState(false);
  const [orderByName, setOrderByName] = useState("");
  const getFilms = async () => {
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
    } else if (orderByName) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNumber}&sort_by=${orderByName}`;
    } else if (orderByRating) {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${pageNumber}`;
    } else if (pageNumber) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNumber}`;
    }
    // url =
    //   search &&
    //   `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;

    // url =
    //   orderByName &&
    //   `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNumber}&sort_by=${orderByName}`;
    // url =
    //   orderByRating &&
    //   `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${pageNumber}`;

    const { data } = await axios(url);

    setFilms(data);
  };

  useEffect(() => {
    getFilms();
    // eslint-disable-next-line
  }, [pageNumber, orderByName, orderByRating]);
  const changeLinkNumbers = (e) => {
    if (e.target.id === "right" && middlePage < 498) {
      setMiddlepage(middlePage + 1);
    } else if (e.target.id === "left" && middlePage > 3) {
      setMiddlepage(middlePage - 1);
    } else if (e.target.id === "right-end") {
      setMiddlepage(498);
    } else if (e.target.id === "left-end") {
      setMiddlepage(3);
    }
  };
  const changPageNumber = (e) => {
    if (e.target.id === "page-btn") {
      setPageNumber(e.target.name);
    }
  };
  const searchFilmByName = (e) => {
    e.preventDefault();
    !search && toastWarnNotify("Please enter the search word...");
    if (search) {
      getFilms();
      setPageNumber(0);
      setGoBack(true);
      setOrderByRating(false);
    }
  };
  const clearSearch = () => {
    setSearch("");
    setPageNumber(1);
    setGoBack(false);
  };
  const handleSortMenu = () => {
    sortMenu === "hidden" && setSortMenu("visible");
    sortMenu === "visible" && setSortMenu("hidden");
  };
  const handleSortMenuChoose = (e) => {
    sortMenu === "hidden" && setSortMenu("visible");
    sortMenu === "visible" && setSortMenu("hidden");
  };
  const handleOrderByRating = () => {
    setOrderByName("");
    setOrderByRating(true);
    setPageNumber(1);
  };
  const handleOrderByName = (e) => {
    setPageNumber(1);
    setOrderByRating(false);
    setOrderByName(e.target.id);
  };
  return (
    <div className="home">
      <div className="search-bar">
        <div className="dropdown">
          <span className="drp-span" onClick={handleSortMenu}>
            Sort By <i className="fa-solid fa-caret-down" id="down-arrow"></i>
          </span>
          <div className={sortMenu} onClick={handleSortMenuChoose}>
            <p id="title.asc" onClick={handleOrderByName}>
              Name A-Z
            </p>
            <p id="title.desc" onClick={handleOrderByName}>
              Name Z-A
            </p>
            <p onClick={handleOrderByRating}>Rating</p>
          </div>
        </div>
        <div>
          {goBack && (
            <button className="link" id="back" onClick={clearSearch}>
              Go Back
            </button>
          )}
        </div>
        <Form onSubmit={searchFilmByName}>
          <Form.Control
            id="search-input"
            type="search"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            id="icon"
            onClick={searchFilmByName}
          ></i>
          <Button type="submit" id="btn"></Button>
        </Form>
      </div>
      <div className="film-carts">
        {films?.results?.map((item) => {
          return (
            <div key={item.id} className="cart-div">
              <Carts {...item} />
            </div>
          );
        })}
      </div>
      <div className="page-numbers" onClick={changPageNumber}>
        {films && !goBack && (
          <>
            <Link
              className="page-button"
              id="left-end"
              onClick={changeLinkNumbers}
            >
              <i className="fa-solid fa-angles-left" id="left-end"></i>
            </Link>
            <Link className="page-button" id="left" onClick={changeLinkNumbers}>
              <i className="fa-solid fa-angle-left" id="left"></i>
            </Link>
            <Link className="page-button" id="page-btn" name={middlePage - 2}>
              {middlePage - 2}
            </Link>
            <Link className="page-button" id="page-btn" name={middlePage - 1}>
              {middlePage - 1}
            </Link>
            <Link className="page-button" id="page-btn" name={middlePage}>
              {middlePage}
            </Link>
            <Link className="page-button" id="page-btn" name={middlePage + 1}>
              {middlePage + 1}
            </Link>
            <Link className="page-button" id="page-btn" name={middlePage + 2}>
              {middlePage + 2}
            </Link>
            {/* <Link className="page-button">...</Link> */}
            {/*? sayfa sayısı yanlızca 500 e kadar çalışıyor */}
            {/* <Link className="page-button" name={films?.total_pages - 1}>
              {films?.total_pages - 1}
            </Link>
            <Link className="page-button" name={films?.total_pages}>
              {films?.total_pages}
            </Link> */}
            <Link
              className="page-button"
              id="right"
              onClick={changeLinkNumbers}
            >
              <i className="fa-solid fa-angle-right" id="right"></i>
            </Link>
            <Link
              className="page-button"
              id="right-end"
              onClick={changeLinkNumbers}
            >
              <i className="fa-solid fa-angles-right" id="right-end"></i>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
