class Fortune {
    constructor(id,fortune) {
        this.id = id;
        this.fortune = fortune;
    }

    saveToStorage(array) {
			localStorage.setItem('fortune-array', JSON.stringify(array));
		}

}