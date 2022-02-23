
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Modules, Login, Register } from '../pages';


const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Modules />} />

          {/* Authentication routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Modules class routes */}
          <Route path=":module">
            <Route index element={<p>module classes</p>} />
            <Route path=":class" element={<p>module class</p>} />
          </Route>

        </Route>
      </Routes >
    </BrowserRouter >
  )
}

export default AppRoutes;