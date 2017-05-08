/**
 * This will clear the text on screen.
 */
function clearOutput() {
	document.getElementById("maintext")!!.innerHTML = "";
}

/**
 * This will output a text on screen.
 */

function outputText(text:string) {
	document.getElementById("maintext")!!.innerHTML += text;
}
