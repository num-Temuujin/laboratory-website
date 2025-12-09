const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";
const pokemonContainer = document.getElementById("pokemonContainer");
const spinner = document.getElementById("spinner");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const pokemonSelect = document.querySelector(".pokemon-select");
const modalWindow = document.getElementById("myModal");
const closeModalButton = document.querySelector(".closeButton");

const pokemonTypeColors = { grass:"#80E177", fire:"#FF6464", water:"#C9FF84", bug:"#91AC22", normal:"#CBCBCB", flying:"#CBE9FF", poison:"#D89CFD", rock:"#CFC06F", ground:"#FFBF72", fighting:"#FF699F", ghost:"#B592FF", psychic:"#FF5E60", ice:"#AEFFF4", dragon:"#87C5FF", dark:"#8F8F8F", fairy:"#FFA2E3", electric:"#FFFA86", steel:"#A4FFE9" };
const pokemonBackground = { grass:"#1EBA11", fire:"#EB6C6C", water:"#009ACB", bug:"#91AC22", normal:"#B6B6B6", flying:"#BA114E", poison:"#7E00CB", rock:"#857D57", ground:"#A77437", fighting:"#BA114E", ghost:"#6B2BF1", psychic:"#C4484A", ice:"#3A9D90", dragon:"#1268B8", dark:"#C01A8D", fairy:"#FFA2E3", electric:"#B7B117", steel:"#448F85" };
const pokemonIcons = { grass:"images/icons/grass.svg", fire:"images/icons/fire.svg", water:"images/icons/water.svg", bug:"images/icons/bug.svg", normal:"images/icons/normal.svg", flying:"images/icons/flying.svg", poison:"images/icons/poison.svg", rock:"images/icons/rock.svg", ground:"images/icons/ground.svg", fighting:"images/icons/fighting.svg", ghost:"images/icons/ghost.svg", psychic:"images/icons/psychic.svg", ice:"images/icons/ice.svg", dragon:"images/icons/dragon.svg", dark:"images/icons/dark.svg", fairy:"images/icons/fairy.svg", electric:"images/icons/electric.svg", steel:"images/icons/steel.svg"};

let offset=0, limit=50;
let allPokemonData=[];

// Load batch
async function loadPokemonBatch(){
  spinner.style.display="block";
  const res = await fetch(`${POKEMON_API}?offset=${offset}&limit=${limit}`);
  const data = await res.json();
  const details = await Promise.all(data.results.map(p=>fetch(p.url).then(r=>r.json())));
  allPokemonData.push(...details);
  displayPokemon(details, true);
  spinner.style.display="none";
  offset += limit;
}

// Display
function displayPokemon(arr, append=false){
  if(!append) pokemonContainer.innerHTML="";
  arr.forEach(data=>{
    const card = document.createElement("div");
    card.className="pokemon-card";
    card.style.background=pokemonBackground[data.types[0].type.name];

    const title=document.createElement("h1"); title.textContent=data.name; card.appendChild(title);
    const img=document.createElement("img"); img.src=data.sprites.other["official-artwork"].front_default; card.appendChild(img);

    const typeDiv=document.createElement("div"); typeDiv.className="type-container";
    data.types.forEach(t=>{
      const span=document.createElement("span");
      span.style.backgroundColor=pokemonTypeColors[t.type.name];
      const icon=document.createElement("img");
      icon.src=pokemonIcons[t.type.name];
      icon.style.width="16px"; icon.style.height="16px"; icon.style.objectFit="contain";
      span.appendChild(icon);
      span.appendChild(document.createTextNode(t.type.name));
      typeDiv.appendChild(span);
    });
    card.appendChild(typeDiv);

    card.addEventListener("click",()=>openModal(data));
    pokemonContainer.appendChild(card);
  });
}

// Modal
function openModal(data){
  document.getElementById("modal-name").textContent=data.name;
  const modalImg=document.getElementById("modal-img"); modalImg.src=data.sprites.other["official-artwork"].front_default;
  const typesContainer=document.getElementById("modal-types"); typesContainer.innerHTML="";
  data.types.forEach(t=>{
    const p=document.createElement("p");
    p.style.backgroundColor=pokemonTypeColors[t.type.name];
    const icon=document.createElement("img");
    icon.src=pokemonIcons[t.type.name]; icon.style.width="16px"; icon.style.height="16px"; icon.style.objectFit="contain";
    p.appendChild(icon);
    p.appendChild(document.createTextNode(t.type.name));
    typesContainer.appendChild(p);
  });
  modalWindow.classList.add("show");
}
closeModalButton.addEventListener("click",()=>modalWindow.classList.remove("show"));

// Search
searchButton.addEventListener("click",()=>{
  const term=searchInput.value.toLowerCase().trim();
  displayPokemon(allPokemonData.filter(p=>p.name.toLowerCase().includes(term)));
});

// Sort
pokemonSelect.addEventListener("change",()=>{
  const value=pokemonSelect.value;
  let sorted=[...allPokemonData];
  if(value==="Lowest") sorted.sort((a,b)=>a.id-b.id);
  else if(value==="highest") sorted.sort((a,b)=>b.id-a.id);
  else if(value==="atoz") sorted.sort((a,b)=>a.name.localeCompare(b.name));
  else if(value==="ztoa") sorted.sort((a,b)=>b.name.localeCompare(a.name));
  displayPokemon(sorted);
});

// Infinite scroll
window.addEventListener("scroll",()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight-100){
    loadPokemonBatch();
  }
});

// Initial load
loadPokemonBatch();
