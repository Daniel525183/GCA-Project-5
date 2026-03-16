// Game configuration and state variables
//const GOAL_CANS = 25;        // Total items needed to collect
let score = 0;            // Current score
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;          // Holds the interval for spawning items
const maxTime = 10;         // Holds the time limit
let time;                   // Holds the current amount of time
let secondInterval;          // Holds interval between seconds
let gameEndInterval;        // Holds the interval for ending game (time == 0)

const wellCost = 5;         // The score cost to free a well
const waterVal = 5;         // The score gained from collecting water
let wellTracker = Array.from({ length: 4 }, () => new Array(4).fill(false));
//Will tracks which wells are free/dug
//False == blocked well
//True == free well
resetWells();
console.log(wellTracker);

let gameTimer = document.getElementById("timer");
let scoreCard = document.getElementById("score-card");
let wellElement;


//Function that resets wells to starting configuration
function resetWells(){
  console.log("TODO : resetWells")
  if (gameActive) return;     //No resetting wells until a game isn't active.


  //First set all wells to blocked.
  for (let row = 0; row < 4; row++){
    for(let col = 0; col < 4; col ++){
      wellTracker[row][col] = false; 
    }
  }

  //Afterwards, set the four internal wells to be free
  for (let row = 1; row < 3; row++){
    for(let col = 1; col < 3; col ++){
      wellTracker[row][col] = true; 
    }
  }
}

//Function that determines what happens when a well is clicked.
function clickWell(){
  //Check what type of well it is
  //If its unblocked, then run collectWater()
  //Otherwise, run digWell()
  collectWater();
}

//Function that collects water from unblocked water. Has a check is see if that well has water
function collectWater(){
  console.log("TODO: collectWater()")
  if (!gameActive) return;
  
  score += waterVal;
  scoreCard.textContent = score;
}

//Function that frees a well if the player has enough score
function digWell(){
  console.log("TODO: digWell")
}

//Function that makes it clear that the player did not have enough points to dig a well
function digWellFailed(){
  console.log("TODO: digWellFailed")
}

// Creates the 4x4 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square
    grid.appendChild(cell);
  }
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWell() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');
  
  // Clear all cells before spawning a new water can
  cells.forEach(cell => (cell.innerHTML = ''));

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div class="well-can-wrapper" id = "currentWell">
      <div class="well-can"></div>
    </div>
  `;

  //Update the element for the well
  wellElement = document.getElementById("currentWell");
  wellElement.addEventListener('click', clickWell);
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  time = maxTime;
  score = 0;
  resetWells();
  gameActive = true;
  createGrid(); // Set up the game grid
  

  gameEndInterval = setInterval(checkTime, 1000); //Checks every second to see if the timer has run out
  //Ends game if so
  spawnInterval = setInterval(spawnWell, 1000); // Spawn well every second
  secondInterval = setInterval(updateTimer, 1000); //Updates timer every second
  

  console.log("Stopped running");
}

//Function that decrements the timer by one second and updates it
function updateTimer(){
  if (time == 0) return;
  time -= 1;
  gameTimer.textContent = time;
}

//Function used to end the game when time runs out
function checkTime(){
  if (time <= 0) endGame();
}

//Function that will pause the timer and prevent any more interaction until unpaused
function pauseGame(){
  console.log("TODO: pauseGame()")
}

//Function that ends the game, stopping all intervals.
function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(gameEndInterval);// Stops checking if the game has ended (it has.)
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(secondInterval); // Stops decrementing time
  alert("Game ended!");
}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);