import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authprovider";

function AuthGuard(props) {
  const [state, dispatch] = useContext(AuthContext);
  const cachedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    //if token does not exist
    if (!cachedToken) {
      navigate("/login");
    } else if (state.token !== cachedToken) {
      dispatch({ type: "SAVE_TOKEN", payload: cachedToken });
    }
  }, []);

  return <>{props.children}</>;
}

export default AuthGuard;
