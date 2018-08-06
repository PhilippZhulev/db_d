//чистим link c sab css
var link = document.querySelectorAll('link[data-sap-ui-ready="true"]');

for(let i = 0; i < link.length;i++) {
    link[i].parentNode.removeChild(link[i]);
}

//Отключить дотошный скролл на ipad
document.querySelector('body').addEventListener('touchmove', function(e) {
    e.preventDefault();
});

//Функция кроссбраузерных генерации кастомных событий
function createNewEvent(eventName) {
    if(typeof(Event) === 'function') {
        return event = new Event(eventName);
    }else{
        var event = document.createEvent('Event');
        return event;
    }
}

//Инициализация события для ie
function initIENewEvent(event, eventName) {
    if(typeof(Event) !== 'function') {
        return event.initEvent(eventName, false, true);
    }
}

//Создаем события для старта и обновления React
var reactRun = createNewEvent("React.run");
var reactUpdate = createNewEvent("React.update");

initIENewEvent(reactRun, "React.run");
initIENewEvent(reactUpdate, "React.update");

//Создаем глобальный обект для управления данными
var obj = {};

//Функция Action для обновления данных после загрузки их с сервера
function updateState(action, func) {
    obj.glob.Settings.actionType = action[0];
    obj.glob.Settings.actionContent = action[1];

    obj.glob.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");
    document.addEventListener("React.update", func);
}
console.log(reactUpdate);

//Первичный запрос данных
function req(change) {
    obj.glob.Settings.reactReq = change;
    return obj.glob.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");
}


