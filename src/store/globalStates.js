import { atom } from "jotai";

const headerInitialData = {
    selectedInstanceData: [],
    instanceData : [],
    currentInstance: null,
    tool: null,
    dbTool: null,
    selectedInstances: []
};

export const popupInitialState = {
    name: null,
    isOpen: false,
    data: {}
}

export const initaialBasicData = {
    id:null,
    name: null,
    method: null,
    parameters: {
        hostName: "",
        port: "",
        userName: "",
        password:"",
        defaultSchema:"",
    },
    SSL:{
        sslType:null,
        sslKey: null,
        sslCert:null,
        sslCa:null,
        sslCipher:null
    },
    advanced:{
        comparessionProtocal:null,
        ansiQuotes:null,
        authenticationPlugin: null,
        timeOut:null,
        sqlMode:null,
        others:null
    },
    section: "parameters",
}

export const headerData = atom(headerInitialData);
export const popupData = atom(popupInitialState);
export const basicData = atom(initaialBasicData);