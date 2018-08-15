
function Model() {
    this.main = function (obj) {
        let groups = {},
            drivers = obj;

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

    this.tileCalc = (f, p, data) => {
        const func = f;
        const page = p;
        const lastCat = data[page][func].length;
        const mainVal = data[page][func][lastCat-1]["model"];
        const smallVal = "("+((+(data[page][func][lastCat-1]["model"])-(+(data[page][func][lastCat-1]["base"])))/(+(data[page][func][lastCat-1]["base"]))*100).toFixed(2)+"%)";
        let mainValAll = "";
        let smallValAll = "";
        if ((page !== "OPEX") && (page !== "ALL")){
            mainValAll = data["ALL"][func][lastCat-1]["model"];
            smallValAll = "("+((+(data["ALL"][func][lastCat-1]["model"])-(+(data["ALL"][func][lastCat-1]["base"])))/(+(data["ALL"][func][lastCat-1]["base"]))*100).toFixed(2)+"%)";
        }

        return {
            smallVal:smallVal,
            mainVal:mainVal,
            mainValAll:mainValAll,
            smallValAll:smallValAll,
            data:data
        };
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

    this.tilesBind = ()=> {
        return {
            PI: {
                title: "Чистая прибыль",
                mera: "млрд. руб.",
            },
            INC:{
                title: "Чистые опер. доходы",
                mera: "млрд. руб.",
            },
            OPEX:{
                title: "OPEX",
                mera: "млрд. руб.",
            },
            CIR:{
                title: "CIR",
                mera: "%",
            },
            KOM:{
                title: "Комиссии / OPEX",
                mera: "%",
            },
            COR:{
                title: "COR",
                mera: "%",
            },
            CHIS:{
                title: "Численность ПАО",
                mera: "тыс.чел.",
            },
            OPEX_op:{
                title: "OPEX",
                mera: "млрд. руб.",
            },
            PERS_op:{
                title: "Персонал",
                mera: "млрд. руб.",
            },
            IT_op:{
                title: "IT",
                mera: "млрд. руб.",
            },
            NEDV_op:{
                title: "Недвижимость",
                mera: "млрд. руб.",
            },
            BIS_op:{
                title: "Бизнес-расходы",
                mera: "млрд. руб.",
            },
            MAR_op:{
                title: "Маркетинг",
                mera: "млрд. руб.",
            },
            PROC_op:{
                title: "Прочие расходы",
                mera: "млрд. руб.",
            }
        };
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

