import { CrossIconSvg } from "../../commonElements/commonSvgs";
import Button from "../../commonElements/Button";
import { useAtom } from "jotai";
import { popupData } from "../../store/globalStates";

export default function ErrorInstancePopup({onPopup}) {
    const [{data}] = useAtom(popupData);
    const {userName, port} = data.parameters;

  return (
    <div className="projectPopupStaticCon" >
        <div className="projectPopupinnerPopupCon selectInstancePopupCon" id='innerResumeContainer'>
            <div className="projectPopupHeaderCon">
                <h3 className='selectInstancePopupHeading'>
                 DataBase Workbench
                </h3>

                <CrossIconSvg className="popupCrossIcon" onClick={()=>onPopup(false)} />
            </div>

            <div className='selectInsPopupContentBlock'>
                <div className="selectInsPopupImgBlock"></div>
                <div className="selectInsPopupDataBlock">
                  <h2 className="errorInstancePopupHeading">Cannot Connect to database server</h2>
                  <p className="selectInsPopupLable">
                    Your connection attemp is failed for user {userName} to the data base server at {port}
                  </p>
                  <p className="selectInsPopupLable">
                    Access denaied for user {userName}'@'{port}{"("}Using Password: YES{")"}
                  </p>
                </div>
            </div>

            <div className="popupFooter">
                <Button 
                  key="cancelInstancePopupButton"
                  buttonId="cancelInstancePopupButton"
                  name="Cancel"
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

