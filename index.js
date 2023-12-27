/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

        for (let i = 0; i < games.length; i++) {
            const gameCard = document.createElement("div");
            gameCard.classList.add("game-card");

            // template literal
            gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            `;

            gamesContainer.appendChild(gameCard);

        }


}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((sum, game) => {
    return sum + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString(); // Format with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0);

// set inner HTML using template literal

raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Secret key component 1: Log the number of games in the array returned by filterUnfundedOnly
    console.log("Number of games in the array returned by filterUnfundedOnly:", unfundedGames.length);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);

    // use the function we previously created to add unfunded games to the DOM
    console.log("Number of games in the array returned by filterFundedOnly:", fundedGames.length);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const raisedMoney = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const fundedGamesCount = GAMES_JSON.length - unfundedGamesCount;

const descriptionText = `
    We have raised $${raisedMoney.toLocaleString()} for ${fundedGamesCount} games.
    ${unfundedGamesCount > 0 ? `However, ${unfundedGamesCount} games still need funding, we would appreciate your help to fund these amazing games` : "All games are funded!"}
`;


// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [mostFundedGame, secondMostFundedGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const mostFundedGameElement = document.createElement("div");
mostFundedGameElement.innerHTML = `<p>${mostFundedGame.name}</p>`;
firstGameContainer.appendChild(mostFundedGameElement);

// do the same for the runner up item
const secondMostFundedGameElement = document.createElement("div");
secondMostFundedGameElement.innerHTML = `<p>${secondMostFundedGame.name}</p>`;
secondGameContainer.appendChild(secondMostFundedGameElement);


// Form javascript
document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedback-form');
  
    feedbackForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Make form not submit
  
      // Form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
  
      if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
      }
  
      // If no validation error, form can submit and fields are reset
      alert('Feedback submitted successfully!');
      feedbackForm.reset();
    });
  });
  

// Seach bar functionality
function searchGames(searchTerm) {
    const filteredGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show the filtered games
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
}

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', function () {
        const searchTerm = document.getElementById('search').value.trim();
        searchGames(searchTerm);
    });

    const refreshButton = document.getElementById('refresh-btn');
    refreshButton.addEventListener('click', function () {
        // Clear the search input
        document.getElementById('search').value = '';
        
        // Show all games
        showAllGames();
    });
});
