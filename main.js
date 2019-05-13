var fortuneInput = document.querySelector('#fortune-input');
var enterButton = document.querySelector('#enter-button');
var appendSection = document.querySelector('#article-append');

enterButton.addEventListener('click', onEnter);


function onEnter() {
    appendFortune();
}

function appendFortune() {
    appendSection.innerHTML = `
		<h3>${fortuneInput.value}</h3>
		` + appendSection.innerHTML;
		fortuneInput.value = '';
}