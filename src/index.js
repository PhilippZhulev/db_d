import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

//Запускаем рендер React
// ReactDOM.render(
//     <App />,
//     document.getElementById('APP_panel1')
// );
//
// console.log("Change: React run....");

//Запускаем рендер React
document.addEventListener("React.run", function() {
    ReactDOM.render(
        <App />,
        document.getElementById('APP_panel1')
    );

    console.log("Change: React run....");
});
