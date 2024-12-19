import { CrossIconSvg } from "../../commonElements/commonSvgs";
import { methodsArray, onMainConClick } from "../../static/staticData";
import databaseCloud from '../../static/localImages/databaseCloud.png';
import InputField from "../../commonElements/InputField";
import { useAtom } from "jotai";
import { basicData, headerData, initaialBasicData } from "../../store/globalStates";
import Button from "../../commonElements/Button";
import Dropdown2 from "../../commonElements/dropdown2";
import PopupAllSections from "./instancePopupComponents/PopupAllSections";


export default function NewInstancePopup({onPopup}) {
  const [connectoinData, setConnectoinData] = useAtom(headerData);
  const [data, setData] = useAtom(basicData);
  const {name, method} = data;

  const onValueChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData(prev => ({...prev, [name]: value, id: connectoinData.instanceData.length}));
  };

  const onSubmit = () => {
    let oldData = [...connectoinData.instanceData];
    let oldNames = oldData.map(eachName => eachName.name);

    if(!oldNames.includes(data.name)){
      setConnectoinData(prev => {
        let oldData = [...prev.instanceData, data];
        return {...prev, instanceData: oldData };
      });

      setData(initaialBasicData);
      onPopup(false);
      console.log(data);
    }else{
      console.log("name alredy exist");
    }
  };

  return (
    <div className="projectPopupStaticCon" 
        // onClick={(e)=>onMainConClick(e, 'innerResumeContainer', {}, false )} 
    >
        <div className="projectPopupinnerPopupCon" id='innerResumeContainer'>
            <div className="projectPopupHeaderCon">
                <h3 className='resumePopupHeading'>
                  <img alt="" src={databaseCloud} />
                  Add new Connection
                </h3>

                <CrossIconSvg className="popupCrossIcon" onClick={()=>onPopup(false)} />
            </div>

            <div className='resumeContainer'>
                <InputField 
                  key="NewInstancePopupField"
                  inputId="NewInstancePopupField"
                  name="name"
                  value={name}
                  required={true}
                  placeholder="Type a name for the connection"
                  inputType="text"
                  onChange={onValueChange}
                  labelName="Connection Name:"
                  labelClassName="addInstanceNameLable"
                  inputClassName="addInstanceNameField"
                  containerClass="addInstanceNameFieldCon"
                />

                <Dropdown2 
                  key="NewInstancePopupDropdown"
                  inputId="instanceMethod"
                  required={false}
                  name="method"
                  value={method}
                  onChange={onValueChange}
                  dropdownArray={methodsArray}
                  className="addInstanceNameField"
                  placeholder="Method to use to connect to the RDBMS"
                  label="Connection Method:"
                  labelClassName="addInstanceNameLable"
                  mainDropdownCon="addInstanceNameFieldCon"
                  containerClassName="instanceNameDropdownMainCon"
                />

                <PopupAllSections />
            </div>

            <div className="popupFooter">
                <Button 
                  key="NewInstancePopupButton"
                  buttonId="NewInstancePopupButton"
                  name="submit"
                  onSubmit={onSubmit}
                  buttonClassName="NewInstancePopupButton"
                  title="OK"
                />
            </div>
            
        </div>
    </div>
  )
}

