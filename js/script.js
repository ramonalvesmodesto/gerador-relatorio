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
    var select = document.getElementsByClassName("form-select")[0];
    var value = select.options[select.selectedIndex].value;
    var date = new Date();

    var content = `
        <div class="content">
            <div id="head-doc">
                <p>Gerado em: https://ramonalvesmodesto.github.io/gerador-relatorio-jmx/</p>
                <p>${date.toLocaleString()}</p>
                <p>https://github.com/ramonalvesmodesto</p>
            </div>
            
            <div id="logo">
                <img id="jmx" src="https://ramonalvesmodesto.github.io/gerador-relatorio-jmx/img/logomarca1.png">
                <h5 class="title" contenteditable="true">CARREGAMENTO</h5>
            </div>
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th><strong>DATA</strong></th>
                        <th><strong>MOTORISTA</strong></th>
                        <th><strong>PLACA</strong></th>
                        <th><strong>DESTINO</strong></th>
                        <th><strong>${value}</strong></th>
                        <th><strong>MATERIAL</strong></th>
                        <th><strong>QUANTIDADE(TON)</strong></th>
                        <th><strong>VALOR DO MATERIAL</strong></th>
                        <th><strong>TOTAL</strong></th>
                    </tr>
                </thead>

                <tbody id="itens-table">

                </tbody>
            </table>
        </div>
    `;

    document.getElementById("generatePDF").style.display = "block";

    var report = document.getElementById("report");
    report.innerHTML = content;
    
    if(window.Worker) {
        const worker = new Worker("js/script-worker-create-table.js");
        var arr = [];
        arr.push(json);
        arr.push(value)

        worker.postMessage(arr);

        worker.onmessage = (e) => {
            var item = document.getElementById("itens-table");
            item.innerHTML = e.data;
        }
    }
   
}

function generatePDF() {
    var table = document.getElementById("report").innerHTML;
    var win = window.open('', '', '', 'width=700');
    var html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet">
                <link rel="stylesheet" href="./css/style.css">
                <title>Relatório Carregamento</title>
            </head>
    `;

    win.document.write(html);
    win.document.write('<body onload="window.print()">');
    win.document.write(table);
    win.document.write('</body></html>');
    win.focus();
    
    win.document.write('<script type="text/javascript">window.onload(function() { window.print(); window.close(); });</script>');
}


