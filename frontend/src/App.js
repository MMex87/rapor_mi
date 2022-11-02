import Login from "./containers/pages/Login";
import Register from "./containers/pages/Register"
import Dashboard from "./containers/pages/dashboard/Dashboard";
import Template from "./containers/templates/Template";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Mapel from "./containers/pages/mapel/Mapel";
import TambahMapel from "./containers/pages/mapel/TambahMapel";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={ <Login /> } />
      <Route path="/dashboard" element={ <Template /> } >
        <Route index element={ <Dashboard /> } />
      </Route>
      <Route path="/mapel" element={ <Template /> } >
        <Route index element={ <Mapel /> } />
        <Route path="/mapel/tambah" element={ <TambahMapel /> } />
      </Route>
      <Route path="/register" element={ <Register /> } />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
