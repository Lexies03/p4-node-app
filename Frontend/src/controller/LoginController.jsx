import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../model/providers/authprovider";
//models
import userModel from "../model/UserModel";

//pages
import LoginPage from "../view/pages/LoginPage";

//assets
import Logo from "../assets/bg-Logo.png";

//token
const currentToken = localStorage.getItem("token");

const LoginController = () => {
  const [state, dispatch] = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState({
    errorGeneral: false,
    errorUsername: false,
    errorPassword: false,
    errorMatch: false,
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleLogChange = (event) => {
    switch (event.target.id) {
      case "username":
        return setLoginForm({
          ...loginForm,
          username: event.target.value,
        });
      case "password":
        return setLoginForm({
          ...loginForm,
          password: event.target.value,
        });

      default:
        return loginForm;
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await userModel.login(
        loginForm.username,
        loginForm.password
      );
      if (!loginForm.username && !loginForm.password) {
        setErrorLogin({
          ...errorLogin,
          errorGeneral: true,
        });
      } else if (!loginForm.username && loginForm.password) {
        setErrorLogin({
          ...errorLogin,
          errorUsername: true,
          errorPassword: false,
          errorGeneral: false,
        });
      } else if (loginForm.username && !loginForm.password) {
        setErrorLogin({
          ...errorLogin,
          errorUsername: false,
          errorPassword: true,
          errorGeneral: false,
        });
      } else {
        dispatch({ type: "SAVE_TOKEN", payload: token });
        navigate("/");
      }
    } catch (err) {
      throw new Error("Faild to fetch token", err);
    }
  };

  return (
    <LoginPage
      logo={Logo}
      handleLogSubmit={handleLogSubmit}
      handleLogChange={handleLogChange}
      handleRegister={handleRegister}
      errorLogin={errorLogin}
      loginForm={loginForm}
    />
  );
};

export default LoginController;
