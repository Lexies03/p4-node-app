import NavigationMenu from "../components/NavigationMenu";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
      <div>
        <NavigationMenu />
        <div className="app-outlet">
          <Outlet />
        </div>
      </div>
    );
};

export default HomePage;
