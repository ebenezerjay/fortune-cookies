class Fortune {
	constructor(id,fortune,favorite) {
		this.id = id;
		this.fortune = fortune;
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

}