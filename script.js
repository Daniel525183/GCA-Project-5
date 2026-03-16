// Game configuration and state variables
let score = 0;            // Current score
let gameActive = false;      // Tracks if game is currently running
const maxTime = 10;         // Holds the time limit
let time;                   // Holds the current amount of time
let secondInterval;          // Holds interval between seconds
let gameEndInterval;        // Holds the interval for ending game (time == 0)


const wellCost = 5;         // The score cost to free a well
const waterVal = 5;         // The score gained from collecting water
let wellTracker = Array.from({ length: 4 }, () => new Array(4).fill(false));

resetWells();
console.log(wellTracker);

let gameTimer = document.getElementById("timer");
let scoreCard = document.getElementById("score-card");
let wellElement;

let emptyWellElements;
let freeWellElements;


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
function clickWell(event){
  //Check what type of well it is
  const clickedWell = event.currentTarget;
  //If it's blocked, then run digWell()
  //Otherwise, it is a free well, thus run collectWater().
  if (clickedWell.classList.contains('blocked-well')){
    console.log("blocked well");
  } else if (clickedWell.classList.contains('free-well-full')){
    collectWater(event);
  }
}

//Function that collects water from unblocked water. Has a check is see if that well has water
function collectWater(event){
  console.log("TODO: collectWater()")
  if (!gameActive) return;

  const clickedWell = event.currentTarget;
  
  score += waterVal;
  scoreCard.textContent = score;

  // After collecting, the well becomes empty and starts refilling again.
  clickedWell.classList.remove('free-well-full');
  clickedWell.classList.add('free-well-empty');
  scheduleWellRefill(clickedWell);
}

function scheduleWellRefill(wellElement) {
  const randomTime = Math.random() * 8000 + 1000;

  setTimeout(() => {
    if (!gameActive) return;
    wellElement.classList.remove('free-well-empty');
    wellElement.classList.add('free-well-full');
  }, randomTime);
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
function spawnInitialWells() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');

  // Clear all cells before rendering the initial state.
  cells.forEach(cell => (cell.innerHTML = ''));

  // Fill all cells as blocked wells first.
  cells.forEach(cell => {
    cell.innerHTML = `
      <div class="well-can-wrapper blocked-well">
        <div class="well-can"></div>
      </div>
    `;
  });

  // Then replace the center 2x2 (indices 5, 6, 9, 10) with free wells.
  const centerIndices = [5, 6, 9, 10];
  centerIndices.forEach(index => {
    cells[index].innerHTML = `
      <div class="well-can-wrapper free-well-empty">
        <div class="well-can"></div>
      </div>
    `;
    // Get each center well, add one click handler, then schedule randomized refill.
    const emptyWellElement = cells[index].querySelector('.free-well-empty');
    emptyWellElement.addEventListener('click', clickWell);
    scheduleWellRefill(emptyWellElement);
  });
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  time = maxTime;
  score = 0;
  resetWells();
  gameActive = true;
  createGrid(); // Set up the game grid
  
  spawnInitialWells();

  gameEndInterval = setInterval(checkTime, 1000); //Checks every second to see if the timer has run out
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
  clearInterval(secondInterval); // Stops decrementing time
  alert("Game ended!");
}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);