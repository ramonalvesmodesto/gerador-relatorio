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
                <td contenteditable="true"></td>
                <td><p class="material">${obj.descricao.replace("/", "")}</p></td>
                <td>${obj.quantidade}</td>
                <td>R$${obj.unitario}</td>
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
