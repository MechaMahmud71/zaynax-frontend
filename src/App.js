import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { userRoutes, errorRoute, adminRoutes } from "./Routes/Routes";
import { PrivateRoutes } from "./Routes/middleware/AuthMiddleWare";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {userRoutes.map((route, idx) => (
            <Route
              exact
              path={route.path}
              element={<route.component />}
              key={idx}
            />
          ))}
          ;
          <Route element={<PrivateRoutes />}>
            {adminRoutes.map((route, idx) => (
              <Route key={idx} element={<route.component />} exact path={route.path} />
            ))}
          </Route >

          {errorRoute.map((route, idx) => (
            <Route
              exact
              path={route.path}
              element={<route.component />}
              key={idx}
            />
          ))}
          ;
        </Routes>
      </Router>
    </>
  );
}

export default App;
