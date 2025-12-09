console.log("Pokemon FETCH API.");

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";

const fetchedData = fetch(POKEMON_API); /// Promise
const pokemonContainer = document.getElementById("pokemonContainer");

const searchInputElements = document.getElementById("searchInput");
const searchButtonElements = document.getElementById("searchButton");
const modalWindow = document.getElementById("myModal");
const closeModalButton = document.getElementsByClassName("closeButton")[0];

let globalData = [];

fetchedData
  .then((response) => {
    const jsonData = response.json();
    return jsonData;
  })
  .then((data) => {
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      const pokemon = results[i];
      const pokemonURL = pokemon.url;
      const fetchDetailData = fetch(pokemonURL);
      fetchDetailData
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          // Create Element ( DOM )
          const pokemonCardDiv = document.createElement("div");
          pokemonCardDiv.className = "pokemon-card";

          // card
          const pokemonTitle = document.createElement("h1");

          // events and modal
          const myModal = document.createElement("div")
          myModal.className = "pokemon-modal";

          pokemonCardDiv.addEventListener("click", async function () {
            openModal(data.id);
          });


          pokemonTitle.textContent = data.name;
          pokemonTitle.className = "pokemon-title";
          pokemonCardDiv.style.backgroundColor =
            pokemonBackground[data.types[0].type.name]; // object bc-color select.

          pokemonCardDiv.appendChild(pokemonTitle);
          pokemonContainer.appendChild(pokemonCardDiv);
          // img
          const pokemonImage = document.createElement("img");

          pokemonImage.src =
            data.sprites.other["official-artwork"].front_default;
          pokemonImage.style.width = "180px";
          pokemonImage.style.height = "134px";

          pokemonCardDiv.appendChild(pokemonImage);

          // number
          const dataId =
            parseInt(data.id) < 10 ? `#00${data.id}` : `#0${data.id}`;

          // console.log(dataId);
          const idElement = document.createElement("p");

          idElement.style.color = "#ffffff";
          idElement.textContent = dataId;
          idElement.style.fontSize = "18px";
          idElement.style.lineHeight = "normal";
          idElement.style.fontWeight = "700px";
          idElement.style.position = "absolute";
          idElement.style.left = "24px";
          idElement.style.top = "150px";

          pokemonCardDiv.appendChild(idElement);

          // types // 01.04 (great DOM)
          const typeContainer = document.createElement("div");

          typeContainer.style.height = "30px";
          typeContainer.style.display = "flex";
          // typeContainer.style.flexWrap = "nowrap";
          typeContainer.style.height = "40px";

          typeContainer.className = "pokemon-type-container";

          for (let type in data.types) {
            console.log(data.types[type].type.name);
            const pokemonTypeName = data.types[type].type.name; // all object select hiij tvlhvvr vgnde oruulj bgaa

            const img = document.createElement("img");

            img.className = "pokemon-type-ikon";
            img.src = backgroundColor =
              pokemonIcons[data.types[type].type.name];
            const typeImageNameContainer = document.createElement("div");
            typeImageNameContainer.className = "type-name-image-container";
            const p = document.createElement("p"); // p elemented hiij huulj hiij

            p.textContent = pokemonTypeName;
            p.className = "pokemon-type-name";

            typeImageNameContainer.style.backgroundColor =
              pokemonTypeColors[data.types[type].type.name];
            // typeContainer.appendChild(p);

            typeImageNameContainer.appendChild(img);
            typeImageNameContainer.appendChild(p);
            typeContainer.appendChild(typeImageNameContainer);
          }

          pokemonCardDiv.appendChild(typeContainer);
          pokemonCardDiv.appendChild(idElement);
        });
    }
  });

// all neren deer color
const pokemonTypeColors = {
  grass: "#80E177",
  fire: "#FF6464",
  water: "#C9FF84",
  bug: "#C9FF84",
  normal: "#CBCBCB",
  flying: "#CBE9FF",
  poison: "#D89CFD",
  rock: "#CFC06F",
  ground: "#FFBF72",
  fighting: "#FF699F",
  ghost: "#B592FF",
  psychic: "#FF5E60",
  ice: "#AEFFF4",
  dragon: "#87C5FF",
  dark: "#8F8F8F",
  fairy: "#FFA2E3",
  electric: "#FFFA86",
  steel: "#A4FFE9",
};
// all neren deer icons
const pokemonIcons = {
  grass: "images/icons/grass.svg",
  fire: "images/icons/fire.svg",
  water: "images/icons/water.svg",
  bug: "images/icons/bug.svg",
  normal: "images/icons/normal.svg",
  flying: "images/icons/flying.svg",
  poison: "images/icons/poison.svg",
  rock: "images/icons/rock.svg",
  ground: "images/icons/ground.svg",
  fighting: "images/icons/fighting.svg",
  ghost: "images/icons/ghost.svg",
  psychic: "images/icons/psychic.svg",
  ice: "images/icons/ice.svg",
  dragon: "images/icons/dragon.svg",
  dark: "images/icons/dark.svg",
  fairy: "images/icons/fairy.svg",
  electric: "images/icons/electric.svg",
  steel: "images/icons/steel.svg",
};

const pokemonBackground = {
  grass: "#1EBA11",
  fire: "#EB6C6C",
  water: "#009ACB",
  bug: "#91AC22",
  normal: "#B6B6B6",
  flying: "#BA114E",
  poison: "#7E00CB",
  rock: "#857D57",
  ground: "#A77437",
  fighting: "#BA114E",
  ghost: "#6B2BF1",
  psychic: "#C4484A",
  ice: "#3A9D90",
  dragon: "#1268B8",
  dark: "#C01A8D",
  fairy: "#FFA2E3",
  electric: "#B7B117",
  steel: "#448F85",
};

async function openModal(pokemonId) {
  console.log("pokemon modal window");
  console.log(pokemonId);

  const individualPokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
  );
  const individualPokemonData = await individualPokemonResponse.json();
  console.log(individualPokemonData);
  modalWindow.style.display = "block";

  closeModalButton.addEventListener("click", function () {
    modalWindow.style.display = "none";
  });

  for (let type in pokemonId.types) {
    console.log(pokemonId[type].type.pokemonId);
    const pokemonModalType = pokemonId.types[type].type.name;

    const modalImg = document.createElement("img");  

    modalImg = "pokemon-img";
    
  }





  





  
}



// pokemonContainer.innerHTML += `
//     <div class="pokemon-card">
//         <h1>${data.name}</h1>
//         <img src="${data.sprites.front_default}" width="300" height="300" />
//     </div>
// `;

// fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100")
//   .then((res) => res.json())
//   .then((data) => {
//     globalData = data.products;
//     console.log(globalData);
//     // loop html view
//     for (let i = 0; i < globalData.length; i++) {
//       // displayCard(globalData[i]);
//     }
//   });
