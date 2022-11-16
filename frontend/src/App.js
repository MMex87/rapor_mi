import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
// import login dan register
import Login from "./containers/pages/Login";
import Register from "./containers/pages/Register"
// import Template
import Template from "./containers/templates/Template";
// import Admin
import Dashboard from "./containers/pages/admin/dashboard/Dashboard";
import Mapel from "./containers/pages/admin/mapel/Mapel";
import TambahMapel from "./containers/pages/admin/mapel/TambahMapel";
import EditMapel from "./containers/pages/admin/mapel/EditMapel";
import Siswa from "./containers/pages/admin/siswa/Siswa";
import TambahSiswa from "./containers/pages/admin/siswa/TambahSiswa";
import EditSiswa from "./containers/pages/admin/siswa/EditSiswa";
import Guru from "./containers/pages/admin/guru/Guru";
import TambahGuru from "./containers/pages/admin/guru/TambahGuru";
import EditGuru from "./containers/pages/admin/guru/EditGuru";
import Kelas from "./containers/pages/admin/kelas/Kelas";
// import Kepala Sekolah
import DashboardKep from "./containers/pages/kepala_sekolah/dashboard/Dashboard";
import MapelKep from "./containers/pages/kepala_sekolah/mapel/Mapel";
import SiswaKep from "./containers/pages/kepala_sekolah/siswa/Siswa";
import GuruKep from "./containers/pages/kepala_sekolah/guru/Guru";
import KelasKep from "./containers/pages/kepala_sekolah/kelas/Kelas";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={ <Login /> } />
      {/* Admin */ }
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
      <Route path="/kelas" element={ <Template /> }>
        <Route index element={ <Kelas /> } />
      </Route>

      {/* Kepala Sekolah */ }
      <Route path="/kepala/dashboard" element={ <Template /> } >
        <Route index element={ <DashboardKep /> } />
      </Route>
      <Route path="/kepala/mapel" element={ <Template /> } >
        <Route index element={ <MapelKep /> } />
      </Route>
      <Route path="/kepala/siswa" element={ <Template /> } >
        <Route index element={ <SiswaKep /> } />
      </Route>
      <Route path="/kepala/guru" element={ <Template /> } >
        <Route index element={ <GuruKep /> } />
      </Route>
      <Route path="/kepala/kelas" element={ <Template /> }>
        <Route index element={ <KelasKep /> } />
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
