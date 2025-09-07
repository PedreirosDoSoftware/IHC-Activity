// script.js

// Espera o documento HTML ser completamente carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', function () {

    // Seleciona o formulário pelo seu ID 'interest-form'.
    const form = document.getElementById('interest-form');

    // Adiciona um "ouvinte" para o evento de 'submit' (envio) do formulário.
    form.addEventListener('submit', function (event) {
        
        // 1. Previne o comportamento padrão do navegador, que é recarregar a página.
        event.preventDefault();

        // 2. Coleta os valores dos campos do formulário.
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comments = document.getElementById('comments').value;

        // Para os checkboxes, selecionamos todos os que estão marcados (:checked).
        const checkedInterests = document.querySelectorAll('input[name="interest"]:checked');
        
        // Criamos um array (lista) apenas com o texto de cada interesse marcado.
        const interests = Array.from(checkedInterests).map(checkbox => checkbox.nextElementSibling.textContent);

        // 3. Exibe uma mensagem de confirmação para o usuário.
        // O \n cria uma quebra de linha no alerta.
        alert(`Obrigado por se inscrever, ${name}!\n\nRecebemos seu interesse em: ${interests.join(', ')}.\nEnviaremos as novidades para o e-mail: ${email}.`);
        
        // Também é uma boa prática mostrar os dados no console para depuração.
        console.log({
            nome: name,
            email: email,
            interesses: interests,
            comentarios: comments
        });

        // 4. Limpa todos os campos do formulário para um novo preenchimento.
        form.reset();
    });

});