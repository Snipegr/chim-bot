function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function addMessage(msg) {
	for (let i = 0; i<CHAT_SIZE-1; i++) {
		up = document.getElementById("chat" + i);
		up.innerHTML = document.getElementById("chat" + (i+1)).innerHTML;
	}
	document.getElementById("chat" + (CHAT_SIZE-1)).innerHTML = msg;
}
function talk() {
	event.preventDefault();
	phrase = document.getElementById("message").value.trim();
	if (phrase == "") {
		window.alert("Whitespace entered.");
		return;
	}
	addMessage("You: " + phrase);
	if (!phrase_list.includes(phrase)) {
		phrase_list.push(phrase);
	}
	addMessage("ChimBot: " + phrase_list[randInt(0, phrase_list.length-1)]);
}
let phrase_list = ["Hello", "How are you?"];