import { CrossIconSvg } from "../../commonElements/commonSvgs";
import InputField from "../../commonElements/InputField";
import Button from "../../commonElements/Button";
import databaseCloud from '../../static/localImages/databaseCloud.png';
import { useAtom } from "jotai";
import { headerData, popupData } from "../../store/globalStates";

export default function SelectInstancePopup({onPopup}) {
    const [popup, setPopup] = useAtom(popupData);
    const {data} = popup;
    const [,setAllHeaderData] = useAtom(headerData);

  
    const onValueChange = (e) => {
      if(e){
        let name = e.target.name;
        let value = e.target.value;
        setPopup(prev => {
          let oldObj = prev.data;
          oldObj[name] = value;
          return {...prev, data: oldObj};
        })
      }
    };


  const onSubmit = () => {
    if(data.parameters && data.parameters.password === data.password){
      setAllHeaderData(prev => {
        let oldData = [...prev.selectedInstanceData];
        return {...prev, selectedInstanceData: [...oldData, data]};
      });
      onPopup(false);
    }else{
      // close popup and open error popup 
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
                  <p className="selectInsPopupLable">Service: <span>{data && data.name ? data.name : ""}</span></p>
                  <p className="selectInsPopupLable">User: <span>{data && data.userName ? data.userName : ""}</span></p>
                  <InputField 
                      key="selectInsPopupPasswordField"
                      inputId="selectInsPopupPasswordField"
                      name="password"
                      value={data && data.password ? data.password : "" } 
                      required={true}
                      placeholder="Type a name for the connection"
                      inputType="text"
                      onChange={onValueChange}
                      labelName="Connection Name:"
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

