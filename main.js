// global variables
var fortuneInput = document.querySelector('#fortune-input');
var searchInput = document.querySelector('#search-input');
var enterButton = document.querySelector('#enter-button');
var appendSection = document.querySelector('#ol-list-append');
var checkmark = document.querySelector('#checkmark-image');
var fortuneLabel = document.querySelector('#img-label');
// var allListSection = document.querySelector('#all-section-list');
// var emailInput = document.querySelector('#email-input');
// var saveButton = document.querySelector('#save-button');
// var viewAllButton = document.querySelector('#view-all-button');

var fortuneArray = JSON.parse(localStorage.getItem('fortune-array')) || [];
console.log(fortuneArray);

// event listeners
fortuneInput.addEventListener('input', disableEnter);
// emailInput.addEventListener('input', disableEmailButtons);
enterButton.addEventListener('click', onEnter);
appendSection.addEventListener('click', deleteFortune);
appendSection.addEventListener('click', changeCheckMark);
window.addEventListener('load',loadPreviousFortunes(fortuneArray));
searchInput.addEventListener('keyup', function(e) {
	if (searchInput.value) {
		appendSection.innerHTML = '';
    searchFortunes(searchInput.value);
  } else if (!searchInput.value) {
    appendSection.innerHTML = '';
    loadPreviousFortunes();
	}
	e.preventDefault();
});

// disables enter button when input field is empty
function disableEnter() {
	if (fortuneInput.value != '') {
		enterButton.disabled = false;
	}
}

// disables save button when input field is empty
// function disableEmailButtons() {
// 	if (emailInput.value != '') {
// 		saveButton.disabled = false;
// 		viewAllButton.disabled = false;
// 	}
// }

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
	fortuneInput.value = '';
	disableEnter();
	// disableEmailButtons();
}

// appends the inputed fortune to the dom
function appendFortune(id,fortune) {
	appendOntoImg();
	appendSection.innerHTML = `
		<div class="article-appended-fortune flex" id="article-appended-fortune" data-id="${id}">
			<li class="appended-li" id="appended-li-item" data-id="${id}">
				<h3 id="appended-fortune" data-id="${id}" contenteditable="true">${fortune}</h3>
				<div class="list-buttons flex">
					<button type="button" class="delete-button" id="delete-button" data-id="${id}">X</button>
					<img src="images/unFilledCheck.png" id="checkmark-image" class="checkmark-image">
				</div>
			</li>
		</div>
	` + appendSection.innerHTML;
}

function appendOntoImg() {
	fortuneLabel.innerText = fortuneInput.value;
}

// persists object data on page load
function loadPreviousFortunes() {
    for (var i = 0; i < fortuneArray.length; i++) {
      appendFortune(fortuneArray[i].id, fortuneArray[i].fortune);
    }
}

// deletes fortune from dom and local storage
function deleteFortune(e) {
	if (e.target.classList.contains('delete-button')) {
		var fortuneInstance = new Fortune();
		var articleId = e.target.parentElement.parentElement.parentElement.dataset.id;
		fortuneInstance.deleteFromStorage(parseInt(articleId));
		e.target.parentElement.parentElement.parentElement.remove();
	}
	e.preventDefault();
}

// allows user to search fortunes in local storage and display on page
function searchFortunes(searchText) {
	var fortuneInstance = new Fortune();
	var newFortuneArray = fortuneInstance.pullFromStorage();
	var fortuneFilter = newFortuneArray.filter(obj => obj.fortune.toUpperCase().indexOf(searchText.toUpperCase()) === 0);
	for (var i = fortuneFilter.length -1; i >= 0; i-- ) {
		appendFortune(fortuneFilter[i].id, fortuneFilter[i].fortune);
		}
}

// changes the status of favorite in Fortune Class
function changeCheckMark(e) {
	var checkId = e.target.parentElement.parentElement.parentElement.dataset.id;
	console.log(checkId);
	// console.log(fortuneArray.favorite);
	if (e.target.classList.contains('checkmark-image') && fortuneArray.favorite === false) {
		e.target.setAttribute('src', 'images/filledCheck.png');
		var fortuneInstance = new Fortune();
		// var articleId = e.target.parentElement.parentElement.dataset.id;
		fortuneInstance.changeCheckmarkIcon(checkId);
	} else {
		e.target.setAttribute('src', 'images/unFilledCheck.png');
		var fortuneInstance = new Fortune();
		fortuneInstance.changeCheckmarkIcon(checkId);
	}
}

