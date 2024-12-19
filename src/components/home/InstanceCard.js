import React from 'react';
import user from '../../static/localImages/user.png';
import databaseConnection from '../../static/localImages/databaseConnection.png';
import '../../styles/home.css';

function InstanceCard({data, onPopup}) {
    const {name, parameters} = data;
    const {hostName, port} = parameters;

    return (         
            <div className="InstanceCard" onClick={()=>onPopup(true, "selectInstancePopup", data)}>
                <p className="InstanceCardHeading">{name}</p>
                <p className="InstanceCardText">
                    <img alt="" src={user} className='instanceCardIcon' />
                    {hostName}
                </p>
                <p className="InstanceCardText">
                    <img alt="" src={databaseConnection} className='instanceCardIcon' />
                    {port}
                </p>
            </div>
    )
}

export default InstanceCard;
