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
                <td><p class="data">${obj.data}</p></td>
                <td><p class="oc" contenteditable="true"></p></td>
                <td><p class="material">${obj.descricao.replace("/", "")}</p></td>
                <td><p class="quantidade">${obj.quantidade}<p/></td>
                <td><p class="valor-unitario">R$${obj.unitario}</p></td>
                <td><p class="valor">R$${obj.valor}</p></td>
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
