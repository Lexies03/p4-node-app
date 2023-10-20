import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationPage from "../view/pages/RegistrationPage";

import userModel from "../model/UserModel";

const RegistrationController = () => {
  const navigate = useNavigate();

  const [errorRegister, setErrorRegister] = useState({
    errorGeneral: false,
    errorName: false,
    errorUsername: false,
    errorPassword: false,
    errorConfirmPassword: false,
    errorMatch: false,
  });

  const [currentUser, setCurrentUser] = useState([]);
  console.log(currentUser);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  //I fetch the users here for future purposes. For the admin.
  useEffect(() => {
    getUser().then((users) => {
      setCurrentUser(users);
    });
  }, []);

  const getUser = async () => {
    return userModel.getUsers();
  };

  const postUser = async () => {
    try {
      const newUser = await userModel.addUser({
        ...registerForm,
        name: registerForm.name,
        username: registerForm.username,
        password: registerForm.password,
      });

      setCurrentUser([...currentUser, newUser]);
    } catch (error) {
      throw new Error("Fails to add user", error);
    }
  };

  const handleDone = () => {
    navigate("/login");
  };

  const handleRegChange = (event) => {
    switch (event.target.id) {
      case "name":
        return setRegisterForm({
          ...registerForm,
          name: event.target.value,
        });
      case "username":
        return setRegisterForm({
          ...registerForm,
          username: event.target.value,
        });
      case "password":
        return setRegisterForm({
          ...registerForm,
          password: event.target.value,
        });
      case "Cpassword":
        return setRegisterForm({
          ...registerForm,
          confirmPassword: event.target.value,
        });
      default:
        return registerForm;
    }
  };

  const handleRegSubmit = (event) => {
    event.preventDefault();

    setErrorRegister({
      ...errorRegister,
      errorGeneral:
        !registerForm.name &&
        !registerForm.username &&
        !registerForm.password &&
        !registerForm.confirmPassword,
      errorName:
        !registerForm.name &&
        (registerForm.password ||
          registerForm.confirmPassword ||
          registerForm.username),
      errorUsername:
        !registerForm.username &&
        (registerForm.password ||
          registerForm.confirmPassword ||
          registerForm.name),
      errorPassword:
        !registerForm.password &&
        (registerForm.username ||
          registerForm.confirmPassword ||
          registerForm.name),
      errorConfirmPassword:
        !registerForm.confirmPassword &&
        (registerForm.username || registerForm.password || registerForm.name),
      errorMatch: registerForm.password !== registerForm.confirmPassword,
    });

    if (
      registerForm.name &&
      registerForm.username &&
      registerForm.password &&
      registerForm.confirmPassword &&
      registerForm.password === registerForm.confirmPassword
    ) {
      postUser();
      setRegisterForm({
        ...registerForm,
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <RegistrationPage
      handleRegSubmit={handleRegSubmit}
      handleRegChange={handleRegChange}
      registerForm={registerForm}
      errorRegister={errorRegister}
      handleDone={handleDone}
    />
  );
};

export default RegistrationController;
