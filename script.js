// API and query constant definitions
const apiBase = "https://api.punkapi.com/v2/beers";
const IBUMax = `ibu_lt=${/* maxIBU */ 50}`;
const IBUMin = `ibu_gt=${/* minIBU */ 20}`;
const ABVMax = `abv_lt=${/* maxABV */ 7}`;
const ABVMin = `abv_gt=${/* minABV ||*/ 0}`;
const byIBUQuery = `${apiBase}?${IBUMax}&${IBUMin}`;
const byABVQuery = `${apiBase}?${ABVMax}&${ABVMin}`;

// Dom element constant definitions
const pageContent = document.querySelector(".content");
const elByIBU = document.getElementById("byIBU");
console.log(elByIBU);
const elByABV = document.getElementById("byABV");
const elHome = document.getElementById("home");
const elContact = document.getElementById("contact");

elByABV.addEventListener("click", fetchBeer(byABVQuery));
elByIBU.addEventListener("click", fetchBeer(byIBUQuery));

function beerCardTemplate(data) {
  const { id, name, abv, ibu, image_url, description } = data;
  return `
  <div class="beerCard">
    <div class="beerCard__image">
      <img height="100px" width="auto" src=${image_url}/>
    </div>
    <div class="beerCard__text">
      <div class="beerCard__data">
        <span class="data__title">Name:</span> ${name}
      </div>
      <div class="beerCard__data">
        <span class="data__title">Description:</span> ${description}
      </div>
      <div class="beerCard__data">
        <span class="data__title"> Alcohol by Volume:</span> ${abv}
      </div>
      <div class="beerCard__data beerCard__data-help">
        <span class="data__title"> IBUs:</span> ${ibu}
      </div>
  </div>
  `;
}

async function fetchBeer(query) {
  try {
    const res = await fetch(query);
    const data = await res.json();
    console.log(data);
    data.forEach((beer) => {
      pageContent.innerHTML = pageContent.innerHTML + beerCardTemplate(beer);
    });
  } catch (err) {
    console.log(err);
  }
}
