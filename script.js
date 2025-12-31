const livelli = [
    { categoria: "CIBO", frase: "PIZZA MARGHERITA" },
    { categoria: "PROVERBIO", frase: "CHI DORME NON PIGLIA PESCI" },
    { categoria: "CINEMA", frase: "IL GLADIATORE" }
];

const rowCapacities = [12, 14, 14, 12];
let fraseCorrente = "";

function startGame(index) {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    const data = livelli[index];
    fraseCorrente = data.frase;
    document.getElementById('categoryDisplay').innerText = `CATEGORIA: ${data.categoria}`;
    
    setupBoard(data.frase);
    setupKeyboard();
}

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('game-screen').classList.add('hidden');
}

function setupBoard(frase) {
    // Algoritmo di distribuzione semplice
    const words = frase.split(' ');
    let rows = [[], [], [], []];
    let currentRow = 1;

    words.forEach(word => {
        let currentLen = rows[currentRow].join(' ').length;
        if (currentLen + word.length + 1 > rowCapacities[currentRow]) currentRow++;
        if (currentRow < 4) rows[currentRow].push(word);
    });

    for (let i = 0; i < 4; i++) {
        const container = document.getElementById(`row-${i + 1}`);
        container.innerHTML = '';
        const rowText = rows[i].join(' ');
        const offset = Math.floor((rowCapacities[i] - rowText.length) / 2);

        for (let j = 0; j < rowCapacities[i]; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            const char = rowText[j - offset];
            if (char && char !== ' ') {
                tile.classList.add('active');
                tile.dataset.letter = char;
            }
            container.appendChild(tile);
        }
    }
}

function setupKeyboard() {
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    "ABCDEFGHILMNOPQRSTUVZ".split('').forEach(l => {
        const btn = document.createElement('button');
        btn.classList.add('key');
        btn.innerText = l;
        btn.onclick = () => guessLetter(l, btn);
        kb.appendChild(btn);
    });
}

function guessLetter(letter, btn) {
    btn.disabled = true;
    const tiles = document.querySelectorAll(`.tile[data-letter="${letter}"]`);
    tiles.forEach(t => t.innerText = letter);
}
