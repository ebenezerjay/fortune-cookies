class Fortune {
	constructor(id,fortuneText,favorite) {
		this.id = id;
		this.fortuneText = fortuneText;
		this.favorite = favorite || false;
	}
	
	// adds object data to local storage
	saveToStorage(fortuneArray) {
		localStorage.setItem('fortune-array', JSON.stringify(fortuneArray));
	}

	// deletes the fortune from local storage
	deleteFromStorage(index) {
		fortuneArray.splice(index, 1);
		this.saveToStorage(fortuneArray);
	}

	// changes the status of favorite inside the fortune object
	changeCheckmarkIcon() {
		this.favorite = !this.favorite;
		this.saveToStorage(fortuneArray);
	}

	// changes the fortune when user edits the text
	updateFortune(fortune,editedFortune) {
			fortune.fortuneText = editedFortune;
			this.saveToStorage(fortuneArray);
	}

}