
async function fetchPrices() {
    try {
        const [btc, eth] = await Promise.all([
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl'),
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=brl')
        ]);
        const btcData = await btc.json();
        const ethData = await eth.json();
        document.getElementById('btc-price').textContent = 'R$ ' + btcData.bitcoin.brl.toLocaleString();
        document.getElementById('eth-price').textContent = 'R$ ' + ethData.ethereum.brl.toLocaleString();
    } catch (error) {
        console.error('Erro ao carregar cotações de cripto:', error);
    }
}

async function fetchUSD() {
    try {
        const usd = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const usdData = await usd.json();
        document.getElementById('usdbrl-price').textContent = 'R$ ' + parseFloat(usdData.USDBRL.bid).toFixed(2);
    } catch (error) {
        console.error('Erro ao carregar cotação do dólar:', error);
    }
}

async function fetchNews() {
    try {
        const response = await fetch('https://gnews.io/api/v4/top-headlines?lang=pt&token=PUT_YOUR_API_KEY_HERE');
        const data = await response.json();
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = "";
        data.articles.slice(0, 5).forEach(article => {
            const li = document.createElement('li');
            li.innerHTML = '<strong>' + article.title + '</strong><br><a href="' + article.url + '" target="_blank">Leia mais</a>';
            newsList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
    }
}

fetchPrices();
fetchUSD();
fetchNews();
