
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
                title: "ROE",
                mera: "%",
            },
            COR:{
                title: "COR",
                mera: "%",
            },
            CHIS:{
                title: "Численность",
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
                    if (key === "model"){
                        graphs.push("base");
                    }else
                    if (key === "base"){
                        graphs.push("model");
                    }else
                    if (key === "strategy"){
                        graphs.push("strategy");
                    }
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

    this.getCategory = function(arr) {
        let category = [];
        for ( let i = 0; i < arr.length; i++){
            if(!category.includes(arr[i].category)){
                category.push(arr[i].category);
            }
        }

        return category
    };

    this.parseTable = function(incStr) {
        let str = incStr;
        if (str === undefined){
            str = "1||||||||||||||||$_$2|||Категория NIM|4,25%||||4,5%||||4,75%||||$_$3|||Категория CAGR|12,0%|13,0%|10,2%|16,0%|12,0%|13,0%|10,2%|16,0%|12,0%|13,0%|10,2%|16,0%|$_$4||Категория CIR|Категория COR Пок|Значение|Значение|Значение|Значение|Значение|Значение|Значение|Значение|Значение|Значение|Значение|Значение|$_$5||31%|1,9%|761|770|745|799|803|812|787|841|896|905|880|934|$_$6|||1,7%|801|811|785|839|844|853|827|881|937|946|920|974|$_$7|||1,5%|842|851|826|880|884|893|868|922|977|986|961|1 015|$_$8|||1,0%|946|955|930|984|988|997|972|1 026|1 081|1 090|1 065|1 119|$_$9|||1,2%|912|922|896|950|954|964|938|992|1 047|1 057|1 031|1 085|$_$10||32%|1,9%|759|768|743|797|801|810|785|839|894|903|878|932|$_$11|||1,7%|800|809|783|837|842|851|825|879|934|944|918|972|$_$12|||1,5%|840|849|824|878|882|891|866|920|975|984|959|1 013|$_$13|||1,0%|944|953|928|982|986|995|970|1 024|1 079|1 088|1 063|1 117|$_$14|||1,2%|910|920|894|948|952|962|936|990|1 045|1 055|1 029|1 083|$_$15||33%|1,9%|742|751|726|780|784|793|768|821|875|884|859|913|$_$16|||1,7%|783|792|767|820|824|833|808|861|916|925|900|953|$_$17|||1,5%|823|832|807|860|865|874|849|902|956|965|940|993|$_$18|||1,0%|927|936|911|964|968|978|953|1 006|1 060|1 069|1 044|1 097|$_$19|||1,2%|894|903|878|931|935|944|919|972|1 027|1 036|1 011|1 064|$_$20||34%|1,9%|726|735|710|762|766|775|751|803|857|865|841|893|$_$21|||1,7%|766|775|750|803|807|816|791|843|897|906|881|934|$_$22|||1,5%|806|815|791|843|847|856|831|884|937|946|922|974|$_$23|||1,0%|910|919|895|947|951|960|935|988|1 041|1 050|1 025|1 078|$_$24|||1,2%|877|886|861|914|918|927|902|954|1 008|1 017|992|1 044|$_$";
        }
        const strArr = str.split("|");
        let newStr = "";
        for (let i=0;i<strArr.length;i++){
            if(strArr[i]!==""){
                let split = (newStr === "") ? "" : "-=$=-";
                newStr = newStr+split+strArr[i];
            }
        }
        let arrInclude = newStr.split("$_$"),
            arr =[];

        for (let i=0; i < arrInclude.length; i++){
            arr.push(arrInclude[i].split("-=$=-"));
            arr[i].shift();
            arr[i].pop();
        }
        arr.shift();
        arr.pop();

        let oldNIM = [];
        for (let i =1; i<arr[0].length;i++){
            oldNIM.push(arr[0][i]);
        }
        let CAGR = [];
        let oldCAGR = [];

        for (let i = 1;i < arr[1].length; i++){
            CAGR.push(arr[1][i]);
            if (!oldCAGR.includes(arr[1][i])){
                oldCAGR.push(arr[1][i]);
            }
        }

        let NIM = [];
        for (let i = 0;i<oldNIM.length;i++){
            for (let j = 0; j < CAGR.length/oldNIM.length; j++){
                NIM.push(oldNIM[i]);
            }
        }

        let CIR = [];
        let oldCIR = [];
        let COR = [];
        let oldCOR = [];
        for (let i=3;i<arr.length;i++){
            let cirVal = (arr[i].length === arr[2].length) ? arr[i][0] : undefined;
            let corVal = (arr[i].length === arr[2].length) ? arr[i][1] : arr[i][0];
            if (arr[i].length === arr[2].length){
                arr[i].shift();
            }
            arr[i].shift();
            if (cirVal !== undefined){
                oldCIR.push(cirVal);
                CIR.push(cirVal);
            } else{
                CIR.push(CIR[CIR.length-1]);
            }
            COR.push(corVal);
            if (!oldCOR.includes(corVal)){
                oldCOR.push(corVal);
            }
        }

        arr.shift();
        arr.shift();
        arr.shift();


        let table = {
            data:[],
            CIR:CIR,
            oldCIR:oldCIR,
            COR:COR,
            oldCOR:oldCOR,
            CAGR:CAGR,
            oldCAGR:oldCAGR,
            NIM:NIM,
            oldNIM:oldNIM,
            defaultSel:{
                CIR: String(oldCIR.indexOf("32%")),
                COR: String(oldCOR.indexOf("1,5%")),
                CAGR: String(oldCAGR.indexOf("13,0%")),
                NIM: String(oldNIM.indexOf("4,5%"))
            }
        };
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
        console.log("oldCOR:");
        console.log(oldCOR);
        console.log("oldCAGR:");
        console.log(oldCAGR);
        return table
    }
}

export default new Model();

