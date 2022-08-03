/* eslint-disable */

import * as THREE from 'three';
import * as dat from 'lil-gui';
import gsap from 'gsap';

export default class Canvas {
	constructor(wolfpackLib) {
		// All DOM selector / elements goes here
		this.wolfpack = wolfpackLib;
		this.manageEvents();
	}

	manageEvents() {
		// All Dom events goes here
		initThreejs(this.wolfpack);
	}
}

function initThreejs(wolfpackLib) {
	/**
	 * Debug
	 */
	const wolfpack = wolfpackLib;
	const gui = new dat.GUI();

	const parameters = {
		materialColor: '#ffeded',
	};

	gui.addColor(parameters, 'materialColor');
	gui.onChange(() => {
		material.color.set(parameters.materialColor);
		particlesMaterial.color.set(parameters.materialColor);
	});

	/**
	 * Base
	 */

	// Canvas
	const canvas = document.querySelector('[data-canvas]');
	console.log(canvas);

	// Scene
	const scene = new THREE.Scene();

	/**
	 *  Objects
	 */

	// Texture
	const textureLoader = new THREE.TextureLoader();
	const gradientTexture = textureLoader.load('/wp-content/themes/projet101/assets/src/img/3.jpg');
	gradientTexture.magFilter = THREE.NearestFilter;

	// Material
	const material = new THREE.MeshToonMaterial({color: parameters.materialColor, gradientMap: gradientTexture});

	// Meshes
	const objectsDistance = 4;
	const mesh1 = new THREE.Mesh(new THREE.TorusBufferGeometry(1, 0.4, 60, 60), material);
	const mesh2 = new THREE.Mesh(new THREE.ConeBufferGeometry(1, 2, 64), material);
	const mesh3 = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(0.8, 0.35, 100, 100), material);

	mesh1.position.y = -objectsDistance * 0;
	mesh2.position.y = -objectsDistance * 1;
	mesh3.position.y = -objectsDistance * 2;

	mesh1.position.x = 2;
	mesh2.position.x = -1;
	mesh3.position.x = 2;

	scene.add(mesh1, mesh2, mesh3);

	const sectionMeshes = [mesh1, mesh2, mesh3];

	/**
	 * Particles
	 */
	// Geometry

	const particlesCount = 200;
	const positions = new Float32Array(particlesCount * 3);

	for (let i = 0; i < particlesCount; i++) {
		positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
		positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
	}

	const particlesGeometry = new THREE.BufferGeometry();
	particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	// Material
	const particlesMaterial = new THREE.PointsMaterial({
		color: parameters.materialColor,
		sizeAttenuation: true,
		size: 0.03,
	});

	// Points
	const particles = new THREE.Points(particlesGeometry, particlesMaterial);
	scene.add(particles);

	/**
	 * Lights
	 */

	const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);

	/**
	 * Sizes
	 */
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	/**
	 * Camera
	 */

	// Group
	const cameraGroup = new THREE.Group();
	scene.add(cameraGroup);
	// Base camera
	const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
	camera.position.z = 6;
	cameraGroup.add(camera);

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
	});
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * SCROLL
	 */

	let scrollY = window.scrollY;
	let currentSection = 0;
	const scrollbar = wolfpack.scrollbar;
	console.log(scrollbar);
	scrollbar.addListener(function scrollbarListener(status) {
		const offsetTop = status.offset.y;
		scrollY = offsetTop;

		const newSection = Math.round(scrollY / sizes.height);
		if (newSection != currentSection) {
			currentSection = newSection;
			gsap.to(sectionMeshes[currentSection].rotation, {
				duration: 1.5,
				ease: 'power2.inOut',
				x: '+=1.6',
				y: '+=1.3',
				z: '+=1.5',
			});
		}
	});
	window.addEventListener('scroll', () => {
		console.log(window.scrollY);
		scrollY = window.scrollY;

		const newSection = Math.round(scrollY / sizes.height);
		if (newSection != currentSection) {
			currentSection = newSection;
			gsap.to(sectionMeshes[currentSection].rotation, {
				duration: 1.5,
				ease: 'power2.inOut',
				x: '+=1.6',
				y: '+=1.3',
				z: '+=1.5',
			});
		}
	});

	/**
	 * Cursor
	 */

	const cursor = {};
	cursor.x = 0;
	cursor.y = 0;

	window.addEventListener('mousemove', (event) => {
		cursor.x = event.clientX / sizes.width - 0.5;
		cursor.y = event.clientY / sizes.height - 0.5;
	});

	/**
	 * Animate
	 */
	const clock = new THREE.Clock();
	let previousTime = 0;

	const tick = () => {
		const elapsedTime = clock.getElapsedTime();
		const deltaTime = elapsedTime - previousTime;
		previousTime = elapsedTime;

		// Animate camera
		camera.position.y = (-scrollY / sizes.height) * 4;

		const parallaxX = cursor.x * 0.5;
		const parallaxY = -cursor.y * 0.5;
		cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 2 * deltaTime;
		cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 2 * deltaTime;

		// Animate Meshes
		for (const mesh of sectionMeshes) {
			mesh.rotation.x += deltaTime * 0.1;
			mesh.rotation.y += deltaTime * 0.15;
		}

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
}
