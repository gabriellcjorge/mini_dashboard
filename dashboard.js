// CODIGO VALOR DO BITCOIN
async function fetchBtcPrice() {
  const elPrice = document.getElementById("btc-price");
  const elUpdated = document.getElementById("btc-updated");
  try {
    const resp = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const json = await resp.json();
    const price = json?.bitcoin?.usd;
    if (price != null) {
      elPrice.textContent = price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      elUpdated.textContent = "Atualizado: " + new Date().toLocaleTimeString();
    } else {
      elPrice.textContent = "—";
      elUpdated.textContent = "Dados indisponíveis";
    }
  } catch (err) {
    elPrice.textContent = "Erro ao obter preço";
    elUpdated.textContent = err.message;
  }
}

// chamada inicial + atualização a cada 30s
fetchBtcPrice();
setInterval(fetchBtcPrice, 30000);

// CODIGO GRAFICO
const ctx = document.getElementById("bitcoinChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    datasets: [
      {
        label: "Bitcoin",
        data: [72.0, 74.0, 77.0, 79.0, 82.0],
        borderWidth: 2,
        tension: 0.3,
        borderColor: "#00FF88",
        backgroundColor: "#00FF88",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});
