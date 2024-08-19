const btnGenerate = document.querySelector("#generate-pdf");

btnGenerate.addEventListener("click", () =>{

    const content = document.querySelector("#conteudoTotal")

// p imprimir  ID

    const options = {
        margin: [0, 1, 1, 1], 
        filename: "Ficha.pdf",
        html2canvas: {ecale: 2},
        jsDPF: {unit: "mm", format: [1130, 793], orientation: "portrait"}
    }

    //gerar e baixar pdf

    html2pdf().set(options).from(content).save();

})

