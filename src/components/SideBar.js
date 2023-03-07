import React, { useState } from "react";
import "../css/SideBar.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'
import Carrousel from "./Carrousel";
import FormTimeComponent from "./FormTimeComponent";


const CollapsibleSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container">
      <div className="main">

        </div>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="buttondiv">
              <button className="toggle-btn" onClick={handleSidebarToggle}>
        {sidebarOpen ? <RxDoubleArrowLeft/> : <RxDoubleArrowRight/>}
      </button>
        </div>
        <h2>Véhicule</h2>
        <Carrousel />
        <div className="formtime">
          <FormTimeComponent />
        </div>
      </div>
    </div>
    
  );
};

export default CollapsibleSidebar;
