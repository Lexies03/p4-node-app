import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import Logo from "../../assets/bg-Logo.png";

const RegistrationPage = ({
  handleRegSubmit,
  handleRegChange,
  registerForm,
  errorRegister,
  handleDone,
}) => {
  return (
    <div className="register-container">
      <img src={Logo} alt="logo" style={{ width: "200px", height: "200px" }} />

      <CustomHeader header="Please Register" styles="headerBlack" />

      <form onSubmit={handleRegSubmit} className="register-form-container">
        <div>
          <CustomInput
            name="Name"
            type="text"
            id="name"
            value={registerForm.name}
            handleChange={handleRegChange}
            styles="form-container"
          />
          {errorRegister.errorName && (
            <p className="registration-error-message">Name cannot be blank</p>
          )}
        </div>

        <div>
          <CustomInput
            name="Username"
            type="text"
            id="username"
            value={registerForm.username}
            handleChange={handleRegChange}
            styles="form-container"
          />
          {errorRegister.errorUsername && (
            <p className="registration-error-message">
              Username cannot be blank
            </p>
          )}
        </div>

        <div>
          <CustomInput
            name="Password"
            type="password"
            id="password"
            value={registerForm.password}
            handleChange={handleRegChange}
            styles="form-container"
          />
          {errorRegister.errorPassword && (
            <p className="registration-error-message">
              Password cannot be blank
            </p>
          )}
        </div>

        <div>
          <CustomInput
            name="Confirm Password"
            type="password"
            id="Cpassword"
            value={registerForm.confirmPassword}
            handleChange={handleRegChange}
            styles="form-container"
          />
          {errorRegister.errorConfirmPassword && (
            <p className="registration-error-message">
              Confirm password cannot be blank
            </p>
          )}
        </div>

        {errorRegister.errorMatch && (
          <p className="registration-error-message">Password do not match</p>
        )}

        <div className="btn-register-container">
          <CustomButton
            name="Register"
            handleEvent={handleRegSubmit}
            styles="btnForm btnRed"
          />

          <CustomButton
            name="Done"
            handleEvent={handleDone}
            styles="btnForm btnBlue"
          />

          {errorRegister.errorGeneral && (
            <p className="registration-error-message">
              All fields cannot be blank
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
