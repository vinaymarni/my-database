import { CrossIconSvg } from "../../commonElements/commonSvgs";
import InputField from "../../commonElements/InputField";
import Button from "../../commonElements/Button";
import databaseCloud from '../../static/localImages/databaseCloud.png';
import { useAtom } from "jotai";
import { headerData, popupData } from "../../store/globalStates";

export default function SelectInstancePopup({onPopup}) {
    const [{data, comfirmPassword}, setPopup] = useAtom(popupData);
    const {userName, port, password} = data.parameters;
    
    const [,setAllHeaderData] = useAtom(headerData);
  
    const onValueChange = (e) => {
      if(e){
        let name = e.target.name;
        let value = e.target.value;
        setPopup(prev => ({ ...prev, [name]: value }))
      }
    };

  const onSubmit = () => {
    if(comfirmPassword && comfirmPassword !== ""){
      if(password && password === comfirmPassword){
        const newData = {...data, instanceId : Math.ceil(Math.random()*1000)}
        setAllHeaderData(prev => {
          let oldData = [...prev.selectedInstanceData];  
          return {...prev, selectedInstanceData: [...oldData, newData]};
        });
        onPopup(false);
      }else{
        // close popup and open error popup 
        onPopup(true, "errorInstancePopup", data);
      }
    }else{
      console.log("Please Enter Password");
    }
  };

  return (
    <div className="projectPopupStaticCon" >
        <div className="projectPopupinnerPopupCon selectInstancePopupCon" id='innerResumeContainer'>
            <div className="projectPopupHeaderCon">
                <h3 className='selectInstancePopupHeading'>
                  <img alt="" src={databaseCloud} />
                  Connect to DataBase Server
                </h3>

                <CrossIconSvg className="popupCrossIcon" onClick={()=>onPopup(false)} />
            </div>

            <div className='selectInsPopupContentBlock'>
                <div className="selectInsPopupImgBlock"></div>
                <div className="selectInsPopupDataBlock">
                  <p className="selectInsPopupLable">Please Enter Password for the following service:</p>
                  <p className="selectInsPopupLable">Service: <span>{port ? port : ""}</span></p>
                  <p className="selectInsPopupLable">User: <span>{userName ? userName : ""}</span></p>
                  <InputField 
                      key="selectInsPopupPasswordField"
                      inputId="selectInsPopupPasswordField"
                      name="comfirmPassword"
                      value={comfirmPassword ? comfirmPassword : "" }
                      required={true}
                      placeholder="Type a name for the connection"
                      inputType="text"
                      onChange={onValueChange}
                      labelName="Password:"
                      labelClassName="selectInsPopupLable"
                      inputClassName="addInstanceNameField"
                      containerClass="addInstanceNameFieldCon"
                  />
                </div>
            </div>

            <div className="popupFooter">
                <Button 
                  key="SelectInstancePopupButton"
                  buttonId="SelectInstancePopupButton"
                  name="submit"
                  value="submit"
                  onSubmit={onSubmit}
                  buttonClassName="NewInstancePopupButton"
                  title="OK"
                />

                <Button 
                  key="cancelInstancePopupButton"
                  buttonId="cancelInstancePopupButton"
                  name="submit"
                  value={false}
                  onSubmit={()=>onPopup(false)}
                  buttonClassName="NewInstancePopupButton"
                  title="Cancel"
                />
            </div>
            
        </div>
    </div>
  )
}

