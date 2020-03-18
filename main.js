// global variables
const fortuneInput = document.querySelector('#fortune-input');
const userName = document.querySelector('#user-name-id');
// const searchInput = document.querySelector('#search-input-id');
const enterButton = $('#enter-button');
const aboutButton = $('#li-about-id');
const showContactForm = $('#li-contact-id');
const contactButton = $('#contact-form-btn-id');
// const appendSection = document.querySelector('#ol-list-append');
const fortuneLabel = document.querySelector('#img-text-id');
// const fortuneTable = $("#fortune-table");
const app = angular.module('fortuneApp', []);
const contactApp = angular.module('fortuneApp');
const submitApp = angular.module('fortuneApp');

// const contactModule = angular.module('fortuneApp', []);


// var fortuneArray = JSON.parse(localStorage.getItem('fortune-array')) || [];

// event listeners
aboutButton.on('click', showAbout);
showContactForm.on('click', showContact);

// enterButton.addEventListener('click', function() {
// 	createFortuneObject();
// });
// appendSection.addEventListener('click', deleteFortune);
// appendSection.addEventListener('click', changeCheckMark);
// appendSection.addEventListener('input', editFortune);
// window.addEventListener('load',onPageLoad);

// searchInput.addEventListener('keyup', function(e) {
// 	if (13 == e.keyCode || searchInput.value) {
// 		appendSection.innerHTML = '';
//     searchFortunes(searchInput.value);
//   } else if (!searchInput.value) {
//     appendSection.innerHTML = '';
//     loadPreviousFortunes(fortuneArray);
// 	}
// 	e.preventDefault();
// });

// runs functions on page load 
function onPageLoad() {
	// loadPreviousFortunes(fortuneArray);
	// hideFortunes();
}

// persists object data on page load and limits 4 fortunes to the page
// function loadPreviousFortunes(oldFortunes) {
// 	fortuneArray = [];
// 		for (var i = 0; i < oldFortunes.length; i++) {
// 			var newFortune = new Fortune(oldFortunes[i].id, oldFortunes[i].fortuneText, oldFortunes[i].favorite);
// 			fortuneArray.push(newFortune);
// 			appendFortune(fortuneArray[i].id, fortuneArray[i].fortuneText, fortuneArray[i].favorite);
// 			loadFav(fortuneArray[i].favorite);
// 		}
// }

// Angular code for sending ajax call on page load
app.controller('fortuneTableCtrl', ['$scope', '$http', function($scope, $http) {
 $http({
  method: 'post',
  url: 'fortunes.php'
 }).then(function successCallback(response) {
  // Store response data
  $scope.allFortunes = response.data;
 });
//  $scope.orderByMe = function(x) {
// 	$scope.myOrderBy = x;
// }
}]);

// Angular code for sending contact info without leaving page
contactApp.controller('contactFormCtrl', function($scope,$http) {
	let url = 'contact.php';
	$http.post(url).then(function(response) {
		$scope.contactResponseTxt = response.data;
	});
});

// contactApp.controller('contactFormCtrl', ['$scope','$http', function($scope,$http) {
// 	$scope.contactApp = function() {
// 		$http({
// 			method: 'post',
// 			url: 'fortunes.php'
// 		}).then(function successCallback(response) {
// 			$scope.responseTxt = "Your feedback/comment has been submitted. Thank you!";
// 			$scope.contactBtn = function() {
// 				$scope.contactResponseTxt = response.responseTxt;
// 			}
// 		});
// 	}
// }]);

// Angular code for submitting fortune without leaving page
	submitApp.controller('submitFortuneCtrl', function($scope, $http) {
		$http.get('submitFortune.php').then(function() {
			$scope.fortuneResponseTxt = "Thanks for submitting! Check the table below to see your fortune in the database.";
		});
	 });

// inserts text over the fortune image
function appendOntoImg() {
	fortuneLabel.innerText = fortuneInput.value;
}

// shows page info when clicked
function showAbout() {
	let aboutParagraph = $('#about-paragraph-id');
	let featuresBtn = $('.features-span-btn');
	$(aboutParagraph).toggleClass('about-paragraph');
	featuresBtn.on('click', showFeaturesBtn);
}

