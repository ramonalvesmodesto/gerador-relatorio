onmessage = function(e) {
    const result = e.data;

    postMessage(createTableRows(result));
}

function createTableRows(arr) {
    var item = '';
    var row = '';
    var total = 0;
    var totalTon = 0;
    
    if(arr[0].file.register[0] === undefined) {
        total = parseFloat(arr[0].file.register.valor);
        row = `
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
                <td>${arr[0].file.register.quantidade}}</td>
                <td></td>
                <td>R$${total.toFixed(2)}</td>
            </tr>
        `;

        return row;
    }

    for (const obj of arr[0].file.register) {
        row = `
            <tr>
                <td class="data">${obj.data}</td>
                <td class="motorista" contenteditable="true"></td>
                <td class="placa" contenteditable="true"></td>
                <td class="destino" contenteditable="true">-----</td>
                <td class="num-doc" contenteditable="true">${(arr[1] == "OC" ? '' : obj.documento)}</td>
                <td class="material">${obj.descricao.replace("/", "")}</td>
                <td class="quantidade">${obj.quantidade}</td>
                <td class="valor-unitario">R$${obj.unitario}</td>
                <td class="valor">R$${obj.valor}</td>
            </tr>
        `;

        item += row;
        total += parseFloat(obj.valor);
        totalTon += parseFloat(obj.quantidade);
    }

    row = `
            <tr>
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

        item += row;

    return item;
}
