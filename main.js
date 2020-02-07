// global variables
const fortuneInput = document.querySelector('#fortune-input');
const searchInput = document.querySelector('#search-input-id');
const enterButton = $('#enter-button');
const appendSection = document.querySelector('#ol-list-append');
const fortuneLabel = document.querySelector('#img-text-id');


var fortuneArray = JSON.parse(localStorage.getItem('fortune-array')) || [];

// event listeners
fortuneInput.addEventListener('input', disableEnter);
$(enterButton).on('click', function() {
	sendAJAX();
});
appendSection.addEventListener('click', deleteFortune);
appendSection.addEventListener('click', changeCheckMark);
appendSection.addEventListener('input', editFortune);
window.addEventListener('load',onPageLoad);
searchInput.addEventListener('keyup', function(e) {
	if (13 == e.keyCode || searchInput.value) {
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
	// hideFortunes();
}

// persists object data on page load and limits 4 fortunes to the page
function loadPreviousFortunes(oldFortunes) {
	fortuneArray = [];
		for (var i = 0; i < oldFortunes.length; i++) {
			var newFortune = new Fortune(oldFortunes[i].id, oldFortunes[i].fortuneText, oldFortunes[i].favorite);
			fortuneArray.push(newFortune);
			appendFortune(fortuneArray[i].id, fortuneArray[i].fortuneText, fortuneArray[i].favorite);
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
// function onEnter(e) {
// 	sendAJAX();
// 	e.preventDefault();
// }

// send AJAX call to server
function sendAJAX() {
	$('form').submit(function(event) {
		console.log('check please');
		// get the form data
		var formData = {
			'user' : $('input[name=user]').val(),
			'fortuneText' : $('input[name=fortuneText]').val(),
		};
		$.ajax({
			type        : 'POST',
			url         : 'fortunes.php', 
			data        : formData, 
			dataType    : 'script', // what type of data do we expect back from the server
			encode      : true
		})
		.done(function(data) {
			// log data to the console so we can see
			console.log(data); 
			createFortuneObject();
			// here we will handle errors and validation messages
	});
	event.preventDefault();
	}
)};

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
	// hideFortunes();
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

// changes the fortune on the dom and in local storage
function editFortune(e) {
	var parsedId = parseInt(e.target.parentElement.parentElement.getAttribute('data-id'));
	var editedText = e.target.innerText;
  var targetFortune = fortuneArray.find(function(fortune) {
		return fortune.id === parsedId;
  });
	targetFortune.updateFortune(targetFortune, editedText);
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
		var newFortuneInstance = new Fortune();
		var articleId = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
		// var targetFortune = fortuneArray.find(function(fortune) {
		// 	return fortune.id === articleId;
		// });
		// var fortuneIndex = fortuneArray.indexOf(targetFortune);
		newFortuneInstance.deleteFromStorage(articleId);
		e.target.parentElement.parentElement.parentElement.remove();
		// targetFortune.deleteFromStorage(fortuneIndex);
	}
}

// allows user to search fortunes in local storage and display on page
function searchFortunes(searchText) {
	var fortuneInstance = new Fortune();
	var newFortuneArray = fortuneInstance.pullFromStorage();
	var fortuneFilter = newFortuneArray.filter(obj => obj.fortuneText.toUpperCase().indexOf(searchText.toUpperCase()) === 0);
	for (var i = fortuneFilter.length -1; i >= 0; i-- ) {
		appendFortune(fortuneFilter[i].id, fortuneFilter[i].fortuneText);
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
