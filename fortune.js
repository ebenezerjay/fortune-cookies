class Fortune {
    constructor(id,fortune,favorite) {
        this.id = id;
				this.fortune = fortune;
				this.favorite = favorite || false;
				console.log(this.favorite);
    }

    saveToStorage(array) {
			localStorage.setItem('fortune-array', JSON.stringify(array));
		}

		deleteFromStorage(id) {
			var fortuneArray = this.pullFromStorage();
			fortuneArray.splice(this.getIndex(id), 1);
			this.saveToStorage(fortuneArray);
		}

		changeCheckmarkIcon(favorite) {
			this.favorite = !this.favorite;
			this.saveToStorage(favorite);
			console.log(this.favorite);
		}

		getIndex(id) {
			return this.pullFromStorage().findIndex(fortune => fortune.id === id);
		}
		
		pullFromStorage() {
			return JSON.parse(localStorage.getItem('fortune-array'));
		}

}