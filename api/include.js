function Reactor() {
    this.run = function() {

        //Получаем globalSettings
        obj.glob = this.globalSettings;

        //Получаем и парсим JSON
        obj.changeData = JSON.parse(obj.glob.Settings.initial_data);

        console.log(obj.glob.Settings.driver_options);

        try {

            obj.dummyData = {
                data: JSON.parse(obj.glob.Settings.data),
                drivers: JSON.parse(obj.glob.Settings.drivers),
                driver_options: JSON.parse(obj.glob.Settings.driver_options),
                table: obj.glob.Settings.table,
                bookmark: JSON.parse(obj.glob.Settings.bookmark)
            };

        } catch (err) {
            console.error(err);
            document.dispatchEvent(reactError);

        }

        console.log("ДАТА ПЕРВОПРОХОДЕЦ ОСНОВАТЕЛЬ:");
        //console.log(JSON.stringify(obj.glob.Settings.data));
        console.log(obj.dummyData);

        //После парсинга JSON запускаем событие reactRun (Только если payload = START тоесть только при первой загрузке)
        if(obj.changeData.payload === "START") {
            document.dispatchEvent(reactRun);
        }

        //При каждом обновление запукаем событие reactUpdate и даем знать React что загрузка данных завершена
        document.dispatchEvent(reactUpdate);

    }
}

