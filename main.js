// global variables
var fortuneInput = document.querySelector('#fortune-input');
var enterButton = document.querySelector('#enter-button');
var appendSection = document.querySelector('#article-append');
var fortuneLabel = document.querySelector('#img-label');

var fortuneArray = JSON.parse(localStorage.getItem('fortune-array')) || [];

// event listeners
enterButton.addEventListener('click', onEnter);
appendSection.addEventListener('click', deleteFortune);
window.addEventListener('load',loadPreviousFortunes(fortuneArray));

// fires these functions when enter button is clicked
function onEnter() {
	createFortuneObject();
}

// creates the Fortune object that is saved into local storage
function createFortuneObject() {
	var fortuneId = Math.floor(Date.now());
	var fortuneString = fortuneInput.value;

	appendFortune(fortuneId,fortuneString);
	var newFortune = new Fortune(fortuneId,fortuneString);
	fortuneArray.push(newFortune);
	newFortune.saveToStorage(fortuneArray);
	console.log(fortuneArray);
}

// appends the inputed fortune to the dom
function appendFortune(id,fortune) {
	// appendOntoImg();
	appendSection.innerHTML = `
		<div class="article-appended-fortune flex" id="article-appended-fortune">
			<h3 id="appended-fortune" data-id="${id}">${fortune}
			<button type="button" class="delete-button" id="delete-button">X</button>
			</h3>
		</div>
	` + appendSection.innerHTML;
	fortuneInput.value = '';
}

// function appendOntoImg() {
// 	fortuneLabel.innerText = fortuneInput.value;
// }

// persists object data on page load
function loadPreviousFortunes() {
    for (var i = 0; i < fortuneArray.length; i++) {
      appendFortune(fortuneArray[i].id, fortuneArray[i].fortune);
    }
}

// deletes fortune from dom and local storage
function deleteFortune(e) {
	var fortuneInstance = new Fortune();
	var articleId = e.target.parentElement.dataset.id;
	fortuneInstance.deleteFromStorage(parseInt(articleId));
	if (e.target.classList.contains('delete-button')) {
		e.target.parentElement.remove();
	}
	e.preventDefault();
}

