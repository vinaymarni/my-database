import React from 'react';

import databaseCloud from '../../static/localImages/databaseCloud.png';
import databaseConnection from '../../static/localImages/databaseConnection.png';
import addPlus from '../../static/localImages/addPlus.png';
import settings from '../../static/localImages/settings.png';
import InstanceCard from './InstanceCard';
import { useAtom } from 'jotai';
import { headerData, popupData, popupInitialState } from '../../store/globalStates';

import '../../styles/home.css';
import NewInstancePopup from '../popupCards.js/NewInstancePopup';
import SelectInstancePopup from '../popupCards.js/SelectInstancePopup';
import ErrorInstancePopup from '../popupCards.js/ErrorInstancePopup';

function Home() {
    const [{instanceData, selectedInstanceData}, setAllHeaderData] = useAtom(headerData);
    const [popup, setPopup] = useAtom(popupData);

    const onPopup = (status, popupName, data) => {
        switch (status){
            case true:
                let selectedIds = selectedInstanceData.map(eachObj=>eachObj.id);
                if(data === undefined || (data !== undefined && !selectedIds.includes(data.id))){
                    setPopup(prev => ({ 
                        ...prev,  
                        isOpen: true,
                        name: popupName,
                        data: data
                    }));
                }else{
                    let oldInstance = selectedInstanceData.filter(eachObj=>eachObj.id === data.id)[0];
                    setAllHeaderData(prev => ({...prev, currentInstance: oldInstance.instanceId}));
                }
                break;
            case false:
                setPopup(popupInitialState);
                break;
        }
    };

    return (
        <div className="homepageMainCon">
            {popup.isOpen && popup.name === "newInstancePopup" &&
            <NewInstancePopup onPopup={onPopup} />
            }

            {popup.isOpen && popup.name === "selectInstancePopup" &&
            <SelectInstancePopup onPopup={onPopup} />
            }

            {popup.isOpen && popup.name === "errorInstancePopup" &&
            <ErrorInstancePopup onPopup={onPopup} />
            }

            <div className='homepageLeftSideBar'>
                <img alt="" src={databaseCloud} className='homepageSidebarImgs' />
                <img alt="" src={databaseConnection} className='homepageSidebarImgs' />
            </div>
            <div className='homepageRightSideBar'>
                <h2 className='homepageRightSideHeading'>Database Connections 
                    <img alt="" src={addPlus} className='homepageToolIcons' onClick={()=>onPopup(true, "newInstancePopup")} />
                    <img alt="" src={settings} className='homepageToolIcons' />

                    {/* <InputField 
                        key="searchInstanceField"
                        inputId="searchInstanceField"
                        name="search"
                        // value={name}
                        required={true}
                        placeholder="Search..."
                        inputType="text"
                        onChange={onValueChange}
                        labelName="Connection Name:"
                        labelClassName="addInstanceNameLable"
                        inputClassName="addInstanceNameField"
                        containerClass="addInstanceNameFieldCon"
                    /> */}
                </h2>

                <div className='homepageCardsDisplayCon'>
                    {instanceData.map((eachCard, index)=>{
                        return (
                            <InstanceCard 
                                key={`InstanceCard_${index}`}
                                data={eachCard}
                                onPopup={onPopup}
                            />
                        )
                    })}
                    
                </div>
            </div>
        </div>
    )
}

export default Home
