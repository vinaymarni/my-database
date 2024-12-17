import React from 'react'
import { toolsList } from '../../static/staticData'
import { useAtom } from 'jotai';
import { headerData } from '../../store/globalStates';
import Button from '../../commonElements/Button';

function TopStaticToolBar() {
  const [allHeaderData, setAllHeaderData] = useAtom(headerData);
  const {tool} = allHeaderData;

  const onValueChange = (e, key, value) => {
    if(e){
      let name = e.target.name;
      let value = e.target.value;
      setAllHeaderData(prev => ({...prev, [name]: value}));
    }else{
      setAllHeaderData(prev => {
        let oldData = [...prev.instanceData];
        let updatedList = oldData.filter((eachObj)=> eachObj.id !== value);
        return {...prev, [key]: updatedList};
      });
    }
  };

  return (
    <div className="TopStaticHeaderMainCon InstanceBarMainCon">
      {toolsList.map((each)=>{
        return (
          <Button
            key={`tool_${each}`}
            buttonId={`tool_${each}`}
            buttonClassName={`toolButton ${tool == each ? "selectedToolButton" : ""}`}
            name="tool"
            value={each}
            onSubmit={(e) => onValueChange(e)}
            title={each}
          />
        )
      })}
    </div>
  )
}

export default TopStaticToolBar
