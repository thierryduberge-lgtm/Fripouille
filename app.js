const input = document.getElementById('inputTache');
const btnAjouter = document.getElementById('btnAjouter');
const liste = document.getElementById('listeTaches');
const compteur = document.getElementById('compteur');

function sauvegarder(taches) {
  localStorage.setItem('taches', JSON.stringify(taches));
}

function charger() {
  const data = localStorage.getItem('taches');
  return data ? JSON.parse(data) : [];
}

function mettreAJourCompteur(taches) {
  const restantes = taches.filter(t => !t.terminee).length;
  compteur.textContent = restantes + ' tâche(s) restante(s)';
}

function afficher() {
  const taches = charger();
  liste.innerHTML = '';

  taches.forEach((tache, index) => {
    const li = document.createElement('li');
    if (tache.terminee) li.classList.add('terminee');

    const cercle = document.createElement('div');
    cercle.classList.add('cercle');
    cercle.addEventListener('click', () => {
      taches[index].terminee = !taches[index].terminee;
      sauvegarder(taches);
      afficher();
    });

    const span = document.createElement('span');
    span.textContent = tache.texte;

    const btn = document.createElement('button');
    btn.textContent = '✕';
    btn.addEventListener('click', () => {
      taches.splice(index, 1);
      sauvegarder(taches);
      afficher();
    });

    li.appendChild(cercle);
    li.appendChild(span);
    li.appendChild(btn);
    liste.appendChild(li);
  });

  mettreAJourCompteur(taches);
}

btnAjouter.addEventListener('click', () => {
  const texte = input.value.trim();
  if (texte === '') return;

  const taches = charger();
  taches.push({ texte: texte, terminee: false });
  sauvegarder(taches);
  input.value = '';
  afficher();
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') btnAjouter.click();
});

afficher();