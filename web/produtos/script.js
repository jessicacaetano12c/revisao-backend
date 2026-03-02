const productsGrid = document.getElementById('productsGrid');

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3333/produtos');
        const products = await response.json();

        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-exclamation-triangle"></i>
                Não foi possível carregar os produtos. Certifique-se de que o servidor está rodando.
            </div>
        `;
    }
}

function renderProducts(products) {
    if (!products || products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                Nenhum produto cadastrado no banco de dados.
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <span class="product-category">${product.categoria}</span>
            <h3 class="product-name">${product.nome}</h3>
            <p class="product-description">${product.descricao}</p>
            <div class="product-price">R$ ${Number(product.preco).toFixed(2).replace('.', ',')}</div>
            <div class="product-actions">
                <button class="btn-edit" title="Editar Produto">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" title="Excluir Produto" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Apagar
                </button>
            </div>
        </div>
    `).join('');
}

// Initial fetch
fetchProducts();

async function deleteProduct(id) {
    if (confirm('Tem certeza que deseja apagar este produto?')) {
        try {
            const response = await fetch(`http://localhost:3333/produtos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Produto apagado!');
                fetchProducts();
            } else {
                alert('Não foi possível apagar o produto.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Erro ao apagar o produto.');
        }
    }
}
