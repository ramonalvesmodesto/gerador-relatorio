var input = document.getElementById("xml-upload");
var xmlString = "";
var json;

input.addEventListener("change", readXMLAsString);

function readXMLAsString(e) {
    var files = input.files;
    var reader = new FileReader();

    reader.readAsText(files[0]);
    reader.onload = (e) => {
        xmlString = e.target.result;
    }
}

var buttonFile = document.getElementById("buttonFile");
buttonFile.addEventListener("click", convertXMLToJSON);

function convertXMLToJSON() {
    var x2js = new X2JS();
    json = x2js.xml_str2json(xmlString);

    console.log(json.file.register);
    createTableEditable(json);
}

function createTableEditable(json) {

    var content = `
        <div class="content">
            <div class="logo">
                <img id="jmx" src="https://ramonalvesmodesto.github.io/gerador-relatorio-jmx/img/logomarca.png">
                <h5 class="title" contenteditable="true">CARREGAMENTO</h5>
            </div>
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th><strong>DATA</strong></th>
                        <th><strong>OC</strong></th>
                        <th><strong>MATERIAL</strong></th>
                        <th><strong>QUANTIDADE</strong></th>
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

    var total = 0;
    var report = document.getElementById("report");
    report.innerHTML = content;
    var item = document.getElementById("itens-table");
    var row = '';

    for (const obj of json.file.register) {
        row = `
            <tr>
                <td>${obj.data}</td>
                <td contenteditable="true">0000000</td>
                <td>${obj.descricao.replace("/", "")}</td>
                <td>${obj.quantidade}</td>
                <td>R$${obj.unitario}</td>
                <td>R$${obj.valor}</td>
            </tr>
        `;

        item.innerHTML += row;
        total += parseFloat(obj.valor);
    }

    row = `
            <tr>
                <td id="total"><strong>TOTAL</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
            </tr>
        `;

        item.innerHTML += row;
}

function generatePDF() {
    var table = document.getElementById("report").innerHTML;
    var win = window.open('', '', '', 'width=700');
    var bootstrap = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">`;
    var style = `<link rel="stylesheet" href="./css/style.css">`;

    win.document.write('<html><head><title>Relatório</title>');
    win.document.write(bootstrap);
    win.document.write(style);
    win.document.write('</head>');
    win.document.write('<body onload="window.print()">');
    win.document.write(table);
    win.document.write('</body></html>');
    win.focus();
    
    win.document.write('<script type="text/javascript">window.onload(function() { window.print(); window.close(); });</script>');
}


