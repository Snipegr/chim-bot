function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
const chatbox = document.getElementById("chatbox");
const CHAT_SIZE = 4;
let messageNumber = 0;
function addMessage(msg) {
	messageNumber++;
	newMessage = document.createElement("li");
	newMessage.innerText = msg;
	newMessage.id = "message"+messageNumber;
	chatbox.appendChild(newMessage);
	if (messageNumber > CHAT_SIZE) {
		const toDelete = document.getElementById("message"+String(messageNumber-CHAT_SIZE));
		chatbox.removeChild(toDelete);
	}
}
function latinize(text) {
	const charTable = {
	// Lowercase letters
	'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 
    'ж': 'zh', 'з': 'z', 'и': 'i', 'і': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    
    // Uppercase letters
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'І': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 
    'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
	};
	return text.split("").map(x => charTable[x] || x).join("");
}
function speak(text) {
	const speech = new SpeechSynthesisUtterance(latinize(text));
	speech.lang = "en_US";
	speech.rate = 1;
	speech.pitch = 1;
	speech.volume = 1;
	speech.onstart = (event) => {
		document.getElementById("chimp-img").src = "img/chimp-talking.gif"
	};
	speech.onend = (event) => {
		document.getElementById("chimp-img").src = "img/chimp-static.png"
	};
	window.speechSynthesis.speak(speech);
}
function talk() {
	event.preventDefault();
	// User enters a message
	phrase = document.getElementById("message").value.trim();
	document.getElementById("message").value = "";
	// Alert if whitespace entered
	if (phrase == "") {
		window.alert("Whitespace entered.");
		return;
	}
	// Add user's message to the chat
	addMessage("You: " + phrase);
	// Add message to the phrase list
	if (!phrase_list.includes(phrase)) {
		phrase_list.push(phrase);
	}
	// Pick a response
	let botPhrase = phrase_list[randInt(0, phrase_list.length-1)];
	while (botPhrase == prevPhrase) {
		botPhrase = phrase_list[randInt(0, phrase_list.length-1)];
	}
	prevPhrase = botPhrase;
	// Add response to the chat
	addMessage("ChimBot: " + botPhrase.replace(/^./, char => char.toUpperCase()));
	// TTS
	console.log(botPhrase);
	speak(botPhrase);
}

function downloadList() {
	const content = phrase_list.join("\n")
	const arrBlob = new Blob([content], {type:"text/plain;charset=utf-8"});
	const url = URL.createObjectURL(arrBlob);
	const aElem = document.createElement("a");
	aElem.href = url;
	aElem.style.display = "none";
	aElem.download = "phrase_list";
	
	document.body.appendChild(aElem);
	aElem.click(aElem);
	document.body.removeChild(aElem);
	URL.revokeObjectURL(url);
	
}
let phrase_list = ["Hello", "How are you?"];
let prevPhrase = "";

const fileInput = document.getElementById("fileInput"); 
let fileLines = [];

fileInput.addEventListener("change", function(event) {
	const file = event.target.files[0];
	
	if (file) {
		const reader = new FileReader();
		
		reader.onload = function(e) {
			const fileContents = e.target.result;
			phrase_list = fileContents.replace(/\r+\n*$/, "\n").split('\n');
		};
		
		reader.readAsText(file);
	}
});