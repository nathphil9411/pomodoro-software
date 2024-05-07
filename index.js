//timing display and function
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

function startTimer() {
	if (!isRunning) {
		isRunning = true;
		timer = setInterval(updateTimer, 1000);
	}
}

function updateTimer() {
	if (seconds === 0) {
		if (minutes === 0) {
			clearInterval(timer);
			isRunning = false;
			notifyUser();
			resetTimer();
			return;
		}
		minutes--;
		seconds = 59;
	} else {
		seconds--;
	}
	displayTime();
}

function resetTimer() {
	clearInterval(timer);
	isRunning = false;
	minutes = 25;
	seconds = 0;
	displayTime();
	fetchQuote();
}

function displayTime() {
	const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
	document.getElementById("timer").innerText = formattedTime;
}

// Initial display
displayTime();

//display  body function
const backgroundPix = [
	"assets/background1.jpg",
	"assets/background2.jpg",
	"assets/background3.jpg",
	"assets/background4.jpg",
];
function setBackground() {
	const body = document.querySelector("body");
	const random = Math.floor(Math.random() * backgroundPix.length);
	body.style.backgroundImage = `url(${backgroundPix[random]})`;
	body.style.backgroundSize = "cover";
	body.style.backgroundPosition = "center";
	body.style.backgroundRepeat = "no-repeat";
}
setBackground();
//Set notifification sound

function notifyUser() {
	const notificationSound = document.getElementById("notificationSound");
	if (Notification.permission === "granted") {
		new Notification("Pomodoro session complete!");
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				new Notification("Pomodoro session complete!");
			}
		});
	}
	notificationSound.play();
}

//fetch quotes from zengoute an open source.
function fetchQuote() {
	fetch("https://zenquotes.io/api/random")
		.then((response) => response.json())
		.then((data) => {
			const quote = data[0].q;
			document.getElementById("quote").innerText = quote;
		})
		.catch((error) => {
			console.error("Error fetching quote:", error);
		});
}

// Fetch a quote immediately when the app starts
document.addEventListener("DOMContentLoaded", fetchQuote);
