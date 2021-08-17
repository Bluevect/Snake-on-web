// ECMAScript 6

var customize = document.getElementById("customize");
var custPage = document.getElementById("customization-page");

customize.onclick = () => {
	custPage.style.display = "block";
};

var speedSelect = document.getElementById("speed-select");
var speedSet = document.getElementById("speed-set");
var speedText = document.getElementById("speed-text");
var speedOK = document.getElementById("speed-ok");

speedOK.onclick = () => {
	time = parseInt(speedText.value);
	alert("changes applied");
};

speedSelect.onchange = () => {
	switch (speedSelect.selectedIndex) {
		case 0:
			time = 200;
			break;
		
		case 1:
			time = 150;
			break;
			
		case 2:
			time = 100;
			break;
			
		case 3:
			time = 50;
			break;
			
		case 4:
			speedSet.style.display = "block";
			break;
	}
};

document.getElementById("back").onclick = () => {
	custPage.style.display = "none";
};