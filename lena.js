//Bildspel

let bildIndex = 1;
visaBilder(bildIndex);


function annanSida(n) {
  visaBilder(bildIndex += n);
}


function nuvarandeSida(n) {
  visaBilder(bildIndex = n);
}

function visaBilder(n) {
  let i;
  let allaBilder = document.getElementsByClassName("bilder");
  let punkter = document.getElementsByClassName("knapp");
  if (n > allaBilder.length)  {
        bildIndex = 1
}
  
if (n < 1) {
    bildIndex = allaBilder.length
}
  for (i = 0; i < allaBilder.length; i++)
     {
    allaBilder[i].style.display = "none";
  }

  for (i = 0; i < punkter.length; i++) {
    punkter[i].className = punkter[i].className.replace(" active", "");
  }
  allaBilder[bildIndex-1].style.display = "block";
  punkter[bildIndex-1].className += " active";
}


//Inläsning av Projekt



axios.get('info.json')
  .then(response => {
    const projects = response.data;
    const container = document.getElementById('projectsGrid');

    projects.forEach(p => {
      const infoBox = document.createElement('div');
      infoBox.className = 'info-box';

      
      const title = document.createElement('h3');
      title.textContent = p.title;

      
      const client = document.createElement('p');
      const clientLabel = document.createElement('strong');
      clientLabel.textContent = 'Kund: ';
      const clientName = document.createTextNode(p.client);
      
       client.appendChild(clientLabel);
       client.appendChild(clientName);
     

     
      const summary = document.createElement('p');
      summary.textContent = p.summary;

      const more = document.createElement('p');
      more.textContent = p.more;
      
      infoBox.appendChild(title);
      infoBox.appendChild(client);
      infoBox.appendChild(summary);
      infoBox.appendChild(more);

      
      container.appendChild(infoBox);
    });
  })
  .catch(error => {
    console.error('Kunde inte läsa in projekten:', error);

    const container = document.getElementById('projectsGrid');
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Det gick inte att läsa in projekten. Försök igen senare.';
    errorMsg.style.color = 'red';
    container.appendChild(errorMsg);
  });


//  const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//    if (entry.isIntersecting) {
//     const bar = entry.target;
//      const level = bar.getAttribute('data-level');
//         bar.style.width = level;
//        observer.unobserve(bar); 
//      }
//    });
//  });

//   document.querySelectorAll('.skillbar').forEach(bar => {
//    observer.observe(bar);
//  });


//  const obs = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('visible');
//       obs.unobserve(entry.target); // bara en gång
//     }
//   });
// });

// document.querySelectorAll('.info-box').forEach(box => {
//   obs.observe(box);
// });
