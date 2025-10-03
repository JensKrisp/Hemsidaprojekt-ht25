const menyKnapp = document.querySelector('.mobil-meny'); 
const meny = document.getElementById('nav-meny');
meny.setAttribute('hidden','');

if (menyKnapp && meny) {
  menyKnapp.addEventListener("click", () => {
      
      const isHidden = meny.hasAttribute('hidden');
      
      if (isHidden) {
          meny.removeAttribute('hidden');
          menyKnapp.setAttribute("aria-expanded", "true");
      } else {
          meny.setAttribute('hidden', '');
          menyKnapp.setAttribute("aria-expanded", "false");
      }
  });
}
const app = Vue.createApp({
  data() {
    return {
      connyprojekt: [
        {
          projektnamn: "Connys Skilsmässa",
          beskrivning: "Conny skilde sig, jag hjälpte honom med att flytta det lilla han fick med sig efter bodelningen"
        }
      ]
    };
  },
  created() {
    axios.get('connyprojekt.json')
      .then(response => {
        this.connyprojekt = response.data;
      })
      
  }
});

app.mount('#app');

let aktuelltProjekt = 0;
let aktuellBild = 0;
const bilder = document.querySelectorAll('.bildspel');
const totalaBilder = bilder.length;
visaBild(aktuellBild);
const knappFöregående = document.getElementById('föregående');
const knappNästa = document.getElementById('nästa');
knappFöregående.addEventListener('click', () => {
  visaBild(aktuellBild - 1);
  visaProjekt(aktuelltProjekt - 1);
});
knappNästa.addEventListener('click', () => {
  visaBild(aktuellBild + 1);
  visaProjekt(aktuelltProjekt + 1); 
});

function visaBild(index) {
  if (index >= totalaBilder) {
    aktuellBild = 0;}
    else if (index < 0) aktuellBild = totalaBilder- 1;
    else aktuellBild = index;

    bilder.forEach(bild => {
    bild.style.display = 'none';
  });
    bilder[aktuellBild] .style.display = 'block';
    
  }
  
  