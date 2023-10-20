import calculator from "../../assets/Calculator.png";
import list from "../../assets/List.png";
import show from "../../assets/Show.png";
import { Link } from "react-router-dom";

const ContentCategory = () => {
  return (
    <div className="content-main-container">
      <h1> Welcome</h1>
      <br />
      <h2>Category</h2>

      <div className="content-container">
        <Link to="/budget" className="link-category">
          <div className="content">
            Budget Grocery
            <img src={calculator} className="img-category" />
          </div>
        </Link>

        <Link to="/list" className="link-category">
          <div className="content">
            List Grocery
            <img src={list} className="img-category" />
          </div>
        </Link>

        <Link to="/instruction" className="link-category">
          <div className="content">
            Instruction
            <img src={show} className="img-category" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ContentCategory;
