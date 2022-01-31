import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IAppState } from "store/store.interface";
import Container from "../Layout/Container/Container";
import UserImage from "../../assets/images/john-doe.png";
import "./Header.style.scss";
import Button from "components/UiElements/Button/Button";
import { AUTH_USER_LOGGED_OUT } from "store/store.types";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(
    (state: IAppState) => state.auth
  );

  const handleLogout = () => {
    dispatch({ type: AUTH_USER_LOGGED_OUT });
    navigate("/");
  };

  return (
    <div className="header">
      <Container>
        <nav className="nav-container">
          <ul className="nav-links">
            <li>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/trade">
                Trade
              </NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="users-detail">
              {username} <img src={UserImage} alt={username} />
              <div className="users-detail__dropdown">
                <Button type="button" variant="text" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <ul className="nav-links">
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </Container>
    </div>
  );
};

export default Header;
