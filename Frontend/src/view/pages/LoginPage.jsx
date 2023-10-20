import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const LoginPage = ({
  logo,
  handleLogSubmit,
  handleLogChange,
  errorLogin,
  handleRegister,
  loginForm,
}) => {
  return (
    <div className="login-main-container">
      <div className="login-logo">
        <img
          src={logo}
          alt="logo"
          style={{ width: "400px", height: "400px" }}
        />
      </div>
      <div className="login-container">
        <CustomHeader
          header="Budget Your Groceries Today!"
          styles="headerRed"
        />

        <br />
        <form onSubmit={handleLogSubmit} className="register-form-container">
          <CustomHeader header="Please Login" styles="headerBlack" />
          <div>
            <CustomInput
              name="Username"
              type="text"
              id="username"
              handleChange={handleLogChange}
              styles="form-container"
              value={loginForm.username}
            />
            {errorLogin.errorUsername && (
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
              handleChange={handleLogChange}
              styles="form-container"
              value={loginForm.password}
            />
            {errorLogin.errorPassword && (
              <p className="registration-error-message">
                Password cannot be blank
              </p>
            )}
          </div>

          {errorLogin.errorMatch && (
            <p className="registration-error-message">
              Username and password did not match.
            </p>
          )}

          <div className="btnForm-container">
            <CustomButton
              name="Login"
              handleEvent={handleLogSubmit}
              styles="btnForm btnBlack"
            />
            <CustomButton
              name="Register"
              handleEvent={handleRegister}
              styles="btnForm btnRed"
            />
          </div>

          {errorLogin.errorGeneral && (
            <p className="registration-error-message">
              All fields cannot be blank
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
