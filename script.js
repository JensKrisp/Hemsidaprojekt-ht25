

// meny knapp logik

//h'mtar elementen

const menyKnapp = document.getElementById("meny-knapp");
const meny = document.getElementById("meny");



// vassar menyn när man klickar på knappen
menyKnapp.addEventListener("click", () => {
    if (meny.style.display === "block") {
        meny.style.display = "none";
    } else {
        meny.style.display = "block"; 
    }
});