class Fortune {
    constructor(id,fortune) {
        this.id = id;
        this.fortune = fortune;
    }

    saveToStorage(array) {
			localStorage.setItem('fortune-array', JSON.stringify(array));
		}

		deleteFromStorage(id) {
			var fortuneArray = this.pullFromStorage();
			fortuneArray.splice(this.getIndex(id), 1);
			this.saveToStorage(fortuneArray);
		}

		getIndex(id) {
			return this.pullFromStorage().findIndex(fortune => fortune.id === id);
		}
		
		pullFromStorage() {
			return JSON.parse(localStorage.getItem('fortune-array'));
		}

}