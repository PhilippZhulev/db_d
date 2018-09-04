function Reactor() {
    this.run = function() {
        //Получаем globalSettings
        obj.super = {};

        const xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.status === 200 && xmlHttp.readyState === 4){
                obj.super = xmlHttp.responseText;
            }
        };

        xmlHttp.open("GET", "local_api/data.json",false);
        xmlHttp.send();

        //Получаем и парсим JSON
        obj.changeData = JSON.parse(obj.super);

        let jsonData = JSON.parse(obj.super);

        obj.dummyData = {
            data: jsonData.data,
            drivers: jsonData.drivers,
            driver_options: jsonData.driver_options
        };

        //После парсинга JSON запускаем событие reactRun (Только если payload = START тоесть только при первой загрузке)
        if(obj.changeData.payload === "START") {
            document.dispatchEvent(reactRun);
        }

        //При каждом обновление запукаем событие reactUpdate и даем знать React что загрузка данных завершена
        document.dispatchEvent(reactUpdate);

    }
}

setTimeout(function () {
    const reactor = new Reactor();
    reactor.run();
}, 1000);