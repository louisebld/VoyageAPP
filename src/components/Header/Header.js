import React from "react";
import van from "../../assets/van.png";
import StartEndComponent from "./StartEndComponent";

function Header() {
  return (
        <div className="header">
            <div className="titleGroup">
            <img className="van" src={van} alt="placeholder" />
            {/* <h1 className="title">PLANIFIE TON VOYAGE</h1> */}
            </div>
        {/* <p className="parag">Planifie ton voyage</p> */}
          <StartEndComponent />        
        </div>
  );
}

export default Header;