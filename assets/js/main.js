/* Global Variables */
var bullets = 30;
var highestCombo = 0;
var time;
var checkFriendlyFire;
var healthSpawn;
var healthSpawnRate = 30000; //ms
var enemies = 0;
var spawnRate = 10; //seconds
var score = 0;
var combo = 0;
var checkCol = [];
var enemyFireArr = [];
var isGamePaused = false;
var isKeyHandlerActive = true;
var isDialogOpen = false;
var isReadyToFire = true;
var waves = 0;

$(document).ready(function () {
    showDialog("start");
});