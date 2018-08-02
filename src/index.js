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

const Reactor = function() {
    this.run = function() {
        //Получаем globalSettings
        obj.glob = this.globalSettings;

        obj.dummyData = json;

        //После парсинга JSON запускаем событие reactRun (Только если payload = START тоесть только при первой загрузке)
        if(obj.dummyData.payload === "START") {
            document.dispatchEvent(reactRun);
        }
        //При каждом обновление запукаем событие reactUpdate и даем знать React что загрузка данных завершена
        document.dispatchEvent(reactUpdate);
    }
}

var re = new Reactor().run();