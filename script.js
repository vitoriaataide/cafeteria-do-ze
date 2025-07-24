let carrinho = [];

function adicionarCarrinho(produto, preco) {
  carrinho.push({ produto, preco });
  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");
  if (!lista || !totalEl) return;

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.produto} - R$ ${item.preco.toFixed(2).replace('.', ',')}
      <button onclick="removerItem(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2).replace('.', ',');
}

function enviarPedido() {
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  if (!nome || !endereco) {
    alert("Por favor, preencha seu nome e endereço.");
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let mensagem = `Olá! Meu nome é ${nome} e gostaria de fazer um pedido:\n\n`;

  carrinho.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.produto} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
  });

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n`;
  mensagem += `\nEndereço para entrega: ${endereco}`;

  const numeroWhatsApp = "5596991848838"; // Substitua com seu número com DDD
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
