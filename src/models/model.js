
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
    };

    this.chartReInitZero = function (propsData) {
        let data = propsData;

        for (let i=0;i<data.length;i++){
            for (let key in data[i]){
                if(data[i].hasOwnProperty(key)) {
                    if (data[i][key] === "0") {
                        data[i][key] = "No data";
                    }
                }
            }
        }

        return data;
    };

    this.chartsGraphs = function (graphs, data) {
        for (let key in this.chartReInitZero(data)[0]){
            if(this.chartReInitZero(data)[0].hasOwnProperty(key)) {
                if (key !== "category") {
                    graphs.push(key);
                }
            }
        }

        return graphs;
    }
}

export default new Model();

