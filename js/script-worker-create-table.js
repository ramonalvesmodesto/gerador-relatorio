onmessage = function (e) {
    const result = e.data;

    if (result[0].file) {
        if (result[0].file.register[0] === undefined) {
            let arr = [];
            arr.push(result[0].file.register);
            result[0].file.register = arr;
        }
    }

    switch (result[2]) {
        case 'Relatório Por Data V1':
            postMessage(createReportForDataV1(result));
            break;

        case 'Relatório Por Data V2':
            postMessage(createReportForDataV2(result));
            break;

        case 'Relatório Unificado V1':
            postMessage(createReportOnlyV1(result));
            break;

        case 'Relatório Unificado V2':
            postMessage(createReportOnlyV2(result));
            break;

        case 'Relatório Unificado V3':
            postMessage(createReportOnlyV3(result));
            break;

        case 'Relatório Fiscal Por Cliente':
            postMessage(createReportNFeForClient(result));
            break;

        case 'Relatório NFe':
            postMessage(createReportNFe(result));
            break;

        case 'Relatório NFe Anual':
            postMessage(createReportNFeYearly(result));
            break;

        case 'Relatório Material':
            postMessage(createReportMaterial(result));
            break;
    }
}

const createReportForDataV1 = (arr) => {
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
                        <strong>DATA: ${key}</strong>
                        <strong contenteditable="true">NFe:</strong>
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
            <tfoot class="color-gray2">
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
            </tfoot>
        `;

        total = 0;
        table += row;
        table += `</tbody></table>`
        tables += table;
    })

    return tables;
}

const createReportForDataV2 = (arr) => {
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
            <tfoot class="color-gray2">
                <tr class="color-gray-light total">
                    <td id="total"><strong>TOTAL</strong></td>
                    <td></td>
                    <td>${totalTon.toFixed(2)}</td>
                    <td></td>
                    <td>R$${total.toFixed(2)}</td>
                </tr>
            </tfoot>
        `;

        total = 0;
        table += row;
        table += `</tbody></table>`
        tables += table;
    })

    return tables;
}

const createReportOnlyV1 = (arr) => {
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
            <tfoot class="color-gray2">
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
            </tfoot>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
}

const createReportOnlyV2 = (arr) => {
    var table = '';
    var row = '';
    var total = 0;
    var totalTon = 0;

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>DATA</strong></th>
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
            <tfoot class="color-gray2">
                <tr class="color-gray-light total total2">
                    <td id="total"><strong>TOTAL</strong></td>
                    <td></td>
                    <td>${totalTon.toFixed(2)}</td>
                    <td></td>
                    <td>R$${total.toFixed(2)}</td>   
                </tr>
            </tfoot>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
}

const createReportOnlyV3 = (arr) => {
    var table = '';
    var row = '';
    var total = 0;
    var totalTon = 0;

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>DATA</strong></th>
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
            <tfoot class="color-gray2">
                <tr class="color-gray-light total total2">
                    <td id="total"><strong>TOTAL</strong></td>
                    <td></td>
                    <td></td>
                    <td>${totalTon.toFixed(2)}</td>
                    <td></td>
                    <td>R$${total.toFixed(2)}</td>
                </tr>
            </tfoot>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
}

const createReportNFe = (arr) => {
    var table = '';
    var row = '';
    var total = 0;
    var totalTon = 0;

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>DATA</strong></th>
                    <th><strong>NFe</strong></th>
                    <th><strong>QUANTIDADE (TON)</strong></th>
                    <th><strong>VALOR</strong></th>
                    <th><strong>CLIENTES</strong></th>
                </tr>
            </thead>

            <tbody id="itens-table">`;

    for (const obj of arr[0].enviNFe.nfeProc) {
        let amount = 0.0;

        if (obj.NFe.infNFe.det.hasOwnProperty("prod")) {
            amount = Number(obj.NFe.infNFe.det.prod.qCom);
        } else {
            obj.NFe.infNFe.det.forEach(a => {
                amount += Number(a.prod.qCom);
            })
        }

        row += `
            <tr>
                <td class="data">${obj.NFe.infNFe.ide.dhEmi.split('T')[0]}</td>
                <td class="nfe">${obj.NFe.infNFe.ide.nNF}</td>
                <td class="nfe">${amount.toFixed(2)}</td>
                <td class="valor">${obj.NFe.infNFe.pag.detPag.vPag}</td>
                <td class="conta">${obj.NFe.infNFe.dest.xNome}</td>
            </tr>
        `;

        total += Number(obj.NFe.infNFe.total.ICMSTot.vNF);
        totalTon += amount;
    }

    row += `
            <tfoot class="color-gray2">
                <tr class="color-gray-light total total2">
                    <td id="total"><strong>TOTAL</strong></td>
                    <td></td>
                    <td>${totalTon.toFixed(2)}</td>
                    <td>R$${total.toFixed(2)}</td>
                    <td></td>
                </tr>
            </tfoot>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;

}

