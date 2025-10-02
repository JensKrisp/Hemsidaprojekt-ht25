const menyKnapp = document.querySelector('.mobil-meny'); 
const meny = document.getElementById('nav-meny');


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
      evertprojekt: [
        {
          projektnamn: "Connys Skilsmässa",
          beskrivning: "Conny skilde sig, jag hjälpte honom med att flytta det lilla han fick med sig efter bodelningen"
        }
      ]
    };
  },
  created() {
    axios.get('evertprojekt.json')
      .then(response => {
        this.evertprojekt = response.data;
      })
      
  }
});

app.mount('#app');