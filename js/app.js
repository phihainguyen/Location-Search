const inputSearch = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
getData();
async function getData() {
  const response = await fetch(endpoint);
  const data = await response.json();
  cities.push(...data);
  console.log(cities);
}
//this following method is a way to also use fetch but using the .then() which returns a promise
// fetch(endpoint).then(blob => blob.json().then(data => cities.push(...data)));

function findMatch(wordToMatch, cities) {
  return cities.filter(place => {
    //we need to create a regex(regular expression to allow us to use the wordToMatch parameter as what we are searching for in the regex)
    //so instead of the regex, got to https://regexr.com/ for more info
    //g will be for global, meaning it will look through the entire string for the specific word the user is searching for and i is for insensitive meaning it will match for lowercase and capital letters even when it isn't, meaning it wont be case sensitive
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
function displayMatches() {
  const cityArray = findMatch(this.value, cities);
  //   console.log(cityArray);

  const html = cityArray
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li>
    <span class= "name"> ${cityName}, ${place.state}</span>
    <span class = "population">Population: ${place.population}</span>
    </li>`;
    })
    .join("");
  suggestions.innerHTML = html;
}

inputSearch.addEventListener("change", displayMatches);
inputSearch.addEventListener("keyup", displayMatches);
