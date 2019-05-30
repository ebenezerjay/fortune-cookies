// global variables
var fortuneInput = document.querySelector('#fortune-input');
var searchInput = document.querySelector('#search-input');
var enterButton = document.querySelector('#enter-button');
var appendSection = document.querySelector('#ol-list-append');
var fortuneLabel = document.querySelector('#img-label');


var fortuneArray = JSON.parse(localStorage.getItem('fortune-array')) || [];

// event listeners
fortuneInput.addEventListener('input', disableEnter);
enterButton.addEventListener('click', onEnter);
appendSection.addEventListener('click', deleteFortune);
appendSection.addEventListener('click', changeCheckMark);
window.addEventListener('load',onPageLoad);
searchInput.addEventListener('keyup', function(e) {
	if (searchInput.value) {
		appendSection.innerHTML = '';
    searchFortunes(searchInput.value);
  } else if (!searchInput.value) {
    appendSection.innerHTML = '';
    loadPreviousFortunes(fortuneArray);
	}
	e.preventDefault();
});

// runs functions on page load 
function onPageLoad() {
	loadPreviousFortunes(fortuneArray);
}

// persists object data on page load
function loadPreviousFortunes(oldFortunes) {
	fortuneArray = [];
  for (var i = 0; i < oldFortunes.length; i++) {
		var newFortune = new Fortune(oldFortunes[i].id, oldFortunes[i].fortune, oldFortunes[i].favorite);
		fortuneArray.push(newFortune);
		appendFortune(fortuneArray[i].id, fortuneArray[i].fortune, fortuneArray[i].favorite);
		loadFav(fortuneArray[i].favorite);
	}
}

// disables enter button when input field is empty
function disableEnter() {
	if (fortuneInput.value != '') {
		enterButton.disabled = false;
	}
}

// fires these functions when enter button is clicked
function onEnter() {
	createFortuneObject();
}

// creates the Fortune object that is saved into local storage
function createFortuneObject() {
	var fortuneId = Math.floor(Date.now());
	var fortuneString = fortuneInput.value;
	var newFortune = new Fortune(fortuneId,fortuneString);
	appendFortune(fortuneId,fortuneString);
	fortuneArray.push(newFortune);
	newFortune.saveToStorage(fortuneArray);
	fortuneInput.value = '';
	disableEnter();
}

// appends the inputed fortune to the dom
function appendFortune(id,fortune,favorite) {
	appendOntoImg();
	appendSection.innerHTML = `
		<div class="article-appended-fortune flex" id="article-appended-fortune" data-id="${id}">
			<li class="appended-li" id="appended-li-item" data-id="${id}">
				<h3 id="appended-fortune" data-id="${id}" contenteditable="true">${fortune}</h3>
				<div class="list-buttons flex">
					<button type="button" class="delete-button" id="delete-button" data-id="${id}">X</button>
					<img src="images/unFilledCheck.png" id="checkmark-image" class="checkmark-image" data-fav="${favorite}">
				</div>
			</li>
		</div>
	` + appendSection.innerHTML;
}

function loadFav(fav) {
	var checkmark = document.querySelector('#checkmark-image');
	for (var i = 0; i < fortuneArray.length; i++) {
		var fav = fortuneArray[i].favorite;
	}
	if (fav === true) {
		checkmark.setAttribute('src', 'images/filledCheck.png');
	} else {
		checkmark.setAttribute('src', 'images/unFilledCheck.png');
	}
}

// inserts text over the fortune image
function appendOntoImg() {
	fortuneLabel.innerText = fortuneInput.value;
}

// deletes fortune from dom and local storage
function deleteFortune(e) {
	if (e.target.classList.contains('delete-button')) {
		var articleId = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
		var targetFortune = fortuneArray.find(function(fortune) {
			return fortune.id === articleId;
		});
		var fortuneIndex = fortuneArray.indexOf(targetFortune);
		e.target.parentElement.parentElement.parentElement.remove();
		targetFortune.deleteFromStorage(fortuneIndex);
		console.log(fortuneArray);
	}
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

// if checkmark icon is clicked it runs the changeAttribute function...
function changeCheckMark(e) {
	if (e.target.classList.contains('checkmark-image')) {
		changeAttribute(e);
	} 
}

// changes the favorite attributes in local storage and the dom
function changeAttribute(e) {
	var checkmarkId = parseInt(e.target.parentElement.parentElement.dataset.id);
	var targetFortune = fortuneArray.find(function(fortune) {
		return fortune.id === checkmarkId;
	});
	targetFortune.changeCheckmarkIcon();
	if (targetFortune.favorite === false) {
		e.target.setAttribute('src', 'images/unFilledCheck.png');
	} else if (targetFortune.favorite === true) {
		e.target.setAttribute('src', 'images/filledCheck.png');
	}
}
