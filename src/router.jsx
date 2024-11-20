import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Campagin from "./pages/Campaign";
import NotFound from "./pages/NotFound";
import setAuthToken from "./utils/setAuthToken";
import { jwtDecode } from "jwt-decode";
import store from "./store";
import { setCurrentUser } from "./reducers/authReducer";
import Profile from "./pages/Profile";

if (
  window.localStorage.getItem("token") ||
  window.sessionStorage.getItem("token")
) {
  const token = window.localStorage.getItem("token")
    ? window.localStorage.getItem("token")
    : window.sessionStorage.getItem("token");
  if (token) {
    setAuthToken(token);
    const decoded = jwtDecode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      setAuthToken(null);
      window.location.href = "/";
    }
  }
}

const publicRoutes = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile/:encryptedLink",
    element: <Profile />
  }
];

const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/campaign/:id",
    element: <Campagin />
  }
];

const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { loginSuccess } = currentUser;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        {_.map(publicRoutes, ({ path, element }, i) => (
          <Route
            key={i}
            path={path}
            element={
              loginSuccess && loginSuccess === true ? (
                <Navigate to="/dashboard" replace />
              ) : (
                element
              )
            }
          />
        ))}
        {_.map(protectedRoutes, ({ path, element }, i) => (
          <Route
            key={i}
            path={path}
            element={
              loginSuccess && loginSuccess === true ? (
                element
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
