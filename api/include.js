function Reactor() {
    this.run = function() {

        //Получаем globalSettings
        obj.glob = this.globalSettings;

        //Получаем и парсим JSON
        obj.dummyData = JSON.parse(obj.glob.Settings.initial_data);

        //После парсинга JSON запускаем событие reactRun (Только если payload = START тоесть только при первой загрузке)
        if(obj.dummyData.payload === "START") {
            document.dispatchEvent(reactRun);
        }

        //При каждом обновление запукаем событие reactUpdate и даем знать React что загрузка данных завершена
        document.dispatchEvent(reactUpdate);

    }
}
