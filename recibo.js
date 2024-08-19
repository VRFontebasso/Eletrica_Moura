
        document.addEventListener("DOMContentLoaded", function() {
            let itemCount = 1;

            document.getElementById('add-product-btn').addEventListener('click', function() {
                const itemsContainer = document.getElementById('items-container');
                const reciboItems = document.getElementById('recibo-items');

                const itemHTML = `
                    <label for="valor">ITEM: &emsp;
                    <input type="text" id="texto_descricao${itemCount}" style="width: 78%;"></label>
                    <label for="valor">ID: &emsp;&emsp;
                    <input type="text" id="id_descricao${itemCount}" style="width: 79%;"></label>
                    <label for="valor">DESCRIÇÃO: &emsp;
                    <input type="text" id="descricao_descricao${itemCount}" style="width: 71%;"></label>
                    <label for="valor">VALOR A SER COBRADO: &emsp;
                    <input type="text" id="valor${itemCount}" style="width: 30%;"></label>
                    <br/><hr><br/>
                `;

                itemsContainer.insertAdjacentHTML('beforeend', itemHTML);

                const reciboItemHTML = `
                    <tr>
                        <td><span id="texto_descricao_produto${itemCount}"></span></td>
                        <td><span id="id_descricao_id${itemCount}"></span></td>
                        <td><span id="descricao_testo${itemCount}"></span></td>
                        <td><span id="recibo_valor${itemCount}"></span></td>
                    </tr>
                `;

                reciboItems.insertAdjacentHTML('beforeend', reciboItemHTML);

                itemCount++;
            });

            document.getElementById('generate-pdf-btn').addEventListener('click', function() {
                document.getElementById('data_recibo').textContent = document.getElementById('data').value;
                document.getElementById('recibo_empresa').textContent = document.getElementById('empresa').value;
                document.getElementById('recibo_numero').textContent = document.getElementById('numero').value;
                document.getElementById('recibo_cnpj').textContent = document.getElementById('cnpj').value;
                document.getElementById('ins_mun').textContent = document.getElementById('ins1').value;
                document.getElementById('ins_est').textContent = document.getElementById('estad1').value;
                document.getElementById('ctt_contato').textContent = document.getElementById('ctt').value;
                document.getElementById('tel_telefone').textContent = document.getElementById('tel').value;
                document.getElementById('mail_email').textContent = document.getElementById('mail').value;
                document.getElementById('endere_endere').textContent = document.getElementById('endere').value;
                document.getElementById('cidad_cidade').textContent = document.getElementById('cidad').value;
                document.getElementById('esta_estado').textContent = document.getElementById('estada_reg').value;

                let total = 0;
                for (let i = 0; i < itemCount; i++) {
                    document.getElementById(`texto_descricao_produto${i}`).textContent = document.getElementById(`texto_descricao${i}`).value;
                    document.getElementById(`id_descricao_id${i}`).textContent = document.getElementById(`id_descricao${i}`).value;
                    document.getElementById(`descricao_testo${i}`).textContent = document.getElementById(`descricao_descricao${i}`).value;

                    const valor = parseFloat(document.getElementById(`valor${i}`).value);
                    document.getElementById(`recibo_valor${i}`).textContent = valor.toFixed(2);
                    total += isNaN(valor) ? 0 : valor;
                }
                document.getElementById('recibo_valor').textContent = total.toFixed(2);

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                doc.text("Recibo de Pagamento", 105, 20, null, null, "center");

                doc.text(`Ismael Coelho de Moura - ME`, 20, 30);
                doc.text(`CNPJ: 07.461.005/0001-60`, 20, 35);
                doc.text(`Guarulhos, ${document.getElementById('data').value}`, 20, 45);

                doc.text(`Empresa: ${document.getElementById('empresa').value}`, 20, 55);
                doc.text(`ID de serviço: ${document.getElementById('numero').value}`, 20, 60);

                doc.autoTable({
                    startY: 65,
                    head: [['CNPJ', 'Ins. Mun', 'Ins. Est']],
                    body: [
                        [
                            document.getElementById('cnpj').value,
                            document.getElementById('ins1').value,
                            document.getElementById('estad1').value
                        ]
                    ]
                });

                doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 10,
                    head: [['Contato', 'Tel.', 'E-mail']],
                    body: [
                        [
                            document.getElementById('ctt').value,
                            document.getElementById('tel').value,
                            document.getElementById('mail').value
                        ]
                    ]
                });

                doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 10,
                    head: [['Endereço', 'Cidade', 'Estado']],
                    body: [
                        [
                            document.getElementById('endere').value,
                            document.getElementById('cidad').value,
                            document.getElementById('estada_reg').value
                        ]
                    ]
                });

                const items = [];
                for (let i = 0; i < itemCount; i++) {
                    items.push([
                        document.getElementById(`texto_descricao${i}`).value,
                        document.getElementById(`id_descricao${i}`).value,
                        document.getElementById(`descricao_descricao${i}`).value,
                        parseFloat(document.getElementById(`valor${i}`).value).toFixed(2)
                    ]);
                }


            });
        });
    