async function carregarDestinos() {
    const response = await fetch('/destinos');
    const destinos = await response.json();
    const listaDestinos = document.getElementById('lista-destino');
    listaDestinos.innerHTML = '';
    destinos.forEach(destino => {
        const destinoDiv = document.createElement('div');
        destinoDiv.className = 'destino';
        destinoDiv.innerHTML = `
            <h3>${destino.nome}</h3>
            <img src="imagens/${destino.imagem}" alt="${destino.nome}">
            <p>${destino.descricao}</p>
            <button onclick="verDetalhes(${destino.id})">Ver Detalhes</button>
        `;
        listaDestinos.appendChild(destinoDiv);
    });
}

async function verDetalhes(idDestino) {
    const response = await fetch(`/destinos/${idDestino}/atrativos`);
    const atrativos = await response.json();
    const responseDestino = await fetch(`/destinos/${idDestino}`);
    const destino = await responseDestino.json();
    const detalhesDiv = document.getElementById('detalhes-destino');

    detalhesDiv.innerHTML = `
        <h3>${destino.nome}</h3>
        <img src="imagens/${destino.imagem}" alt="${destino.nome}">
        <p>${destino.descricao}</p>
        <h4>Atrativos:</h4>
        <ul>
            ${atrativos.map(a => `
                <li>
                    <h5>${a.nome} (${a.tipo})</h5>
                    <img src="imagens/${a.imagem}" alt="${a.nome}">
                    <p>${a.descricao}</p>
                    <p><strong>Dica:</strong> ${a.dicas}</p>
                </li>`).join('')}
        </ul>
    `;
    
    document.getElementById('details').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDestinos();

    const map = L.map('map-container').setView([-2.5295, -44.3028], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const destinos = [
        { nome: 'São Luís', lat: -2.5295, lon: -44.3028 },
        { nome: 'Lençóis Maranhenses', lat: -2.4854, lon: -43.1239 },
        { nome: 'Alcântara', lat: -2.4056, lon: -44.4154 }
    ];

    destinos.forEach(destino => {
        L.marker([destino.lat, destino.lon]).addTo(map)
            .bindPopup(`<b>${destino.nome}</b>`).openPopup();
    });
});
