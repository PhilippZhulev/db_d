import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { obj, updateState, reactRun, reactUpdate} from './api/include';
import json from './json/data';


//Запускаем рендер React
document.addEventListener("React.run", function() {
    ReactDOM.render(
        <App data={obj} />,
        document.getElementById('APP_panel1')
    );

    console.log("Change: React run....");
});
