//Funkcija za otvaranje iskacuce navigacije
function openNav() {
  document.getElementById("myNav").style.width = "50%";
}
//Funkcija za zatvaranje iskacuce navigacije
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
//Promenjiva za cuvanje vrednosti filtera imena
let nameFilter;
//Niz za cuvanje omiljenih znakova preuzetih iz localstorage-a ili inicijalizovanih kao prazan niz
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//Funkcija za upravljanje promenama u polju za unos imena
function onChangeName(e) {
  console.log(e.value);
  fetchDataByName(e.value);
}
//Promenjiva za cuvanje vrednosti filtera vrste
let speciesFilter;
//Funkcija za upravljanje promenama u polju za unos vrste
function onChangeSpecies(e) {
  console.log(e.value);
  fetchDataBySpecies(e.value);
}
//Funkcija za preuzimanje podataka o znakovima po vrstama
function fetchDataBySpecies(species) {
  fetch(`https://rickandmortyapi.com/api/character?species=${species}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      console.log(data.results);
      jsonContainer.innerHTML = "";

      // Kreiranje redova za prikaz slika
      let row;
      for (let i = 0; i < data.results.length; i++) {
        if (i % 4 === 0) {
          row = document.createElement("div");
          row.classList.add("row");
          jsonContainer.appendChild(row);
        }

        // Kreiranje div-a za svaku sliku
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img-container");

        // Kreiranje slike
        const newImg = document.createElement("img");
        newImg.setAttribute("src", data.results[i].image);
        newImg.addEventListener("click", function () {
          moveToCenter(this);
        });
        // Kreiranje buttona za dodavanje u favorite
        const addButton = document.createElement("button");
        addButton.textContent = "Dodaj u omiljene";
        addButton.addEventListener("click", function () {
          // Implementacija dodavanja u favorite
          addToFavorites(data.results[i].id);
        });

        // Dodavanje slike i buttona u div
        imgDiv.appendChild(newImg);
        imgDiv.appendChild(addButton);

        // Dodavanje div-a u red
        row.appendChild(imgDiv);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
// Poziva fetchDataBySpecies funkciju na stranu
window.onload = () => fetchDataBySpecies("");

// Funkcija za preuzimanje podataka o znakovima po imenu
function fetchDataByName(name) {
  fetch(`https://rickandmortyapi.com/api/character?species=${name}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      console.log(data.results);
      jsonContainer.innerHTML = "";

      // Kreiranje redova za prikaz slika
      let row;
      for (let i = 0; i < data.results.length; i++) {
        if (i % 4 === 0) {
          row = document.createElement("div");
          row.classList.add("row");
          jsonContainer.appendChild(row);
        }

        // Kreiranje div-a za svaku sliku
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img-container");

        // Kreiranje slike
        const newImg = document.createElement("img");
        newImg.setAttribute("src", data.results[i].image);
        newImg.addEventListener("click", function () {
          moveToCenter(this);
        });
        // Kreiranje buttona za dodavanje u favorite
        const addButton = document.createElement("button");
        addButton.textContent = "Dodaj u omiljene";
        addButton.addEventListener("click", function () {
          // Implementacija dodavanja u favorite
          addToFavorites(data.results[i].id);
        });

        // Dodavanje slike i buttona u div
        imgDiv.appendChild(newImg);
        imgDiv.appendChild(addButton);

        // Dodavanje div-a u red
        row.appendChild(imgDiv);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
// Poziva fetchDataByName funkciju na stranu
window.onload = () => fetchDataByName("");

// Funkcija za filtriranje podataka na osnovu unosa
function filterData() {
  //Ulazne vrednosti za ime,vrstu,status i pol
  const nameInput = document
    .querySelector('input[name="name"]')
    .value.toLowerCase();
  const speciesInput = document
    .querySelector('input[name="species"]')
    .value.toLowerCase();
  const statusSelect = document
    .querySelector("#statusSelect")
    .value.toLowerCase();
  const genderSelect = document
    .querySelector("#genderSelect")
    .value.toLowerCase();
  //Preuzimanje podataka iz Api-ja
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      const filteredResults = data.results.filter((character) => {
        return (
          character.name.toLowerCase().includes(nameInput) &&
          character.species.toLowerCase().includes(speciesInput) &&
          (statusSelect === "" ||
            character.status.toLowerCase() === statusSelect) &&
          (genderSelect === "" ||
            character.gender.toLowerCase() === genderSelect)
        );
      });
      //Prikazivanje filtriranih rezultata
      const jsonContainer = document.getElementById("jsonContainer");
      jsonContainer.innerHTML = "<div>hi</div>";
      filteredResults.forEach((character) => {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        jsonContainer.appendChild(newImg);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
//Slusaci dogadjaja za unos i izbor elemenata za pokretanje filtriranja
document
  .querySelector('input[name="name"]')
  .addEventListener("input", filterData);
document
  .querySelector('input[name="species"]')
  .addEventListener("input", filterData);
document.querySelector("#statusSelect").addEventListener("change", filterData);
document.querySelector("#genderSelect").addEventListener("change", filterData);
//Pozivanje funkcije filterData kada se stranica ucita
window.onload = filterData;

// Funkcija za dodavanje karaktera u favorites
function addToFavorites(characterId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(characterId)) {
    favorites.push(characterId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Character added to favorites!");
  } else {
    alert("Character already in favorites!");
  }
}
// Funkcija za prikaz omiljenih likova
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const jsonContainer = document.getElementById("jsonContainer");

  favorites.forEach((characterId) => {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((character) => {
        const characterContainer = document.createElement("div");

        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        characterContainer.appendChild(newImg);

        jsonContainer.appendChild(characterContainer);
      })
      .catch((error) => console.error("Error fetching character:", error));
  });
}

// Pozivamo funkciju za prikaz omiljenih likova kada se stranica učita
window.onload = displayFavorites;
// Pronađite sve opcije u padajućem meniju po statusu
const statusOptions = document.querySelectorAll(".dropdown-content a");

statusOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Kada korisnik klikne na opciju, pozovite funkciju za filtriranje sa odgovarajućim statusom
    const selectedStatus = this.innerText.toLowerCase(); // Dobijanje teksta opcije (npr. "alive", "dead", "unknown")
    filterDataByStatus(selectedStatus); // Poziv funkcije za filtriranje po statusu
  });
});
//Funkcija za preuzimanje podataka po statusu
function filterDataByStatus(status) {
  fetch(`https://rickandmortyapi.com/api/character?status=${status}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      jsonContainer.innerHTML = "";

      data.results.forEach((character) => {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        jsonContainer.appendChild(newImg);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
// Pronađite sve opcije u padajućem meniju po rodu
const genderOptions = document.querySelectorAll(".dropdown-content a");

genderOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Kada korisnik klikne na opciju, pozovite funkciju za filtriranje sa odgovarajućim statusom
    const selectedGender = this.innerText.toLowerCase(); // Dobijanje teksta opcije (npr. "female", "male","genderless","unknown")
    filterDataByGender(selectedGender); // Poziv funkcije za filtriranje po rodu
  });
});
//Funkcija za preuzimanje podataka po polu
function filterDataByGender(gender) {
  fetch(`https://rickandmortyapi.com/api/character?gender=${gender}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      jsonContainer.innerHTML = "";

      data.results.forEach((character) => {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        jsonContainer.appendChild(newImg);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
