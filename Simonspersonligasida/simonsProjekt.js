const images = [
    "gruppbild.png",
    "lastbil2.png",
    "möte.png"
];

let bildIndex = 0;
const projectBild = document.getElementById("project-bild");
const föregåendeKnapp = document.getElementById("föregående-knapp");
const nästaKnapp = document.getElementById("nästa-knapp");

function uppdateraBild() {
    projectBild.src = images[bildIndex];
}

föregåendeKnapp.addEventListener("click", () => {
    bildIndex--;
    if (bildIndex < 0) {
        bildIndex = images.length - 1;
    }
    uppdateraBild();
});

nästaKnapp.addEventListener("click", () => {
    bildIndex++;
    if (bildIndex >= images.length) {
        bildIndex = 0;
    }
    uppdateraBild();
});

uppdateraBild();


async function laddaProjekt() {
    try {
        const response = await axios.get('projekt.json');
        visaProjekt(response.data);
    } catch (error) {
        document.getElementById('projekt-lista').innerHTML = '<p>Fel: Kunde inte ladda projekt.</p>'; // fixa
    }
}

function visaProjekt(projekt) {
    const listaContainer = document.getElementById('projekt-lista');

    projekt.forEach(projekt => {
        const kort = document.createElement('div');
        kort.classList.add('projekt-kort');
        kort.innerHTML = `
            <h3>${projekt.titel}</h3>
            <p class="kund">Kund: ${projekt.kund}</p>
            <p class="beskrivning">${projekt.beskrivning}</p>
            <p class="varaktighet">Varaktighet: ${projekt.varaktighet}</p>
        `;
        listaContainer.appendChild(kort);
    });
}

document.addEventListener('DOMContentLoaded', laddaProjekt);