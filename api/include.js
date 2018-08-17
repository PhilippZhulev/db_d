function Reactor() {
    this.run = function() {

        //Получаем globalSettings
        obj.glob = this.globalSettings;

        //Получаем и парсим JSON
        obj.changeData = JSON.parse(obj.glob.Settings.initial_data);

        try {

            obj.dummyData = {
                data: JSON.parse(obj.glob.Settings.data),
                drivers: JSON.parse(obj.glob.Settings.drivers),
                table: obj.glob.Settings.table
            };

        } catch (err) {

            document.dispatchEvent(reactError);

        }

        //После парсинга JSON запускаем событие reactRun (Только если payload = START тоесть только при первой загрузке)
        if(obj.changeData.payload === "START") {
            document.dispatchEvent(reactRun);
        }

        //При каждом обновление запукаем событие reactUpdate и даем знать React что загрузка данных завершена
        document.dispatchEvent(reactUpdate);

    }
}

