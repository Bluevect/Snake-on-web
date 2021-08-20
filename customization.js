// ECMAScript 6

var customize = document.getElementById("customize");
var custPage = document.getElementById("customization-page");

customize.onclick = () => {
	custPage.style.display = "block";
};

// Core
function textBind(btn, text, vari, type) { // type: 0: Number, 1: Color
	switch (type) {
		case 0:
			btn.onclick = () => {
				var num = parseInt(text.value);
				
				// check number
				if (isNaN(num)) {
					alert("Illegal number!");
					return;
				}
				
				window[vari] = num;
				alert("changes applied");
			};
			
			break;
			
		case 1:
			btn.onclick = () => {
				window[vari] = text.value;
				alert("changes applied");
			};
		
			break;
	}
}

// Speed
var speedSelect = document.getElementById("speed-select");
var speedSet = document.getElementById("speed-set");
var speedText = document.getElementById("speed-text");
var speedOK = document.getElementById("speed-ok");

textBind(speedOK, speedText, "time", 0);

speedSelect.onchange = () => {
	switch (speedSelect.selectedIndex) {
		case 0:
			time = 200;
			speedSet.style.display = "none";
			break;
		
		case 1:
			time = 150;
			speedSet.style.display = "none";
			break;
			
		case 2:
			time = 100;
			speedSet.style.display = "none";
			break;
			
		case 3:
			time = 50;
			speedSet.style.display = "none";
			break;
			
		case 4:
			time = parseInt(speedText.value);
			speedSet.style.display = "block";
			break;
	}
};


// Color

// Background color
var bgColorText = document.getElementById("bg-color-text");
var bgColorOK = document.getElementById("bg-color-ok");

textBind(bgColorOK, bgColorText, "bg", 1);

// Snake color
var snakeColorText = document.getElementById("snake-color-text");
var snakeColorOK = document.getElementById("snake-color-ok");

textBind(snakeColorOK, snakeColorText, "snakeColor", 1);

// Food color
var foodColorText = document.getElementById("food-color-text");
var foodColorOK = document.getElementById("food-color-ok");

textBind(foodColorOK, foodColorText, "foodColor", 1);

// Killed color
var killedColorText = document.getElementById("killed-color-text");
var killedColorOK = document.getElementById("killed-color-ok");

textBind(killedColorOK, killedColorText, "killedColor", 1);


// Back
document.getElementById("back").onclick = () => {
	custPage.style.display = "none";
};