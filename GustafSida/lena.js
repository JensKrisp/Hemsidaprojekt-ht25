
//Gustafs personliga JS

//Bildspel

let bildIndex = 1;
visaBilder(bildIndex);


function annanSida(n) {
  visaBilder(bildIndex += n);
}

function visaBilder(n) {
  let i;
  let allaBilder = document.getElementsByClassName("bilder");

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


  allaBilder[bildIndex-1].style.display = "block";
  
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
    errorMsg.textContent = 'Det gick inte att läsa in projekten.';
    errorMsg.style.color = 'red';
    container.appendChild(errorMsg);
  });

