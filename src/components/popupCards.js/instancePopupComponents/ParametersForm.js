import React from 'react'
import InputField from '../../../commonElements/InputField'
import { useAtom } from 'jotai';
import { basicData } from '../../../store/globalStates';
import Button from '../../../commonElements/Button';

function ParametersForm() {
    const [data, setData] = useAtom(basicData);
    const {hostName, port, userName, password} = data.parameters;
            
    const onValueChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prev => {
            let oldData = {...prev.parameters};
            oldData[name] = value;
            return {...prev, parameters: oldData}
        });
    };
    return (
        <>
            <div className='horOrderCon'>
                <InputField
                    key="hostnameField"
                    inputId="hostnameField"
                    name="hostName"
                    value={hostName}
                    required={true}
                    placeholder="Enter HostName"
                    inputType="text"
                    onChange={onValueChange}
                    labelName="Hostname:"
                    labelClassName="addInstanceNameLable"
                    inputClassName="addInstanceNameField"
                    containerClass="addInstanceNameFieldCon"
                />

                <InputField
                    key="portField"
                    inputId="portField"
                    name="port"
                    value={port}
                    required={true}
                    placeholder="Enter port"
                    inputType="text"
                    onChange={onValueChange}
                    labelName="Port:"
                    labelClassName="addInstanceNameLable"
                    inputClassName="addInstanceNameField"
                    containerClass="addInstanceNameFieldCon portFieldCon"
                />
            </div>

            <InputField
                key="userNameField"
                inputId="userNameField"
                name="userName"
                value={userName}
                required={true}
                placeholder="Enter Username"
                inputType="text"
                onChange={onValueChange}
                labelName="Username:"
                labelClassName="addInstanceNameLable"
                inputClassName="addInstanceNameField"
                containerClass="addInstanceNameFieldCon"
            />

            <div className='horOrderCon'>
                <InputField
                    key="passwordField"
                    inputId="passwordField"
                    name="password"
                    value={password}
                    required={true}
                    placeholder="Enter password"
                    inputType="text"
                    onChange={onValueChange}
                    labelName="password:"
                    labelClassName="addInstanceNameLable"
                    inputClassName="addInstanceNameField"
                    containerClass="addInstanceNameFieldCon portFieldCon"
                />
                <Button
                    key="passwordClrBtn"
                    buttonId="passwordClrBtn"
                    name="password"
                    value=""
                    onSubmit={onValueChange}
                    buttonClassName={`passwordClrBtn`}
                    title="Clear Password"
                />
            </div>
        </>
    )
}

export default ParametersForm
