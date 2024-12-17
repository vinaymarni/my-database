import React from 'react'
import { databaseTools } from '../../static/staticData'
import Button from '../../commonElements/Button'
import { useAtom } from 'jotai';
import { headerData } from '../../store/globalStates';

function DbToolBar() {
  const [allHeaderData, setAllHeaderData] = useAtom(headerData);

  const onValueChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setAllHeaderData(prev => ({...prev, [name]: value}));
  };

  return (
    <div className="TopStaticHeaderMainCon dbToolBarMainCon">
      {databaseTools.map((each)=>{
        return (
          <Button
            key={`dbTool_${each.value}`}
            buttonId={`dbTool_${each.value}`}
            buttonClassName={`dbToolButton`}
            name="dbTool"
            value={each.value}
            onSubmit={(e) => onValueChange(e)}
            toolTip={each.content}
            icon={<img src={each.url} alt="" className='dbToolImage' />}
          />
        )
      })}
    </div>
  )
}

export default DbToolBar
