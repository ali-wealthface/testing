import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import {
  AUTH_ON_LOAD_LOGIN,
  AUTH_TOKEN_IN_VALID,
  AUTH_TOKEN_NOT_FOUND,
} from "./store/store.types";
import ProtectedRoutes from "components/ProtectedRoutes/ProtectedRoutes";
import { appLocalStorage } from "config";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const appToken = localStorage.getItem(appLocalStorage.APP_TOKEN);
      if (appToken) {
        const isTokenValid = JSON.parse(appToken) === "a-valid-token";
        if (isTokenValid) {
          dispatch({ type: AUTH_ON_LOAD_LOGIN });
        } else {
          dispatch({ type: AUTH_TOKEN_IN_VALID });
        }
      } else {
        dispatch({ type: AUTH_TOKEN_NOT_FOUND });
      }
    } catch (error) {
      dispatch({ type: AUTH_TOKEN_NOT_FOUND });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/trade" element={<Trade />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
