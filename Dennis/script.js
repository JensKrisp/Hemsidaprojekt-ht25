document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.slideshow')) initSlideshow();
  initProjects(); 

});
function initSlideshow() {
  const bilder = document.querySelectorAll('.slide');
  const föregKnapp = document.querySelector('.slide-btn--prev');
  const nästaKnapp = document.querySelector('.slide-btn--next');
  const indikatorer = document.querySelectorAll('.indicator');
  
  if (!bilder.length || !föregKnapp || !nästaKnapp) return;

  let aktuellBild = 0;
  const totalaBilder = bilder.length;

  function visaBild(index) {
   
    bilder.forEach(bild => bild.classList.remove('active'));
    indikatorer.forEach(indikator => indikator.classList.remove('active'));
    
    
    bilder[index].classList.add('active');
    indikatorer[index].classList.add('active');
  }

  function nästaBild() {
    aktuellBild = (aktuellBild + 1) % totalaBilder;
    visaBild(aktuellBild);
  }

  function föregBild() {
    aktuellBild = (aktuellBild - 1 + totalaBilder) % totalaBilder;
    visaBild(aktuellBild);
  }

  
  nästaKnapp.addEventListener('click', nästaBild);
  föregKnapp.addEventListener('click', föregBild);


  indikatorer.forEach((indikator, index) => {
    indikator.addEventListener('click', () => {
      aktuellBild = index;
      visaBild(aktuellBild);
    });
  });

  visaBild(aktuellBild);
}

async function initProjects() {
  const container = document.getElementById('projectsList');
  const res = await fetch('projects.json');
  const data = await res.json();

  container.innerHTML = data.length
    ? data.map(p => `
      <div class="project-card">
        <h3 class="project-title">${p.titel}</h3>
        <p class="project-client">${p.klient}</p>
        <p class="project-summary">${p.sammanfattning}</p>
        <p><strong>Beskrivning:</strong> ${p.beskrivning}</p>
        <p><strong>Status:</strong> ${p.status}</p>
        <p><strong>Varaktighet:</strong> ${p.varaktighet}</p>
        <p><strong>Startdatum:</strong> ${p.startdatum}</p>
      </div>
    `).join('')
    : '<p>Inga projekt hittades.</p>';
}