import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


let dump;

//Запускаем рендер React
document.addEventListener("React.run", function() {

    dump = (typeof(window.obj) !== "undefined" && window.obj !== null) ? window.obj : {};

    ReactDOM.render(
        <App data={dump}/>,
        document.getElementById('APP_panel1')
    );

    console.log("Change: React run....");
});



