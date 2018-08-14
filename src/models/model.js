
function Model() {
    this.main = function (obj) {
        let groups = {},
            drivers = obj;

        console.log(drivers);
        for (let ind = 0; ind < drivers.length; ind++){

            let group = drivers[ind].group,
                driver = drivers[ind],
                newData = {},
                transGroup = group;

            if(!(group in groups)){
                groups[transGroup]=[];
            }

            for (let key in driver){
                if (key !== "group"){
                    if(driver.hasOwnProperty(key)) {
                        newData[key] = driver[key];
                    }
                }
            }

            groups[transGroup].push(newData);
        }

        return groups;
    }
}

export default new Model();

