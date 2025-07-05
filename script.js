
document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("toggle-theme");
  themeButton.onclick = () => {
    document.body.classList.toggle("dark");
  };

  fetchCotacoes();
  carregarEntradas();
});

function fetchCotacoes() {
  const cotacoes = {
    BTC: "R$ 349.000",
    ETH: "R$ 18.000",
    "S&P500": "5.500 pts"
  };

  const div = document.getElementById("cotacoes");
  div.innerHTML = Object.entries(cotacoes)
    .map(([k, v]) => `<strong>${k}</strong>: ${v}`)
    .join("<br>");
}

function salvarEntrada() {
  const texto = document.getElementById("diario").value;
  const historico = JSON.parse(localStorage.getItem("diario")) || [];
  historico.push({ data: new Date().toLocaleString(), texto });
  localStorage.setItem("diario", JSON.stringify(historico));
  document.getElementById("diario").value = "";
  carregarEntradas();
}

function carregarEntradas() {
  const historico = JSON.parse(localStorage.getItem("diario")) || [];
  const div = document.getElementById("historico");
  div.innerHTML = historico
    .map((e) => `<p><em>${e.data}</em>: ${e.texto}</p>`)
    .reverse()
    .join("");
}
