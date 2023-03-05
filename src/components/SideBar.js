import React, { useState } from "react";
import "../css/SideBar.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx'


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
      </div>
    </div>
    
  );
};

export default CollapsibleSidebar;
