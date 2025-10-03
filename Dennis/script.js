document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.slideshow')) initSlideshow();
  initProjects(); 
  initModoMode();
  
  // Koppla global detaljer-checkbox
  const toggleCheckbox = document.getElementById('toggleAllDetails');
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', toggleAllProjectDetails);
  }
});


let allaProjekt = [];
let filtreradeProjekt = [];

function toggleAllProjectDetails() {
  const toggleCheckbox = document.getElementById('toggleAllDetails');
  const allaDetaljer = document.querySelectorAll('.project-details');
  
  // Toggla alla detaljer baserat på checkbox status
  allaDetaljer.forEach(detalj => {
    detalj.style.display = toggleCheckbox.checked ? 'block' : 'none';
  });
}

/* ========== BILDSPEL ========== */
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
  const listaElement   = document.getElementById('projectsList');
  const filtreraElement = document.getElementById('projectFilter');
  const sorteraElement   = document.getElementById('projectSort');
  const matchaElement  = document.getElementById('projectMatchMode');

  if (!listaElement || !filtreraElement || !sorteraElement || !matchaElement) {
    console.error('element saknas för projekt');
    return;
  }

  const rendera = (objekt) => {
    if (!objekt.length) {
      listaElement.innerHTML = `<p>Inga projekt matchar filtret.</p>`;
      return;
    }


    listaElement.innerHTML = objekt.map((projekt, index) => `
      <div class="project-card">
        <img src="${projekt.bild || 'placeholder.jpg'}" 
             alt="Skärmbild från ${projekt.titel}" 
             onerror="this.src='https://via.placeholder.com/200x200/34495e/ecf0f1?text=Projekt'">
        <div class="project-info">
          <h3 class="project-title">${projekt.titel}</h3>
          <p class="project-client">${projekt.klient}</p>
          <p class="project-summary">${projekt.sammanfattning}</p>
          <div class="project-details" style="display: none;">
            <p><strong>Beskrivning:</strong> ${projekt.beskrivning}</p>
            <p><strong>Status:</strong> ${projekt.status}</p>
            <p><strong>Varaktighet:</strong> ${projekt.varaktighet}</p>
            <p><strong>Startdatum:</strong> ${projekt.startdatum}</p>
          </div>
        </div>
      </div>
    `).join('');
  };

  try {
    await loadProjectsWithFilter();
    rendera(filtreradeProjekt);
  } catch (fel) {
    console.error('fel vid projektimport', fel);
    listaElement.innerHTML = '<p>något är fel med filter :(</p>';
  }

  let timer;
  const sökDelay = (fn, delay = 200) => (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  const applicera = async () => {
    const sökning = filtreraElement.value.trim().toLowerCase();
    const läge = matchaElement.value;   // 'starts' | 'includes'
    const sortering = sorteraElement.value;  // 'alpha-asc' | 'alpha-desc'

    try {
      await loadProjectsWithFilter(sökning, läge, sortering);
      rendera(filtreradeProjekt);
    } catch (fel) {
      console.error('fel har skett vid filtrering:', fel);
    }
  };

  filtreraElement.addEventListener('input', sökDelay(applicera, 150));
  sorteraElement.addEventListener('change', applicera);
  matchaElement.addEventListener('change', applicera);
}


async function loadProjectsWithFilter(sökning = '', läge = 'includes', sortering = 'alpha-asc') {
  try {
    
    const { data } = await axios.get('projects.json', { responseType: 'json' });
    allaProjekt = Array.isArray(data) ? data : [];
    
    
    filtreradeProjekt = allaProjekt.filter(p => {
      if (!sökning) return true; 
      const titel = (p.titel || '').toLowerCase();
      return läge === 'starts' ? titel.startsWith(sökning) : titel.includes(sökning);
    });

    
    filtreradeProjekt.sort((a, b) => {
      const A = (a.titel || '').toLowerCase();
      const B = (b.titel || '').toLowerCase();
      return sortering === 'alpha-desc' ? B.localeCompare(A) : A.localeCompare(B);
    });

  } catch (fel) {
    console.error('Kunde inte läsa projects.json', fel);
    filtreradeProjekt = [];
    throw fel;
  }
}

// Modo Mode funktionalitet
function initModoMode() { 

  const modoBtn = document.getElementById('modo-toggle');

  // Modo's armé
  const modoAudio = document.createElement('audio');
  modoAudio.id = 'modoAudio';
  modoAudio.preload = 'auto';
  modoAudio.src = 'modo.mp3';
  modoAudio.loop = true; 
  modoAudio.volume = 0.7;
  document.body.appendChild(modoAudio);
  
  // Klick-event för att växla Modo Mode
  modoBtn.addEventListener('click', function() {
    document.body.classList.toggle('modo-mode');
    
    if (document.body.classList.contains('modo-mode')) {
      modoBtn.textContent = '🎨 NORMAL MODE';
      modoBtn.title = 'Tillbaka till normal design';
      
      
      modoAudio.play().catch(error => {
        console.log('Kunde inte spela audio:', error);
      });
      
    } else {
      modoBtn.textContent = '🏪 MODO MODE';
      modoBtn.title = 'Aktivera Modo Mode!';
      
      
      modoAudio.pause();
      modoAudio.currentTime = 0;
      
     
    }
  });
  
  
    
  
  
}