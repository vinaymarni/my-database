import React from 'react';
import House from '../../static/localImages/House.png';
import Button from '../../commonElements/Button';
import { useAtom } from 'jotai';
import { headerData } from '../../store/globalStates';
import {  CrossIconSvg } from '../../commonElements/commonSvgs';

function InstanceBar() {
  const [allHeaderData, setAllHeaderData] = useAtom(headerData);
  const {selectedInstanceData, currentInstance} = allHeaderData;

  const onValueChange = (e, key, value) => {
    if(e){
      let name = e.target.name;
      let value = e.target.value;
      setAllHeaderData(prev => ({...prev, [name]: value}));
    }else{
      setAllHeaderData(prev => {
        let oldData = [...prev.selectedInstanceData];
        let updatedList = oldData.filter((eachObj)=> eachObj.id !== value);
        return {...prev, [key]: updatedList};
      });
    }
  };
  
  return (
    <div className="TopStaticHeaderMainCon InstanceBarMainCon">
      <img 
        src={House} alt="" 
        className="headerHomeIcon" 
        onClick={(e) => onValueChange({target: { name: "currentInstance", value: null }})}
      />

      {selectedInstanceData && selectedInstanceData.map((each, index) => {
        return (
          <Button 
            key={`instance_${index}`}
            buttonId={`instance_${index}`}
            buttonClassName={`instanceButtons ${currentInstance == each.id ? "currentInstanceButtons" : ""}`}
            name="currentInstance"
            value={each.id}
            toolTip={`Click to Open ${each.name}`}
            onSubmit={(e) => onValueChange(e)}
            title={`${each.name} Instance`}
            icon={<CrossIconSvg 
              key={`instance_cross_${index}`}
              className="instanceButtonCrossIcon" 
              onClick={()=>onValueChange(undefined, "selectedInstanceData", each.id)} 
            />}
          />
        )
      })}
      
    </div>
  )
}

export default InstanceBar
