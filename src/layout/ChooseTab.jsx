import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardCivil from './CivilService/DashboardCivil'
import Sidebar from '../components/SideBar';
import { useDispatch } from 'react-redux';
import { setService } from '../features/service/serviceSlice.js';

const ChooseTab = () => {
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState(null);

  const handleClick = (service) => {
    const chooseService = service === "civil_service" ? "civil_service" : "territorialCollectivity";
     setSelectedService(chooseService);
    dispatch(setService(chooseService));
    setService("")

  };



  return (
    <div className='container_choose_tab'>
        <div className="gridtab">
            <div className="boxtab" onClick={()=>handleClick('civil_service')}>
               
                <Link to= "/etat_civil">Etat civil</Link>
            </div>
            <div className="boxtab" onClick={()=>handleClick('civil_service')}>
               
                <Link to= "/etat_civil">Etat civil</Link>
            </div>
            <div className="boxtab" onClick={()=>handleClick('territorialCollectivity')}>
           
            <Link to= "/territorial_collectivity">Collectivité térritoriale</Link>

            {console.log("selectedService",selectedService)}
            {selectedService && <Sidebar services={selectedService} />}

                </div>
        </div>
      
    </div>
  )
}

export default ChooseTab