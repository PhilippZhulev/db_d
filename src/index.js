import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
<<<<<<< HEAD
=======

>>>>>>> Zhulev

//Запускаем рендер React
document.addEventListener("React.run", function() {
    ReactDOM.render(
        <App data={obj} />,
        document.getElementById('APP_panel1')
    );

    console.log("Change: React run....");
});
