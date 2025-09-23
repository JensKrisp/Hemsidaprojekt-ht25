


const btn = document.querySelector('.mobil-meny');
const nav = document.getElementById('dator-nav');

// Kör bara formulärlogik om vi är på kontakt.html
if (window.location.pathname.includes('kontakt.html') || document.getElementById("kontakt-form")) {
const form = document.getElementById("kontakt-form");
const submitBtn = document.getElementById("submitBtn");

const f = {
  namn: document.getElementById("namn"),
  telefon: document.getElementById("telefon"),
  email: document.getElementById("email"),
  meddelande: document.getElementById("meddelande"),
};
const out = {
  namn: document.getElementById("err-namn"),
  telefon: document.getElementById("err-telefon"),
  email: document.getElementById("err-email"),
  meddelande: document.getElementById("err-meddelande"),
};
const order = ["namn","telefon","email","meddelande"];

function showError(input, outlet) {
  let msg = "";


  if (input.id === "namn") {
    if (input.value.trim() === "") {
      msg = "Ange ditt namn.";
    } else if (input.value.trim().length < 2) {
      msg = "Namnet måste ha minst 2 tecken.";
    }
  }


  if (input.id === "telefon") {
    const telRegex = /^(?:\+46|0)(?:[ ()-]*\d){6,}$/;
    if (input.value.trim() === "") {
      msg = "Ange ditt telefonnummer.";
    } else if (!telRegex.test(input.value.trim())) {
      msg = "Måste börja med +46 eller 0 och följas av minst 6 siffror (mellanslag, () och - tillåtna).";
    } else if (input.value.length > 12) {
      msg = "Telefonnumret får vara max 12 tecken.";
    }
  }


  if (input.id === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.value.trim() === "") {
      msg = "Ange din e-postadress.";
    } else if (!emailRegex.test(input.value.trim())) {
      msg = "E-post måste vara i formatet namn@domän.";
    }
  }


  if (input.id === "meddelande") {
    if (input.value.trim() === "") {
      msg = "Skriv ett meddelande.";
    } else if (input.value.trim().length < 5) {
      msg = "Meddelandet måste ha minst 5 tecken.";
    }
  }

 
  outlet.textContent = msg;
  input.classList.toggle("valid", msg === "");
  input.setAttribute("aria-invalid", msg ? "true" : "false");

  return msg === "";
}

function updateSubmitState() {
  const allOk = order.every(id => showError(f[id], out[id]));
  submitBtn.disabled = !allOk;
}

// Livevalidering
order.forEach(id => {
  const el = f[id];
  const outlet = out[id];
  ["input", "blur"].forEach(evt => {
    el.addEventListener(evt, () => {
      showError(el, outlet);
      updateSubmitState();
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let allValid = true;
  order.forEach(id => {
    const ok = showError(f[id], out[id]);
    if (!ok) allValid = false;
  });
  if (!allValid) {
    const firstInvalid = order.map(id => f[id]).find(el => !el.checkValidity());
    firstInvalid?.focus();
    return;
  }

  const meddelande = {
    namn: f.namn.value.trim(),
    telefon: f.telefon.value.trim(),
    email: f.email.value.trim(),
    meddelande: f.meddelande.value.trim(),
  };
  console.log("Formulärdata:", meddelande);
  alert("Tack! Ditt meddelande har skickats (simulerat).");

  form.reset();
  order.forEach(id => {
    f[id].classList.remove("valid");
    out[id].textContent = "";
  });
  updateSubmitState();
});

}

// meny knapp logik
// hämtar elementen
const menyKnapp = document.querySelector('.mobil-meny'); // Matchar class="mobil-meny" i HTML
const meny = document.getElementById('nav-meny'); // Matchar id="nav-meny" i HTML

// visar/döljer menyn när man klickar på knappen
if (menyKnapp && meny) {
  menyKnapp.addEventListener("click", () => {
      // Kontrollera den aktuella synligheten med hidden attributet
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