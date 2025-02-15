// import icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css'

//import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Pages from './serverApplications/Pages';
import Appli from './Activiter/Appli';

import Menu from './Menu/Menu'

import Table from './serverApplications/Table';
import Listglobal from './Interface/Listglobal';

import Ajoutrapporst from './Activiter/Ajoutrapporst';
import Sibar from './Contenu/Sibar';
import ContenuSidebar from './Contenu/ContenuSidebar';
import ModalForm from './Menu/ModalForm'
import FormAjout from './Menu/FormAjout'

import Upload from './Activiter/Upload';
// import ProfilUser from './TestCrud/ProfilUser';
// import Archives from './TestCrud/Archives';
import Attestation from './Attestqtion/Attestation';
import SiebarAttestation from './Attestqtion/SiebarAttestation';
import HomeAttestation from './Attestqtion/HomeAttestation';
import StatistiqueAttestation from './Attestqtion/StatistiqueAttestation';
import ServerAttestation from './serverApplications/ServerAttestation';
import LoginSignup from './Auth/LoginSignup';
import DemandeAttestation from './Attestqtion/DemandeAttestation';
import AdminSignup from './Auth/AdminSignup';
import UserProfilcard from './profiles/UserProfilcard';
import SidbarServer from './serverApplications/SidbarServer';
import AttestationServerDemande from './serverApplications/AttestationServerDemande';
import ServerHeader from './serverApplications/ServerHeader';
import SidbarActiviter from './Activiter/SidbarActiviter';
import ProfilUsers from './serverApplications/ProfilUsers';
import Dashboard from './Auth/Dashboard';
import Log from './Auth/Log';


function App() {

  return  (
    <>
   <BrowserRouter >
    <Routes>
      <Route path='/menu' element={<Menu />}/>
   
      <Route path='/table' element={<Table />}/>
      <Route path='/list' element={<Listglobal />}/>
      <Route path='/Ajourapport' element={<Ajoutrapporst />}/>
      <Route path='/sidebarRapport' element={<ContenuSidebar />}/>
      <Route path='/modal' element={<ModalForm />}/>
      <Route path='/ajoutactiv' element={<FormAjout />}/>
      <Route path='/contSidbar' element={<Sibar />}/>

       {/* route attestation */}
      <Route path='/attestation' element={<Attestation  />}/>
      <Route path='/Sidbaratestation' element={<SiebarAttestation />}/>
      <Route path='/homeAtestation' element={<HomeAttestation />}/>
      <Route path='/statAttestation' element={<StatistiqueAttestation />}/>
      <Route path='/serverAttestation' element={<ServerAttestation />}/>
      <Route path='/demandeAttestation' element={<DemandeAttestation />}/>

      {/* Authatification */}
      <Route path='/stage-dren-Analamanga-mern' element={<LoginSignup />} /> 
      <Route path='/signup' element={<AdminSignup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Log />} />

      {/* server: */}
      <Route path='/Sidbarserver' element={<SidbarServer />} />
      <Route path='/ServerDemandeAttestation' element={<AttestationServerDemande />} />
      <Route path='/ServerHeader' element={<ServerHeader />} />
      <Route path='/pages' element={<Pages />}/>
      <Route path='/ToutsProfilsUsers' element={<ProfilUsers />}/>

      {/* Activiter */}
      <Route path='/SidbarActiviter' element={<SidbarActiviter />} />
      <Route path='/appli' element={<Appli />}/>
      <Route path='/uploadcrud' element={<Upload />}/>

      {/* Profils */}
      <Route path='/userprofil' element={<UserProfilcard />} />
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App;
