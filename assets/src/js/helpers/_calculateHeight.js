export default class CalculateHeight {
	constructor() {
		this.elemCalcMobile = document.querySelectorAll('[data-calc-mobile]');
		this.manageEvents();
	}

	manageEvents() {
		const domBody = document.querySelector('body');
		const scrollContainer = document.querySelector('[data-wolfpack]');
		// Calculate True 100vh for Mobile on selected element
		if (this.elemCalcMobile.length > 0) {
			for (let i = 0; i < this.elemCalcMobile.length; i += 1) {
				this.setHeight(this.elemCalcMobile[i]);
			}
		}
		window.addEventListener('resize', () => {
			domBody.style.height = `${window.innerHeight}px`;
			scrollContainer.style.height = `${window.innerHeight}px`;
			for (let i = 0; i < this.elemCalcMobile.length; i += 1) {
				this.setHeight(this.elemCalcMobile[i]);
			}
		});
	}

	// Calculate True 100vh for Mobile on selected element
	setHeight(element) {
		const windowH = window.innerHeight;
		this.element = element;
		this.element.style.height = `${windowH}px`;
	}
}
