let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function adicionarCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  salvarCarrinho();
  atualizarCarrinho();
}

function removerDoCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  salvarCarrinho();
  atualizarCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const total = document.getElementById('total-carrinho');

  if (!lista || !total) return; // evita erros se não estiver na página de delivery

  lista.innerHTML = '';

  if (carrinho.length === 0) {
    lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
    total.textContent = 'Total: R$0,00';
    return;
  }

  let soma = 0;
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} x${item.quantidade} - R$${(item.preco * item.quantidade).toFixed(2)}`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'X';
    btnRemover.title = 'Remover do carrinho';
    btnRemover.onclick = () => removerDoCarrinho(item.nome);

    li.appendChild(btnRemover);
    lista.appendChild(li);

    soma += item.preco * item.quantidade;
  });

  total.textContent = `Total: R$${soma.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarCarrinho();
});

function enviarPedido() {
  const nome = document.getElementById('nome').value.trim();
  const endereco = document.getElementById('endereco').value.trim();

  if (!nome || !endereco || carrinho.length === 0) {
    alert("Por favor, preencha nome e endereço, e adicione itens ao carrinho.");
    return;
  }

  let mensagem = `Olá! Gostaria de fazer um pedido:\n\n`;
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} x${item.quantidade} - R$${(item.preco * item.quantidade).toFixed(2)}\n`;
  });

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  mensagem += `\nTotal: R$${total.toFixed(2)}\n\n`;
  mensagem += `Nome: ${nome}\nEndereço: ${endereco}`;

  const whatsappURL = `https://wa.me/5596999999999?text=${encodeURIComponent(mensagem)}`;
  window.open(whatsappURL, '_blank');
}