const createReportNFeYearly = (arr) => {
    const months = {
        '01': "Janeiro",
        '02': "Fevereiro",
        '03': "Março",
        '04': "Abril",
        '05': "Maio",
        '06': "Junho",
        '07': "Julho",
        '08': "Agosto",
        '09': "Setembro",
        '10': "Outubro",
        '11': "Novembro",
        '12': "Dezembro"
    }
    const objMonth = {};
    const objMonthsInfo = {};

    for (const obj of arr[0].enviNFe.nfeProc) {
        const dateHour = obj.NFe.infNFe.ide.dhEmi.split('T');
        const month = dateHour[0].split('-')[1];

        if (objMonth.hasOwnProperty(month)) {
            objMonth[month].push(obj);
        } else {
            objMonth[month] = [];
            objMonth[month].push(obj)
        }
    }

    Object.keys(objMonth).forEach(key => {
        const objData = {
            amount: 0.0,
            valueMoney: 0.0
        }

        objMonth[key].forEach(obj => {
            let amount = 0.0;

            if (obj.NFe.infNFe.det.hasOwnProperty("prod")) {
                amount = Number(obj.NFe.infNFe.det.prod.qCom);
            } else {
                obj.NFe.infNFe.det.forEach(a => {
                    amount += Number(a.prod.qCom);
                })
            }

            objData.amount += amount;
            objData.valueMoney += Number(obj.NFe.infNFe.total.ICMSTot.vNF);
        })

        if (!objMonthsInfo.hasOwnProperty(key)) {
            objMonthsInfo[key] = [];
        }

        objMonthsInfo[key] = objData;
    });

    var table = '';
    var row = '';
    var totalAmount = 0;
    var totalValueMoney = 0;

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>MÊS</strong></th>
                    <th><strong>QUANTIDADE (TON)</strong></th>
                    <th><strong>VALOR</strong></th>
                </tr>
            </thead>

            <tbody id="itens-table">`;

    for (let i = 1; i <= 12; i++) {
        let num = "";

        if (i < 10) {
            num = "0" + i.toString();
        } else {
            num = i.toString();
        }

        row += `
            <tr>
                <td class="mes">${months[num]}</td>
                <td class="quantidade">${objMonthsInfo[num].amount.toFixed(2)}</td>
                <td class="valor">R$${objMonthsInfo[num].valueMoney.toFixed(2)}</td>
            </tr>
        `;

        totalAmount += objMonthsInfo[num].amount;
        totalValueMoney += objMonthsInfo[num].valueMoney

    }

    row += `
            <tfoot class="color-gray2">
                <tr class="color-gray-light total total2">
                    <td><strong>TOTAL</strong></td>
                    <td>${totalAmount.toFixed(2)}</td>
                    <td>R$${totalValueMoney.toFixed(2)}</td>
                </tr>
            </tfoot>
        `;
    table += row;
    table += `</tbody></table>`;

    return table;
}

const createReportNFeForClient = (arr) => {
    const objClients = {};
    var total = 0;
    var totalTon = 0;

    for (const obj of arr[0].enviNFe.nfeProc) {
        if (!objClients.hasOwnProperty(obj.NFe.infNFe.dest.xNome)) {
            objClients[obj.NFe.infNFe.dest.xNome] = {
                CNPJ: "",
                Amount: 0.0,
                ValueMoney: 0.0
            }
        }

        let amount = 0.0;

        if (obj.NFe.infNFe.det.hasOwnProperty("prod")) {
            amount = Number(obj.NFe.infNFe.det.prod.qCom);
        } else {
            obj.NFe.infNFe.det.forEach(a => {
                amount += Number(a.prod.qCom);
            })
        }

        if(obj.NFe.infNFe.dest.CNPJ === undefined) {
            console.log(obj);
        }

        objClients[obj.NFe.infNFe.dest.xNome].Amount += amount;
        objClients[obj.NFe.infNFe.dest.xNome].CNPJ = obj.NFe.infNFe.dest.CNPJ ? 'CNPJ: ' + obj.NFe.infNFe.dest.CNPJ : 'CPF: ' + obj.NFe.infNFe.dest.CPF;
        objClients[obj.NFe.infNFe.dest.xNome].ValueMoney += Number(obj.NFe.infNFe.total.ICMSTot.vNF);
        total += Number(obj.NFe.infNFe.total.ICMSTot.vNF);
        totalTon += amount;
    }

    var table = '';
    var row = '';

    table = `
        <table class="table2">
            <thead class="table-head">
                <tr class="color-gray2">
                    <th><strong>CLIENTE</strong></th>
                    <th><strong>CNPJ | CPF</strong></th>
                    <th><strong>QUANTIDADE</strong></th>
                    <th><strong>VALOR</strong></th>
                </tr>
            </thead>

            <tbody id="itens-table">`;

    Object.keys(objClients).forEach(key => {
        row += `
            <tr>
                <td class="cliente">${key}</td>
                <td class="cnpj">${objClients[key].CNPJ}</td>
                <td class="quantidade">${objClients[key].Amount.toFixed(2)}</td>
                <td class="valor">R$${objClients[key].ValueMoney.toFixed(2)}</td>
            </tr>
        `;
    })

    row += `
            <tfoot class="color-gray2">
                <tr class="color-gray-light total total2">
                    <td><strong>TOTAL</strong></td>
                    <td></td>
                    <td>${totalTon.toFixed(2)}</td>
                    <td>R$${total.toFixed(2)}</td>
                </tr>
            </tfoot>
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
            <tfoot class="color-gray2">
                <tr class="color-gray-light total">
                    <td id="total"><strong>TOTAL</strong></td>
                    <td>${totalTon.toFixed(2)}</td>
                    <td>R$${totalPrice.toFixed(2)}</td>
                </tr>
            </tfoot>
        `;

    totalPrice = 0;
    table += row;
    table += `</tbody></table>`

    return table;
}
