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
import EditMapel from "./containers/pages/mapel/EditMapel";
import Siswa from "./containers/pages/siswa/Siswa";
import TambahSiswa from "./containers/pages/siswa/TambahSiswa";
import EditSiswa from "./containers/pages/siswa/EditSiswa";
import Guru from "./containers/pages/guru/Guru";
import TambahGuru from "./containers/pages/guru/TambahGuru";
import EditGuru from "./containers/pages/guru/EditGuru";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={ <Login /> } />
      <Route path="/dashboard" element={ <Template /> } >
        <Route index element={ <Dashboard /> } />
      </Route>
      <Route path="/mapel" element={ <Template /> } >
        <Route index element={ <Mapel /> } />
        <Route path="/mapel/tambah/:idKelas"
          element={ <TambahMapel /> } />
        <Route path="/mapel/edit/:idMapel"
          element={ <EditMapel /> } />
      </Route>
      <Route path="/siswa" element={ <Template /> } >
        <Route index element={ <Siswa /> } />
        <Route path="/siswa/tambah"
          element={ <TambahSiswa /> } />
        <Route path="/siswa/edit/:idSiswa"
          element={ <EditSiswa /> } />
      </Route>
      <Route path="/guru" element={ <Template /> } >
        <Route index element={ <Guru /> } />
        <Route path="/guru/tambah"
          element={ <TambahGuru /> } />
        <Route path="/guru/edit/:idGuru"
          element={ <EditGuru /> } />
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
