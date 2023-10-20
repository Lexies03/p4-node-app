import { Link } from "react-router-dom";
import LogoBlack from "../../assets/bg-Logo-black.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const cachedToken = localStorage.getItem("token");

const NavigationMenu = () => {
  const [selectionOption, setSelectionOption] = useState("");
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    setSelectionOption(event.target.value);

    if (event.target.value === "Logout") {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="header-container">
      <nav className="header-nav">
        <div className="header-logo">
          <img
            src={LogoBlack}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <h2 className="logo">Budget Grocery App</h2>
        </div>
        <ul className="header-ul">
          <li>
            <Link className="link" to="home">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="blog">
              History
            </Link>
          </li>
          <li>
            <select
              onChange={handleSelectionChange}
              value={selectionOption}
              className="link-selection"
            >
              <option className="link-option">User</option>
              <option className="link-option">Profile</option>
              <option className="link-option">Logout</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
