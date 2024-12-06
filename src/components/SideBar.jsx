

import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Pour les icônes
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({services}) => {
  const selectedService = useSelector((state) => state.service.selectedService);
  

  console.log(services)
  const [isOpen, setIsOpen] = useState(true);
  const [isEtatCivilOpen, setIsEtatCivilOpen] = useState(false);
  const [isCollectiviteOpen, setIsCollectiviteOpen] = useState(false);

  // Etat pour l'élément actif
  const [activeMenu, setActiveMenu] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = (menu) => {
    if (menu === 'etatCivil') setIsEtatCivilOpen(!isEtatCivilOpen);
    if (menu === 'collectivite') setIsCollectiviteOpen(!isCollectiviteOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Met à jour l'élément actif
  };



  const display = selectedService === "civil_service" ? ( 
    <>
        <li className={`dropdown ${activeMenu === 'collectivite' ? 'active' : ''}`}>
            <div onClick={() => { toggleMenu('collectivite'); handleMenuClick('collectivite'); }} className="dropdown-toggle title-dropdown">
              Dashboard
            </div>
            </li>
    <li className={`dropdown ${activeMenu === 'etatCivil' ? 'active' : ''} space`}>
      <div onClick={() => { toggleMenu('etatCivil'); handleMenuClick('etatCivil'); }} className="dropdown-toggle title-dropdown">
        État Civil {isEtatCivilOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      </li>
      {isEtatCivilOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="demande_acte_naissance">Demande d'acte de naissance</Link>
          </li>
          <li>
            <Link to="demande_acte_de_mariage">Demande d'acte de mariage</Link>
          </li>
          <li>
            <Link to="demande_acte_de_deces">Demande d'acte de décès</Link>
          </li>
          {/* <li><a href="demande_acte">Demande d'acte de naissance</a></li>
          <li><a href="#acteDeMariage">Demande d'acte de mariage</a></li>
          <li><a href="#acteDeDeces">Demande d'acte de décès</a></li> */}
        </ul>
      )}

    </>
  ) : (
    <>
        <li className={`dropdown ${activeMenu === 'etatCivil' ? 'active' : ''}`}>
            <div onClick={() => { toggleMenu('etatCivil'); handleMenuClick('etatCivil'); }} className="dropdown-toggle title-dropdown">
              Dashboard
            </div>
            </li>
    <li className={`dropdown ${activeMenu === 'collectivite' ? 'active' : ''} space`}>
      <div onClick={() => { toggleMenu('collectivite'); handleMenuClick('collectivite'); }} className="dropdown-toggle title-dropdown">
        Collectivité Territoriale {isCollectiviteOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      </li>
      {isCollectiviteOpen && (
        <ul className="dropdown-menu">
          <li><a href="#permissionDeConstruire">Demande de permission de construire</a></li>
        </ul>
      )}

    </>
  );
  

  return (
    <div className="sidebar-container">
      {/* Bouton pour ouvrir/fermer */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Contenu de la Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebarcontainer">

        <ul>

      
           {/*  {isCollectiviteOpen && (
              <ul className="dropdown-menu">
                <li><a href="#permissionDeConstruire">Demande de permission de construire</a></li>
              </ul>
            )} */}

          {/* État Civil avec menu déroulant */}
         {display}

          {/* Collectivité Territoriale avec menu déroulant */}
     
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
