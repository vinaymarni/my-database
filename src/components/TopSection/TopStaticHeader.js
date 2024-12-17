import React from 'react';
import dbLogo from '../../static/localImages/dbLogo.jpg';

function TopStaticHeader() {
  return (
    <div className="TopStaticHeaderMainCon ">
      <h2 className="appLogoAndHeading">
        <img src={dbLogo} className="appLogo" alt="" />
        My DB
      </h2>


      
    </div>
  )
};

export default TopStaticHeader
