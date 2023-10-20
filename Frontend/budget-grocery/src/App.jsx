//router
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//pages
import LoginController from "./controller/LoginController";
import RegistrationController from "./controller/RegistrationController";
import BudgetController from "./controller/BudgetController";
import HomePage from "./view/pages/HomePage";
import ContentCategory from "./view/components/ContentCategory";
import ListController from "./controller/ListController";
import Instruction from "./view/pages/Instruction";
import Blog from "./view/pages/Blog";
import { AuthProvider } from "./model/providers/authprovider";

//security
import AuthGuard from "./model/providers/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginController />,
  },
  {
    path: "/register",
    element: <RegistrationController />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <ContentCategory />,
      },
      {
        path: "budget",
        element: <BudgetController />,
      },
      {
        path: "list",
        element: <ListController />,
      },
      {
        path: "instruction",
        element: <Instruction />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
