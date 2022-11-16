import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { singOut } from "../../authencitation/firebase";
import "./navbar.css";
import { clearUser } from "../../features/authSlice";
import { clearFavoriteList } from "../../features/favoritesSlice";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { filmsList } = useSelector((state) => state.favorite);

  const handleLogout = () => {
    singOut(dispatch, clearUser, clearFavoriteList);
  };
  return (
    <>
      <div className="navbar">
        <div>
          <NavLink to="/" className="link">
            Home
          </NavLink>
        </div>
        <div className="d-flex">
          {filmsList.length > 0 && (
            <NavLink to="/favorites" className="link">
              Favorites
            </NavLink>
          )}

          {user && <span className="user-name">{user}</span>}
          <NavLink to="/register" className="link">
            Register
          </NavLink>
          {user && (
            <NavLink to="login" className="link login" onClick={handleLogout}>
              Logout
            </NavLink>
          )}
          {!user && (
            <NavLink to="login" className="link login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <div className="layer"></div>
    </>
  );
};

export default Navbar;
