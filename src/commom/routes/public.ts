import { RouteProps } from "react-router-dom";
// import Login from "../../features/Login";
import Clients from "../../Features/Clients";
interface RouteWithRoles extends RouteProps {
  roles: string[];
}

export const publicRoutes: RouteWithRoles[] = [
  // {
  //   path: "/",
  //   component: Login,
  //   exact: true,
  //   roles: ["*"]
  // },
  {
    path: "/",
    component: Clients,
    exact: true,
    roles: ["*"]
  }
];
