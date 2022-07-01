var input = document.getElementById("xml-upload");
var xmlString = "";
var json;

input.addEventListener("change", readXMLAsString);

function readXMLAsString(e) {
    var files = input.files;
    var reader = new FileReader();

    reader.readAsText(files[0], 'ISO-8859-1');
    reader.onload = (e) => {
        xmlString = e.target.result;
    }
}

var buttonFile = document.getElementById("buttonFile");
buttonFile.addEventListener("click", convertXMLToJSON);

function convertXMLToJSON() {
    var x2js = new X2JS();
    json = x2js.xml_str2json(xmlString);

    createTableEditable(json);
}

function createTableEditable(json) {
    var selectModel = document.getElementsByClassName("model")[0];
    var valueModel = selectModel.options[selectModel.selectedIndex].value;

    var selectModelReport = document.getElementsByClassName("model-report")[0];
    var valueModelReport = selectModelReport.options[selectModelReport.selectedIndex].value;

    var date = new Date();

    var content = `
            <div class="content"> 
                <div id="head-doc">
                    <p>Gerado em: https://ramonalvesmodesto.github.io/gerador-relatorio/</p>
                    <p>${date.toLocaleString()}</p>
                </div>
            </div>

            <div id="logo">
                <img id="jmx" src="https://ramonalvesmodesto.github.io/gerador-relatorio-jmx/img/logomarca1.png">
                <h5 class="title" contenteditable="true">CARREGAMENTO</h5>
            </div>
            <div id="div-table">
                
            </div>
        </div>
    `;

    document.getElementById("generatePDF").style.display = "block";

    var report = document.getElementById("report");
    report.innerHTML = content;

    if (window.Worker) {
        const worker = new Worker("js/script-worker-create-table.js");
        var arr = [];
        arr.push(json);
        arr.push(valueModel);
        arr.push(valueModelReport);

        switch(arr[2]) {
            case 'Relatório NFe':
                document.getElementsByClassName("title")[0].innerHTML = 'Relatório de vendas JMX';
                break
            case 'Relatório Material':
                document.getElementsByClassName("title")[0].innerHTML = 'Relatório Material';
                break;
        }

        worker.postMessage(arr);

        worker.onmessage = (e) => {
            var divTable = document.getElementById("div-table");
            divTable.innerHTML = e.data;
        }
    }

}

function generatePDF() {
    document.getElementsByClassName('btn-generate-pdf')[0].style.display = 'none';
    document.getElementsByClassName('input-file')[0].style.display = 'none';
    document.getElementsByClassName('navbar')[0].style.display = 'none';
    window.print();
    setTimeout(() => {
        document.getElementsByClassName('btn-generate-pdf')[0].style.display = 'flex';
        document.getElementsByClassName('input-file')[0].style.display = 'flex';
        document.getElementsByClassName('navbar')[0].style.display = 'flex';
    }, 0);
}