// shows the upcoming page updates 
function showFeaturesBtn() {
	let aboutFutureFeatures = $('#about-future-features-ul-id');
	$(aboutFutureFeatures).toggleClass('about-future-features-ul');
}

// shows the contact form
function showContact() {
	let contactForm = $('#contact-form-container-id');
	$(contactForm).toggleClass('contact-form-container');
	$(contactForm).css('border', '1px solid black');
	$(contactForm).css('marginBottom', '15px');
}













// old code used for reference

// creates the Fortune object that is saved into local storage
// function createFortuneObject() {
// 	var fortuneId = Math.floor(Date.now());
// 	var fortuneString = fortuneInput.value;
// 	var newFortune = new Fortune(fortuneId,fortuneString);
// 	// appendFortune(fortuneId,fortuneString);
// 	fortuneArray.push(newFortune);
// 	newFortune.saveToStorage(fortuneArray);
// }

// appends the inputed fortune to the dom
// function appendFortune(id,fortune,favorite) {
// 	appendOntoImg();
// 	appendSection.innerHTML = `
// 		<div class="article-appended-fortune flex" id="article-appended-fortune" data-id="${id}">
// 			<li class="appended-li" id="appended-li-item" data-id="${id}">
// 				<h3 id="appended-fortune" data-id="${id}" contenteditable="true">${fortune}</h3>
// 				<div class="list-buttons flex">
// 					<button type="button" class="delete-button" id="delete-button" data-id="${id}">X</button>
// 					<img src="images/unFilledCheck.png" id="checkmark-image" class="checkmark-image" data-fav="${favorite}">
// 				</div>
// 			</li>
// 		</div>
// 	` + appendSection.innerHTML;
// }

// changes the fortune on the dom and in local storage
// function editFortune(e) {
// 	var parsedId = parseInt(e.target.parentElement.parentElement.getAttribute('data-id'));
// 	var editedText = e.target.innerText;
//   var targetFortune = fortuneArray.find(function(fortune) {
// 		return fortune.id === parsedId;
//   });
// 	targetFortune.updateFortune(targetFortune, editedText);
// }

// function loadFav(fav) {
// 	var checkmark = document.querySelector('#checkmark-image');
// 	for (var i = 0; i < fortuneArray.length; i++) {
// 		var fav = fortuneArray[i].favorite;
// 	}
// 	if (fav === true) {
// 		checkmark.setAttribute('src', 'images/filledCheck.png');
// 	} else {
// 		checkmark.setAttribute('src', 'images/unFilledCheck.png');
// 	}
// }

// deletes fortune from dom and local storage
// function deleteFortune(e) {
// 	if (e.target.classList.contains('delete-button')) {
// 		var newFortuneInstance = new Fortune();
// 		var articleId = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
// 		newFortuneInstance.deleteFromStorage(articleId);
// 		e.target.parentElement.parentElement.parentElement.remove();
// 	}
// }

// allows user to search fortunes in local storage and display on page
// function searchFortunes(searchText) {
// 	var fortuneInstance = new Fortune();
// 	var newFortuneArray = fortuneInstance.pullFromStorage();
// 	var fortuneFilter = newFortuneArray.filter(obj => obj.fortuneText.toUpperCase().indexOf(searchText.toUpperCase()) === 0);
// 	for (var i = fortuneFilter.length -1; i >= 0; i-- ) {
// 		appendFortune(fortuneFilter[i].id, fortuneFilter[i].fortuneText);
// 		}
// }

// if checkmark icon is clicked it runs the changeAttribute function...
// function changeCheckMark(e) {
// 	if (e.target.classList.contains('checkmark-image')) {
// 		changeAttribute(e);
// 	} 
// }

// changes the favorite attributes in local storage and the dom
// function changeAttribute(e) {
// 	var checkmarkId = parseInt(e.target.parentElement.parentElement.dataset.id);
// 	var targetFortune = fortuneArray.find(function(fortune) {
// 		return fortune.id === checkmarkId;
// 	});
// 	targetFortune.changeCheckmarkIcon();
// 	if (targetFortune.favorite === false) {
// 		e.target.setAttribute('src', 'images/unFilledCheck.png');
// 	} else if (targetFortune.favorite === true) {
// 		e.target.setAttribute('src', 'images/filledCheck.png');
// 	}
// }
