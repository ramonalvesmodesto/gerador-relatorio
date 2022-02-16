onmessage = function(e) {
    const result = e.data;

    postMessage(createTableRows(result));
}

function createTableRows(arr) {
    var item = '';
    var row = '';
    var total = 0;

    for (const obj of arr[0].file.register) {
        row = `
            <tr>
                <td class="data">${obj.data}</td>
                <td class="motorista" contenteditable="true"></td>
                <td class="placa" contenteditable="true"></td>
                <td class="destino" contenteditable="true"></td>
                <td class="num-doc" contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
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
