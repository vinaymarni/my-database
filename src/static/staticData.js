import database from '../static/localImages/database.png';
import addFolder from '../static/localImages/add-folder.png';
import databaseTable from '../static/localImages/database-table.png';
import file from '../static/localImages/file.png';
import newFile from '../static/localImages/new-file.png';
import preview from '../static/localImages/preview.png';
import reconnect from '../static/localImages/reconnect.png';


export const toolsList = [
    "File", "Edit", "View", "Query", "Database", "Server", "Tools", "Scripting", "Help"
];

export const databaseTools = [
    {
        value: "A",
        url:database,
        content:"Create a new SQL for executing queries"
    },
    {
        value: "B",
        url:addFolder,
        content:"Open a new SQL script file in a new query tab"
    },    {
        value: "C",
        url:newFile,
        content:"Open inspector for the selected object"
    },    
    {
        value: "D",
        url:file,
        content:"Create a new schema in selected server"
    },    
    {
        value: "E",
        url: databaseTable,
        content:"create a new table in the active schema is connected server"
    },  
    {
        value: "F",
        url:databaseTable,
        content:"Create a new view in the active schema is connected server"
    },    
    {
        value: "G",
        url:databaseTable,
        content:"Create a new stored procedure in the active schema in the active server"
    },    
    {
        value: "H",
        url:databaseTable,
        content:"Create a new function in the active schema in a connected server"
    },   
    {
        value: "I",
        url:preview,
        content:"Search table data for text in objects selected in the sidebar schema tree"
    },    
    {
        value: "J",
        url:reconnect,
        content:"Reconnect to DBMS"
    },    
];
export const methodsArray = [
    {id: "1", name: "Standard (TCP/IP)"},
    {id: "2", name: "Local Socket/Pipe"},
    {id: "3", name: "Standard TCP/IP over SSH"},
    {id: "4", name: "LDAP User/Password"},
    {id: "5", name: "LDAP Sasi/Kerberos"},
    {id: "6", name: "Native Kerberos"},
]



export const onMainConClick = (event, id, setter, arg) => {
    var myElement = document.getElementById(id);

    if (myElement && !myElement.contains(event.target)) {
        // console.log('clicked outside');
        setter(arg);
    }
};
