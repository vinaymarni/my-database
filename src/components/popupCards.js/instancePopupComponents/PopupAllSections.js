import React from 'react';
import Button from '../../../commonElements/Button';
import { useAtom } from 'jotai';
import { basicData } from '../../../store/globalStates';
import ParametersForm from './ParametersForm';
import SslForm from './SslForm';
import AdvancedForm from './AdvancedForm';

const sections = ["parameters", "SSL", "advanced"];

function PopupAllSections() {
    
    const [data, setData] = useAtom(basicData);
    const {section} = data;
        
    const onValueChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData(prev => ({...prev, [name]: value}));
    };

    return (
        <div className="instancePopupBottomSection">
            <div className="popupSectionsBtnsCon">
                {sections.map(each=>{
                    return (
                        <Button
                            key={each}
                            buttonId={each}
                            name="section"
                            value={each}
                            onSubmit={onValueChange}
                            buttonClassName={`popupSectionsBtn ${section == each ? "selectedSectionsBtn" : ""} `}
                            title={each}
                        />
                    )
                })}
            </div>

            <div className="popupSectionsFormsCon">
                {section == "parameters" && <ParametersForm /> }  
                {section == "SSL" && <SslForm /> } 
                {section == "advanced" && <AdvancedForm /> }   
            </div>       
        </div>
    )
}

export default PopupAllSections
