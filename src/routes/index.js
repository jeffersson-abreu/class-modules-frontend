
import { BrowserRouter, Routes, Route, useLocation, Navigate, } from "react-router-dom";
import { useAuth } from '../hooks';

import {
  AddEditModules,
  AddEditClasses,
  ListClasses,
  ListModules,
  Register,
  Login,
} from '../pages';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ListModules />} />

          {/* Authentication routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Modules class routes */}
          <Route path="modules">
            <Route path="new" element={<ProtectedRoute><AddEditModules /></ProtectedRoute>} />
            <Route path="edit" element={<ProtectedRoute><AddEditModules /></ProtectedRoute>} />

            <Route path=":module">
              <Route index element={<ListClasses />} />
              <Route path="new-class" element={<ProtectedRoute><AddEditClasses /></ProtectedRoute>} />
              <Route path="edit-class" element={<ProtectedRoute><AddEditClasses /></ProtectedRoute>} />
            </Route>
          </Route>
        </Route>
      </Routes >
    </BrowserRouter >
  )
}

export default AppRoutes;