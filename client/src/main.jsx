import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap.custom.css";
import "./assets/index.css";
import App from "./App";
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProjectScreen from "./screens/ProjectScreen";
import CreateProject from "./screens/CreateProject";
import PrivateRoute from "./components/PrivateRoute";
import ProfileScreen from "./screens/ProfileScreen";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/projects/:projectid" element={<ProjectScreen />} />
        <Route path="addproject" element={<CreateProject />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
