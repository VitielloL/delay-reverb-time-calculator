// Função para calcular os valores de delay
function calcularDelay(bpm) {
    let beatTime = 60000 / bpm; // tempo de uma batida

    let delays = [];
    let fractions = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
    fractions.forEach(fraction => {
        let value = beatTime * 4 / fraction;
        delays.push({
        note: `1/${fraction}`,
        value: value
        });
    });

    let delayTable = document.getElementById('delayTable');
    delayTable.innerHTML = '';
    delays.forEach(d => {
        let row = `<tr>
                    <td>${d.note}</td>
                    <td>${d.value.toFixed(2)} ms / ${(1000 / d.value).toFixed(2)} Hz</td>
                    <td>${(d.value * 1.5).toFixed(2)} ms / ${(1000 / (d.value * 1.5)).toFixed(2)} Hz</td>
                    <td>${(d.value * 2 / 3).toFixed(2)} ms / ${(1000 / (d.value * 2 / 3)).toFixed(2)} Hz</td>
                </tr>`;
        delayTable.innerHTML += row;
    });
}

// Função para calcular os valores de reverb
function calcularReverb(bpm) {
    const hallPreDelay = 60000 / bpm * 8 / 64;
    const hallDecay = 60000 / bpm * 8 - hallPreDelay;
    const bigRoomPreDelay = 60000 / bpm * 4 / 64;
    const bigRoomDecay = 60000 / bpm * 4 - bigRoomPreDelay;
    const smallRoomPreDelay = 60000 / bpm * 2 / 64;
    const smallRoomDecay = 60000 / bpm * 2 - smallRoomPreDelay;
    const tightRoomPreDelay = 60000 / bpm * 1 / 64;
    const tightRoomDecay = 60000 / bpm * 1 - tightRoomPreDelay;

    let reverbTable = document.getElementById('reverbTable');
    reverbTable.innerHTML = '';
    let reverbValues = [
        { size: "Salão (2 bares)", preDelay: hallPreDelay, decay: hallDecay },
        { size: "Sala Grande (1 Bar)", preDelay: bigRoomPreDelay, decay: bigRoomDecay },
        { size: "Quarto Pequeno (1/2 Nota)", preDelay: smallRoomPreDelay, decay: smallRoomDecay },
        { size: "Ambiente apertado (1/4 de nota)", preDelay: tightRoomPreDelay, decay: tightRoomDecay }
    ];

    reverbValues.forEach(r => {
        let row = `<tr>
                    <td>${r.size}</td>
                    <td>${r.preDelay.toFixed(2)} ms</td>
                    <td>${r.decay.toFixed(2)} ms</td>
                    <td>${(r.preDelay + r.decay).toFixed(2)} ms</td>
                </tr>`;
        reverbTable.innerHTML += row;
    });
}

// Função principal para calcular os valores ao clicar no botão
function calcularValores() {
    let bpm = document.getElementById('bpm').value;

    // Esconde as seções se o BPM for inválido
    if (bpm <= 0) {
        document.getElementById('reverbTable').innerHTML = '';
        document.getElementById('delayTable').innerHTML = '';
        document.getElementById('reverbSection').classList.add('hidden');
        document.getElementById('delaySection').classList.add('hidden');
        return;
    }

    // Mostra as seções ao calcular
    document.getElementById('reverbSection').classList.remove('hidden');
    document.getElementById('delaySection').classList.remove('hidden');

    calcularDelay(bpm);   // Chama a função para calcular o delay
    calcularReverb(bpm);  // Chama a função para calcular o reverb
}