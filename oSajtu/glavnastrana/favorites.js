let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Selektovanje diva favoritesContainer
let favoritesContainer = document.getElementById("favoritesContainer");

// Fec data za svaki karakter preko Id-a
favorites.forEach((id) => {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.json())
    .then((character) => {
      // Kreiranje slika elemenata za svaki karakter
      let img = document.createElement("img");
      img.src = character.image;
      // Pravljenje dugmeta za uklanjanje slika iz omiljenih
      let removeButton = document.createElement("button");
      removeButton.textContent = "Remove from Favorites";
      removeButton.addEventListener("click", () => {
        // Uklanjanje karaktera po Id-u iz omiljenih
        favorites = favorites.filter((favId) => favId !== id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        // Uklanjanje slika i dugmeta iz favoritesContainer-a
        favoritesContainer.removeChild(img);
        favoritesContainer.removeChild(removeButton);
      });

      // Dodavanje slika i dugmeta u favoritesContainer
      favoritesContainer.appendChild(img);
      favoritesContainer.appendChild(removeButton);
    })
    .catch((error) => console.error("Error:", error));
});
