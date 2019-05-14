var fortuneInput = document.querySelector('#fortune-input');
var enterButton = document.querySelector('#enter-button');
var appendSection = document.querySelector('#article-append');

enterButton.addEventListener('click', onEnter);

var fortuneArray = JSON.parse(localStorage.getItem('fortune-array')) || [];
function onEnter() {
	createFortuneObject();
}

function createFortuneObject() {
	var fortuneId = Math.floor(Date.now());
	var fortuneString = fortuneInput.value;

	appendFortune(fortuneId,fortuneString);
	var newFortune = new Fortune(fortuneId,fortuneString);
	fortuneArray.push(newFortune);
	newFortune.saveToStorage(fortuneArray);
	console.log(fortuneArray);
}

function appendFortune(id,fortune) {
	appendSection.innerHTML = `
	<h3 id="appended-fortune" data-id="${id}">${fortune}</h3>
	` + appendSection.innerHTML;
	fortuneInput.value = '';
}