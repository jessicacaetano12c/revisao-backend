const productForm = document.getElementById('productForm');
const messageDiv = document.getElementById('message');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(productForm);
    const data = {
        nome: formData.get('nome'),
        preco: parseFloat(formData.get('preco')),
        categoria: formData.get('categoria'),
        descricao: formData.get('descricao')
    };

    try {
        const response = await fetch('http://localhost:3333/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, 'success');
            productForm.reset();
        } else {
            showMessage(result.message || 'Erro ao cadastrar produto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Não foi possível conectar ao servidor', 'error');
    }
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
