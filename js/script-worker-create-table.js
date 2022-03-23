onmessage = function (e) {
    const result = e.data;

    postMessage(createTableRows(result));
}

const createTableRows = (arr) => {
    var table = '';
    var tables = '';
    var row = '';
    var total = 0;
    var totalTon = 0;
    var objDate = {};


    if (arr[0].file.register[0] === undefined) {
        total = parseFloat(arr[0].file.register.valor);
        table = `
            <table class="table2">
                <thead class="table-head">

                    <strong class="date">${key}</strong>

                    <tr class="color-gray">
                        <th><strong>MOTORISTA</strong></th>
                        <th><strong>PLACA</strong></th>
                        <th><strong>DESTINO</strong></th>
                        <th><strong>${arr[1]}</strong></th>
                        <th><strong>MATERIAL</strong></th>
                        <th><strong>QUANTIDADE(TON)</strong></th>
                        <th><strong>VALOR DO MATERIAL</strong></th>
                        <th><strong>TOTAL</strong></th>
                    </tr>
                </thead>

                <tbody id="itens-table">
            
                    <tr>
                        <td class="data">${arr[0].file.register.data}</td>
                        <td class="motorista" contenteditable="true"></td>
                        <td class="placa" contenteditable="true"></td>
                        <td class="destino" contenteditable="true">-----</td>
                        <td class="num-doc" contenteditable="true">${(arr[1] == "OC" ? '' : arr[0].file.register.documento)}</td>
                        <td class="material">${arr[0].file.register.descricao.replace("/", "")}</td>
                        <td class="quantidade">${arr[0].file.register.quantidade}</td>
                        <td class="valor-unitario">R$${arr[0].file.register.unitario}</td>
                        <td class="valor">R$${arr[0].file.register.valor}</td>
                    </tr>
                
                    <tr>
                        <td id="total"><strong>TOTAL</strong></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>${arr[0].file.register.quantidade}</td>
                        <td></td>
                        <td>R$${total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;

        return table;
    }

    for (var i = 0; i < arr[0].file.register.length; ++i) {
        if (!objDate.hasOwnProperty(arr[0].file.register[i].data)) {
            objDate[arr[0].file.register[i].data] = [];
            objDate[arr[0].file.register[i].data].push(arr[0].file.register[i]);
        } else {
            objDate[arr[0].file.register[i].data].push(arr[0].file.register[i]);
        }
    }

    Object.keys(objDate).forEach((key) => {

        table = `
            <table class="table2">
                <thead class="table-head">

                    <strong class="date">${key}</strong>

                    <tr class="color-gray">
                        <th><strong>MOTORISTA</strong></th>
                        <th><strong>PLACA</strong></th>
                        <th><strong>DESTINO</strong></th>
                        <th><strong>${arr[1]}</strong></th>
                        <th><strong>MATERIAL</strong></th>
                        <th><strong>QUANTIDADE(TON)</strong></th>
                        <th><strong>VALOR DO MATERIAL</strong></th>
                        <th><strong>TOTAL</strong></th>
                    </tr>
                </thead>

                <tbody id="itens-table">
        `

        for (const obj of objDate[key]) {
            row = `
                    <tr>
                        <td class="motorista" contenteditable="true"></td>
                        <td class="placa" contenteditable="true"></td>
                        <td class="destino" contenteditable="true">   </td>
                        <td class="num-doc" contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
                        <td class="material">${obj.descricao.replace("/", "")}</td>
                        <td class="quantidade">${obj.quantidade}</td>
                        <td class="valor-unitario">R$${obj.unitario}</td>
                        <td class="valor">R$${obj.valor}</td>
                    </tr>
                `;

            table += row;
            total += parseFloat(obj.valor);
            totalTon += parseFloat(obj.quantidade);
        }

        row = `
            <tr class="color-gray-light total">
                <td id="total"><strong>TOTAL</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${totalTon.toFixed(2)}</td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
            </tr>

            <tr class="nfe">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="color-gray"><strong>NFe</strong></td>
                <td class="color-gray" contenteditable="true"></td>
            </tr>
        `;

        table += row;
        table += `</tbody></table>`
        tables += table;
    })

    return tables;
}
