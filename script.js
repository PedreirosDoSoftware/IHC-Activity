document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('interest-form');
    const statusMessage = document.getElementById('status-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const comments = document.getElementById('comments').value.trim();

        const checkedInterests = document.querySelectorAll('input[name="interest"]:checked');
        const interests = Array.from(checkedInterests).map(cb => cb.nextElementSibling.textContent);

        // Validação simples
        if (!name || !email) {
            statusMessage.textContent = "⚠️ Por favor, preencha todos os campos obrigatórios.";
            statusMessage.className = "error";
            statusMessage.style.display = "block";
            return;
        }

        // Mensagem de sucesso
        statusMessage.textContent = `✅ Obrigado por se inscrever, ${name}! Recebemos seu interesse em: ${interests.join(', ') || "Nenhum selecionado"}.`;
        statusMessage.className = "success";
        statusMessage.style.display = "block";

        console.log({
            nome: name,
            email: email,
            interesses: interests,
            comentarios: comments
        });

        // Limpa formulário após 2s
        setTimeout(() => {
            form.reset();
            statusMessage.style.display = "none";
        }, 4000);
    });
});
