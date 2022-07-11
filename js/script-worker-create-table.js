onmessage = function (e) {
    const result = e.data;

    if (result[0].file) {
        if(result[0].file.register[0] === undefined) {
            let arr = [];
            arr.push(result[0].file.register);
            result[0].file.register = arr;
        }
    }

    switch (result[2]) {
        case '1':
            postMessage(createTableRowsOne(result));
            break;

        case '2':
            postMessage(createTableRowsTwo(result));
            break;

        case '3':
            postMessage(createTableRowsTree(result));
            break;
        case '4':
            postMessage(createTableRowsOnev2(result));
            break;
        case 'Relatório NFe':
            postMessage(createReportNFe(result));
            break;
        case 'Relatório Material':
            postMessage(createReportMaterial(result));
            break;
    }
}

const createReportNFe = (arr) => {
    var table = '';
    var row = '';
    var total = 0;
    var totalTon = 0;

    table = `
        <table class="table2">
                <tr class="trThhead">
                    <th><strong>DATA</strong></th>
                    <th><strong>NFe</strong></th>
                    <th><strong>VALOR</strong></th>
                    <th><strong>CLIENTES</strong></th>
                </tr>

            <tbody id="itens-table">`;

    for (const obj of arr[0].enviNFe.nfeProc) {
        row += `
            <tr>
                <td class="data">${obj.NFe.infNFe.ide.dhEmi.split('T')[0]}</td>
                <td class="nfe">${obj.NFe.infNFe.ide.nNF}</td>
                <td class="valor">${obj.NFe.infNFe.pag.detPag.vPag}</td>
                <td class="conta">${obj.NFe.infNFe.dest.xNome.split(' ')[0]}</td>
            </tr>
        `;

        total += parseFloat(obj.NFe.infNFe.pag.detPag.vPag);
        totalTon += parseFloat(obj.quantidade);
    }

    row += `
            <tr class="color-gray-light total total2">
                <td id="total"><strong>TOTAL</strong></td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
                <td></td>
            </tr>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
    
}

const createTableRowsOne = (arr) => {
    var table = '';
    var tables = '';
    var row = '';
    var total = 0;
    var totalTon = 0;
    var objDate = {};

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

                    <div class="head-date-nfe">
                        <strong>${key}</strong>
                        <strong>NFe</strong>
                    </div>

                    <tr class="color-gray">
                        <th><strong>MOTORISTA</strong></th>
                        <th><strong>PLACA</strong></th>
                        <th><strong>DESTINO</strong></th>
                        <th contenteditable="true"><strong>${arr[1]}</strong></th>
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
                        <td contenteditable="true"></td>
                        <td contenteditable="true"></td>
                        <td contenteditable="true">   </td>
                        <td contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
                        <td>${obj.descricao.replace("/", "")}</td>
                        <td>${obj.quantidade}</td>
                        <td>R$${obj.unitario}</td>
                        <td>R$${obj.valor}</td>
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
        `;

        total = 0;
        table += row;
        table += `</tbody></table>`
        tables += table;
    })

    return tables;
}

