export default class Module {
	constructor() {
		// All DOM selector / elements goes here

		this.placeholder = 'module enabled';
		this.manageEvents();
	}

	manageEvents() {
		// All Dom events goes here

		if (this.placeholder.length !== 0) {
			this.triggerFunction();
		}
	}

	triggerFunction() {
		console.log(this.placeholder);
	}
}
