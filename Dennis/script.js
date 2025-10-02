document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.slideshow')) initSlideshow(); // bildspel
  initProjects(); 
  initModoMode();
});


let allaProjekt = [];
let filtreradeProjekt = [];

function toggleProjectDetails(knapp) {
  const kort = knapp.closest('.project-card');
  const detaljer = kort.querySelector('.project-details');
  
  if (detaljer.style.display === 'none') {
    detaljer.style.display = 'block';
    knapp.textContent = 'Dölj detaljer';
  } else {
    detaljer.style.display = 'none';
    knapp.textContent = 'Visa detaljer';
  }
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
    // Dölj alla slides
    bilder.forEach(bild => bild.classList.remove('active'));
    indikatorer.forEach(indikator => indikator.classList.remove('active'));
    
    // Visa vald slide
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

  // Event listeners
  nästaKnapp.addEventListener('click', nästaBild);
  föregKnapp.addEventListener('click', föregBild);

  // Indikator-knappar
  indikatorer.forEach((indikator, index) => {
    indikator.addEventListener('click', () => {
      aktuellBild = index;
      visaBild(aktuellBild);
    });
  });

  visaBild(aktuellBild);
}


async function initProjects() {
  const listaEl   = document.getElementById('projectsList');
  const filterEl = document.getElementById('projectFilter');
  const sorterEl   = document.getElementById('projectSort');
  const matchEl  = document.getElementById('projectMatchMode');
  
  if (!listaEl || !filterEl || !sorterEl || !matchEl) {
    console.error('Missing required elements for project filtering');
    return;
  }

  try {
    // Ladda initial projekt (alla projekt utan filter)
    await loadProjectsWithFilter();
    rendera(filtreradeProjekt);
  } catch (fel) {
    console.error('Error loading initial projects:', fel);
    listaEl.innerHTML = '<p>Kunde inte ladda projekt. Kontrollera konsolen för fel.</p>';
  }

  let timer;
  const debounce = (fn, delay = 200) => (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  const applicera = async () => {
    const sökning = filterEl.value.trim().toLowerCase();
    const läge = matchEl.value;   // 'starts' | 'includes'
    const sortering = sorterEl.value;  // 'alpha-asc' | 'alpha-desc'

    try {
      // Ladda projekt baserat på filter
      await loadProjectsWithFilter(sökning, läge, sortering);
      rendera(filtreradeProjekt);
    } catch (fel) {
      console.error('fel har skett vid filtrering:', fel);
    }
  };

  const rendera = (objekt) => {
    if (!objekt.length) {
      listaEl.innerHTML = `<p>Inga projekt matchar filtret.</p>`;
      return;
    }
    
  
    listaEl.innerHTML = objekt.map((projekt, index) => `
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
            <div class="project-technologies">
              ${projekt.teknologier.map(tek => `<span class="tech-tag">${tek}</span>`).join('')}
            </div>
          </div>
        </div>
        <button class="card-toggle-btn btn btn--small" onclick="toggleProjectDetails(this)">Visa detaljer</button>
      </div>
    `).join('');
  };

  filterEl.addEventListener('input', debounce(applicera, 150));
  sorterEl.addEventListener('change', applicera);
  matchEl.addEventListener('change', applicera);
}

/* ========== DYNAMISK PROJEKTLADDNING ========== */
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
 
  const modoBtn = document.createElement('button');
  modoBtn.className = 'modo-mode-btn';
  modoBtn.textContent = '🏪 MODO MODE';
  modoBtn.title = 'Aktivera Modo Mode!';
  
  // Modo's armé
  const modoAudio = document.createElement('audio');
  modoAudio.id = 'modoAudio';
  modoAudio.preload = 'auto';
  modoAudio.src = 'modo.mp3';
  modoAudio.loop = true; 
  modoAudio.volume = 0.7;
  document.body.appendChild(modoAudio);
  
  
  document.body.appendChild(modoBtn);
  
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
      
      // Stoppa modo mode musik
      modoAudio.pause();
      modoAudio.currentTime = 0; // Återställ till början
      
     
    }
  });
  
  
    
  
  
}