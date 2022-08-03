/* eslint-disable */
import CalculateHeight from './helpers/_calculateHeight';
import Wolfpack from './libraries/_wolfpack';
import Canvas from './modules/_canvas';
const App = {
	/**
	 * App.init
	 */
	init() {
		// Utils Scripts
		const calculateHeight = new CalculateHeight();
		// Wolfpack Scripts
		const wolfpack = new Wolfpack();

		const canvas3D = new Canvas(wolfpack);
	},
};

document.addEventListener('DOMContentLoaded', () => {
	App.init();
});
