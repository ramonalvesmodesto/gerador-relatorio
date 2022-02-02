onmessage = function(e) {
    const result = e.data;
    postMessage(createTableRows(result));
}

function createTableRows(json) {
    var item = '';
    var row = '';
    var total = 0;

    for (const obj of json.file.register) {
        row = `
            <tr>
                <td class="data">${obj.data}</td>
                <td class="oc" contenteditable="true"></td>
                <td class="material">${obj.descricao.replace("/", "")}</td>
                <td class="quantidade">${obj.quantidade}</td>
                <td class="valor-unitario">R$${obj.unitario}</td>
                <td class="valor">R$${obj.valor}</td>
            </tr>
        `;

        item += row;
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

        item += row;

    return item;
}
