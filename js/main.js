'use strict'

const limparFormulario = (endereco) => {
    window.document.getElementById('endereco').value = "";
    window.document.getElementById('bairro').value = "";
    window.document.getElementById('cidade').value = "";
    window.document.getElementById('estado').value = "";
}

const preencherFormulario = (endereco) => {
    limparFormulario();
    window.document.getElementById('endereco').value = endereco.logradouro;
    window.document.getElementById('bairro').value = endereco.bairro;
    window.document.getElementById('cidade').value = endereco.localidade;
    window.document.getElementById('estado').value = endereco.uf;
}

const cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep)

const pesquisaCep = async () => {
    limparFormulario();
    const cep = window.document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }

}

window.document.getElementById('cep')
    .addEventListener('focusout', pesquisaCep)