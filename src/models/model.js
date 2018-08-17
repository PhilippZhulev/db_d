
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
        const smallVal = "("+((+(data[page][func][lastCat-1]["model"])-(+(data[page][func][lastCat-1]["base"])))/(+(data[page][func][lastCat-1]["base"]))*100).toFixed(1)+"%)";
        let mainValAll = "";
        let smallValAll = "";
        if ((page !== "OPEX") && (page !== "ALL")){
            mainValAll = data["ALL"][func][lastCat-1]["model"];
            smallValAll = "("+((+(data["ALL"][func][lastCat-1]["model"])-(+(data["ALL"][func][lastCat-1]["base"])))/(+(data["ALL"][func][lastCat-1]["base"]))*100).toFixed(1)+"%)";
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
    };

    this.getGroups = function(arr) {
        let groups = [];
        for ( let i = 0; i < arr.length; i++){
            if(!groups.includes(arr[i].group)){
                groups.push(arr[i].group);
            }
        }

        return groups
    };

    this.parseTable = function(data) {
        const strArr = data.split("|");
        let newStr = "";
        for (let i=0;i<strArr.length;i++){
            if(strArr[i]!==""){
                let split = (newStr === "") ? "" : "-=$=-";
                newStr = newStr+split+strArr[i];
            }
        }
        let arr = newStr.split("$_$");
        for (let i=0;i<arr.length;i++){
            arr[i] = arr[i].split("-=$=-");
            arr[i].shift();
            arr[i].pop();
        }
        arr.shift();
        arr.pop();
        // console.log(arr);

        let oldNIM = [];
        for (let i =1; i<arr[0].length;i++){
            oldNIM.push(arr[0][i]);
        }
        let CAGR = [];
        //for (let i =1; i<(arr[1].length-1)/(arr[0].length-1)+1;i++){
        for (let i = 1;i < arr[1].length; i++){
            CAGR.push(arr[1][i]);
        }
        // console.log(CAGR);
        let NIM = [];
        for (let i = 0;i<oldNIM.length;i++){
            for (let j = 0; j < CAGR.length/oldNIM.length; j++){
                NIM.push(oldNIM[i]);
            }
        }
        // console.log(NIM);
        let CIR = [];
        let COR = [];
        for (let i=3;i<arr.length;i++){
            let cirVal = (arr[i].length === arr[2].length) ? arr[i][0] : CIR[CIR.length-1];
            let corVal = (arr[i].length === arr[2].length) ? arr[i][1] : arr[i][0];
            if (arr[i].length === arr[2].length){
                arr[i].shift();
            }
            arr[i].shift();
            CIR.push(cirVal);
            COR.push(corVal);
        }
        // console.log(CIR);
        // console.log(COR);

        arr.shift();
        arr.shift();
        arr.shift();

        // console.log(arr);

        let table = {data:[], CIR:CIR, COR:COR, CAGR:CAGR, NIM:NIM};
        for (let i = 0; i < CIR.length; i++){
            for (let j = 0; j < CAGR.length; j++){
                let cell = {};
                cell.NIM = NIM[j];
                cell.CAGR = CAGR[j];
                cell.CIR = CIR[i];
                cell.COR = COR[i];
                cell.value = arr[i][j];
                table.data.push(cell);
            }
        }
        console.log(table);
        return table
    }
}

export default new Model();

