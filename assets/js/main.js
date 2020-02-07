/**
 * main.js
 * Holds all the global variables and calls
 * the start screen when document is ready
 */

/* Global Variables */
var bullets = 30;
var highestCombo = 0;
var time;
var checkFriendlyFire;
var healthSpawn;
var healthSpawnRate = 30000; //ms
var enemies = 0;
var spawnRate = 10; //seconds
var spawnRateDec = 3;
var score = 0;
var combo = 0;
var checkCol = [];
var enemyFireArr = [];
var isGamePaused = false;
var isKeyHandlerActive = true;
var isDialogOpen = false;
var isReadyToFire = true;
var waves = 0;
var character;
var map;
var timerMin = 1;
var timerSec = 0;

$(document).ready(function () {
    showDialog("start");
});