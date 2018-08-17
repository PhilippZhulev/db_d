import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


let dump;
const root = document.getElementById('APP_panel1');

//Запускаем рендер React
document.addEventListener("React.run", function() {

    dump = (typeof(window.obj) !== "undefined" && window.obj !== null) ? window.obj : {};

    ReactDOM.render(
        <App data={dump}/>,
        root
    );

    root.classList.add("active");

    console.log("Change: React run....");
});

document.addEventListener("React.error", function() {

    alert("Ошибка при получении данных.");

    console.log("Change: React error....");
});


