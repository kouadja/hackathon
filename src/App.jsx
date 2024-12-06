import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/* import 'bootstrap/dist/css/bootstrap.min.css'; */

import Sidebar from './components/SideBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseTab from './layout/ChooseTab'
import DashboardCivil from './layout/CivilService/DashboardCivil'
import DashboardTerritorialCollectivity from './layout/TerritorialCollectivity/DashboardTerritorialCollectivity'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

<Router>
      <div>
        {/* Ici vous pouvez mettre votre navigation (menu, sidebar, etc.) */}

        <Routes>
        <Route path="/choose_tab" element={<ChooseTab />} />
        <Route path="/etat_civil" element={<DashboardCivil />} />
        <Route path="/territorial_collectivity" element={<DashboardTerritorialCollectivity />} />

          <Route path="/demande_acte_naissance" element={<Sidebar />} />

          <Route path="/etat_civil" element={   <Sidebar/>} >


            </Route>
     
        </Routes>
      </div>
    </Router>
 
    </>
  )
}

export default App
