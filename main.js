const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const letterOption = document.getElementById('aToz');
const alcoholOption = document.getElementById('alcoholic');
const categoryOption = document.getElementById('category');
const errorTxt = document.getElementById('error-txt');
const content = document.getElementById('content');

//Listeners
searchBtn.addEventListener('click', getCocktails);
letterOption.addEventListener('change', showAll);
alcoholOption.addEventListener('change', showAlcoholic);
categoryOption.addEventListener('change', showCategory);

// Fetch functions
// Search drink
async function getCocktails(e) {
  e.preventDefault();
  if (searchInput.value === '') {
    errorTxt.innerText = 'Oh, no! Please search for a drink';
  } else
    try {
      let response = await fetch(
        'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=' +
          searchInput.value
      );
      const data = await response.json();
      const drinks = data.drinks;
      console.log(drinks);

      let drinkHTML = '';
      for (let drink of drinks) {
        drinkHTML += '<div class="drinks">';
        drinkHTML += `<a href"#"><img class="drink-img" src="${drink.strDrinkThumb}"></img></a>`;
        drinkHTML += `<a href"#"><h2 class="drink-title">${drink.strDrink}</h2></a>`;
        drinkHTML += `<i class="drink-title">${
          drink.strAlcoholic + ' ' + drink.strCategory
        }</i>`;
        drinkHTML += '<section class="hidden">';

        drinkHTML += `<p class="info-text">${drink.strInstructions}</p>`;
        drinkHTML += `<p class="info-glass">Glass: ${drink.strGlass}</p>`;
        drinkHTML += '</section>';
        drinkHTML += '</div>';
      }
      content.innerHTML = drinkHTML;

      let postTitles = document.querySelectorAll('.drinks a');
      for (let postTitle of postTitles) {
        postTitle.addEventListener('click', function () {
          this.parentNode.lastElementChild.classList.toggle('hidden');
        });
      }
    } catch (error) {
      errorTxt.innerText =
        'Oh, no! Something went wrong... shake more cocktails';
    }
}

//Show all drinks by letter
async function showAll() {
  try {
    let response = await fetch(
      'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?f=' +
        letterOption.value
    );

    const data = await response.json();
    const allDrinks = data.drinks;
    console.log(allDrinks);

    let allDrinkHTML = '';
    for (let drink of allDrinks) {
      allDrinkHTML += '<div class="drinks">';
      allDrinkHTML += `<img class="drink-img" src="${drink.strDrinkThumb}"></img>`;
      allDrinkHTML += `<h2 class="drink-title">${drink.strDrink}</h2>`;
      allDrinkHTML += `<i class="drink-title">${drink.strAlcoholic}</i>`;
      allDrinkHTML += '</div>';
    }
    content.innerHTML = allDrinkHTML;
  } catch (error) {
    errorTxt.innerText =
      'Oh, no! Something went wrong... shake more cocktails!';
  }
}

//Show By alcohol
async function showAlcoholic() {
  try {
    let response = await fetch(
      'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=' +
        alcoholOption.value
    );

    const data = await response.json();
    console.log(data);
    const drinkType = data.drinks;
    console.log(drinkType);

    let typeHTML = '';
    for (let drink of drinkType) {
      typeHTML += '<div class="drinks">';
      typeHTML += `<img class="drink-img" src="${drink.strDrinkThumb}"></img>`;
      typeHTML += `<h2 class="drink-title">${drink.strDrink}</h2>`;
      typeHTML += '</div>';
    }
    content.innerHTML = typeHTML;
  } catch (error) {
    errorTxt.innerText =
      'Oh, no! Something went wrong... shake more cocktails!';
  }
}

//Show By Category
async function showCategory() {
  try {
    let response = await fetch(
      'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?c=' +
        categoryOption.value
    );

    const data = await response.json();
    const drinkcategory = data.drinks;
    console.log(drinkcategory);

    let categoryHTML = '';
    for (let drink of drinkcategory) {
      categoryHTML += '<div class="drinks">';
      categoryHTML += `<img class="drink-img" src="${drink.strDrinkThumb}"></img>`;
      categoryHTML += `<h2 class="drink-title">${drink.strDrink}</h2>`;
      categoryHTML += '</div>';
    }
    content.innerHTML = categoryHTML;
  } catch (error) {
    errorTxt.innerText =
      'Oh, no! Something went wrong... shake more cocktails!';
  }
}
