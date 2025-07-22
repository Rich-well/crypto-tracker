const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,cardano&vs_currencies=usd";

async function fetchPrices() {
  const priceList = document.getElementById("priceList");
  priceList.innerHTML = "Loading...";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    priceList.innerHTML = ""; // clear list

    Object.entries(data).forEach(([coin, value]) => {
      const div = document.createElement("div");
      div.className = "crypto";
      div.innerHTML = `
        <strong>${coin.toUpperCase()}</strong>
        <span>$${value.usd.toLocaleString()}</span>
      `;
      priceList.appendChild(div);
    });
  } catch (error) {
    priceList.innerHTML = "⚠️ Failed to load data.";
    console.error(error);
  }
}

// Load data on page load
document.addEventListener("DOMContentLoaded", fetchPrices);
