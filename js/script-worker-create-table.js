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
                <td class="data"><p>${obj.data}</p></td>
                <td class="oc"><p contenteditable="true"></p></td>
                <td class="material"><p>${obj.descricao.replace("/", "")}</p></td>
                <td class="quantidade"><p>${obj.quantidade}<p/></td>
                <td class="valor-unitario"><p>R$${obj.unitario}</p></td>
                <td class="valor"><p>R$${obj.valor}</p></td>
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