const createTableRowsOnev2 = (arr) => {
    var table = '';
    var tables = '';
    var row = '';
    var total = 0;
    var totalTon = 0;
    var objDate = {};

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
                        <th contenteditable="true"><strong>${arr[1]}</strong></th>
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
                        <td contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
                        <td>${obj.descricao.replace("/", "")}</td>
                        <td>${obj.quantidade}</td>
                        <td>R$${obj.unitario}</td>
                        <td>R$${obj.valor}</td>
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
                <td>${totalTon.toFixed(2)}</td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
            </tr>
        `;

        total = 0;
        table += row;
        table += `</tbody></table>`
        tables += table;
    })

    return tables;
}

const createTableRowsTwo = (arr) => {
    var table = '';
    var row = '';
    var total = 0;
    var totalTon = 0;

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>DATA</strong></th>
                    <th><strong>MOTORISTA</strong></th>
                    <th><strong>PLACA</strong></th>
                    <th><strong>DESTINO</strong></th>
                    <th contenteditable="true"><strong>${arr[1]}</strong></th>
                    <th><strong>MATERIAL</strong></th>
                    <th><strong>QUANTIDADE(TON)</strong></th>
                    <th><strong>VALOR DO MATERIAL</strong></th>
                    <th><strong>TOTAL</strong></th>
                </tr>
            </thead>

            <tbody id="itens-table">`;

    for (const obj of arr[0].file.register) {
        row = `
            <tr>
                <td>${obj.data}</td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true">-----</td>
                <td contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
                <td>${obj.descricao.replace("/", "")}</td>
                <td>${obj.quantidade}</td>
                <td>R$${obj.unitario}</td>
                <td>R$${obj.valor}</td>
            </tr>
        `;

        table += row;
        total += parseFloat(obj.valor);
        totalTon += parseFloat(obj.quantidade);
    }

    row = `
            <tr class="color-gray-light total total2">
                <td id="total"><strong>TOTAL</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${totalTon.toFixed(2)}</td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
            </tr>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
}

const createTableRowsTree = (arr) => {
    var table = '';
    var row = '';
    var total = 0;
    var totalTon = 0;


    if (arr[0].file.register[0] === undefined) {
        total = parseFloat(arr[0].file.register.valor);
        table = `
            <table class="table2">
                <thead class="table-head">
                    <tr class="color-gray">
                        <th><strong>DATA</strong></th>
                        <th><strong>MATERIAL</strong></th>
                        <th><strong>QUANTIDADE(TON)</strong></th>
                        <th><strong>VALOR DO MATERIAL</strong></th>
                        <th><strong>TOTAL</strong></th>
                    </tr>
                </thead>

                <tbody id="itens-table">
            
                    <tr>
                        <td>${arr[0].file.register.data}</td>
                        <td>${arr[0].file.register.descricao.replace("/", "")}</td>
                        <td>${arr[0].file.register.quantidade}</td>
                        <td>R$${arr[0].file.register.unitario}</td>
                        <td>R$${arr[0].file.register.valor}</td>
                    </tr>
                
                    <tr class="color-gray-light total">
                        <td id="total"><strong>TOTAL</strong></td>
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

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>DATA</strong></th>
                    <th><strong>PLACA</strong></th>
                    <th contenteditable="true"><strong>${arr[1]}</strong></th>
                    <th><strong>MATERIAL</strong></th>
                    <th><strong>QUANTIDADE(TON)</strong></th>
                    <th><strong>VALOR DO MATERIAL</strong></th>
                    <th><strong>TOTAL</strong></th>
                </tr>
            </thead>

            <tbody id="itens-table">`;

    for (const obj of arr[0].file.register) {
        row = `
            <tr>
                <td>${obj.data}</td>
                <td contenteditable="true"></td>
                <td contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
                <td>${obj.descricao.replace("/", "")}</td>
                <td>${obj.quantidade}</td>
                <td>R$${obj.unitario}</td>
                <td>R$${obj.valor}</td>
            </tr>
        `;

        table += row;
        total += parseFloat(obj.valor);
        totalTon += parseFloat(obj.quantidade);
    }

    row = `
            <tr class="color-gray-light total total2">
                <td id="total"><strong>TOTAL</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${totalTon.toFixed(2)}</td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
            </tr>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
}

const createReportMaterial = (arr) => {
    var table = '';
    var row = '';
    var totalPrice = 0;
    var totalTon = 0;
    var objMaterial = {};

    for (var i = 0; i < arr[0].file.register.length; ++i) {
        if (!objMaterial.hasOwnProperty(arr[0].file.register[i].descricao)) {
            objMaterial[arr[0].file.register[i].descricao] = {};
            objMaterial[arr[0].file.register[i].descricao].totalWeightQuantity = parseFloat(arr[0].file.register[i].quantidade);
            objMaterial[arr[0].file.register[i].descricao].totalPriceCharged = parseFloat(arr[0].file.register[i].Total);
        } else {
            objMaterial[arr[0].file.register[i].descricao].totalWeightQuantity += parseFloat(arr[0].file.register[i].quantidade);
            objMaterial[arr[0].file.register[i].descricao].totalPriceCharged += parseFloat(arr[0].file.register[i].Total);
        }
    }

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray">
                    <th><strong>MATERIAL</strong></th>
                    <th><strong>QUANTIDADE TOTAL(TON)</strong></th>
                    <th><strong>VALOR TOTAL DO MATERIAL</strong></th>
                </tr>
            </thead>

        <tbody id="itens-table">`

    Object.keys(objMaterial).forEach((key) => {
        row += `
            <tr>
                <td>${key.replace("/", "")}</td>
                <td>${objMaterial[key].totalWeightQuantity.toFixed(2)}</td>
                <td>R$${objMaterial[key].totalPriceCharged.toFixed(2)}</td>
            </tr>
        `;

        totalPrice += objMaterial[key].totalPriceCharged;
        totalTon += objMaterial[key].totalWeightQuantity;

    })

    row += `
            <tr class="color-gray-light total">
                <td id="total"><strong>TOTAL</strong></td>
                <td>${totalTon.toFixed(2)}</td>
                <td>R$${totalPrice.toFixed(2)}</td>
            </tr>
        `;

        totalPrice = 0;
        table += row;
        table += `</tbody></table>`

    return table;
}
