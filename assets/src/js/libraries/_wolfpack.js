import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import TweenMax from 'gsap';

Scrollbar.use(OverscrollPlugin);

export default class Wolfpack {
	constructor() {
		this.wolfpackList = document.querySelectorAll('[data-wolfpack]');
		this.anchorElementList = document.querySelectorAll('a[href*="#"]');
		this.preloader = document.querySelector('[data-preloader]');
		this.headerList = document.querySelectorAll('[data-header-disappear]');
		this.formList = document.querySelectorAll('[data-form]');
		this.marqueeList = document.querySelectorAll('[data-marquee]');
		this.parallaxList = document.querySelectorAll('[data-parallax]');
		this.followMeContainerList = document.querySelectorAll('[data-follow-me-container]');
		this.stayList = document.querySelectorAll('[data-stay]');
		this.tadamList = document.querySelectorAll('[data-tadam]');
		this.sectionScrollList = document.querySelectorAll('[data-scroll-section]');
		this.animationSequenceContainerList = document.querySelectorAll('[data-animation-container]');
		this.backgroundColorList = document.querySelectorAll('[data-background]');
		this.separateLetterList = document.querySelectorAll('[data-letters]');
		this.separateWordList = document.querySelectorAll('[data-words]');
		this.oldx = 0;
		this.oldy = 0;
		this.scrollbar = '';
		this.manageEvents();
	}

	manageEvents() {
		window.scrollTo(0, 0);
		if (this.wolfpackList.length !== 0) {
			const wolfpackOptions = {
				speed: 0.2,
				damping: 0.07,
				continuousScrolling: false,
				plugins: {
					overscroll: true,
				},
			};
			this.scrollbar = Scrollbar.init(this.wolfpackList[0], wolfpackOptions);
			this.scrollbar.track.xAxis.element.remove();
			this.scrollbar.scrollIntoView(document.querySelector('[data-wolfpack-container]'));

			for (let h = 1; h < this.wolfpackList.length; h += 1) {
				const scrollbarSecondary = Scrollbar.init(this.wolfpackList[h], wolfpackOptions);
				scrollbarSecondary.track.xAxis.element.remove();
			}

			// SCROLL SECTIONS VARIABLES
			const sectionScrollList = this.sectionScrollList; // eslint-disable-line
			if (sectionScrollList.length !== 0) {
				sectionScrollList[0].style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
				sectionScrollList[0].style.opacity = '1';
				sectionScrollList[0].style.pointerEvents = 'all';
			}
			// PARALLAX VARIABLES
			const parallaxList = this.parallaxList; // eslint-disable-line
			const parallaxIsActivated = [];
			const parallaxScrollBlock = [];

			// STAY VARIABLES
			const stayList = this.stayList; // eslint-disable-line

			// BACKGROUND COLOR VARIABLES
			const backgroundColorList = this.backgroundColorList; // eslint-disable-line
			const scrollPositionBackground = [];
			const newcolorsBackground = [];
			const newcolorsText = [];
			for (let i = 0; i < backgroundColorList.length; i += 1) {
				const backgroundColor = backgroundColorList[i];
				newcolorsBackground.push(backgroundColor.getAttribute('data-background-color'));
				if (newcolorsBackground[i] === null || newcolorsBackground[i] === '') {
					newcolorsBackground[i].push('#FFFFFF');
				}
				newcolorsText.push(backgroundColor.getAttribute('data-text-color'));
				if (newcolorsText[i] === null || newcolorsText[i] === '') {
					newcolorsText.push('#000000');
				}
			}

			// HEADER DISAPPEAR VARIABLES
			const headerList = this.headerList; // eslint-disable-line
			const lastOffset = [];
			const direction = [];
			for (let i = 0; i < headerList.length; i += 1) {
				lastOffset.push(0);
				direction.push('');
			}

			// FOLLOW ME VARIABLES
			const followMeContainerList = this.followMeContainerList; // eslint-disable-line
			const followMeContainerOffsetTop = [];
			const followMeContainerStop = [];
			for (let i = 0; i < followMeContainerList.length; i += 1) {
				const followMeContainer = followMeContainerList[i];
				followMeContainerOffsetTop.push(followMeContainer.offsetTop);
				followMeContainerStop.push(followMeContainer.offsetHeight);
			}

			// ANIMATION SEQUENCE VARIABLES
			const animationSequenceContainerList = this.animationSequenceContainerList; // eslint-disable-line
			const animationSequenceOffsetTop = [];
			const animationSequenceHeight = [];
			for (let i = 0; i < animationSequenceContainerList.length; i += 1) {
				const animationSequence = animationSequenceContainerList[i];
				animationSequenceOffsetTop.push(animationSequence.offsetTop);
				animationSequenceHeight.push(animationSequence.offsetHeight);
			}

			// TADAM VARIABLES
			const tadamList = this.tadamList; // eslint-disable-line
			const isActivated = [];
			const scrollBlock = [];
			for (let i = 0; i < tadamList.length; i += 1) {
				scrollBlock.push(0);
				isActivated.push(false);
				if (tadamList[i].getAttribute('data-tadam-threshold') === '-1') {
					window.addEventListener('load', () => {
						setTimeout(() => {
							tadamList[i].classList.add(`${tadamList[i].classList[0]}--animate`);
						}, 100);
					});
				}
			}

			this.scrollbar.addListener(function scrollbarListener(status) {
				const offsetTop = status.offset.y;
				// SCROLL SECTIONS
				if (sectionScrollList.length !== 0) {
					this.scrollbar.contentEl.style.transform = 'translate3d(0px, 0px, 0px)';
					for (let i = 0; i < sectionScrollList.length; i += 1) {
						const scrollSection = sectionScrollList[i];
						const scrollSectionStyle = scrollSection.currentStyle || window.getComputedStyle(scrollSection);
						const sectionOffsetTop = parseFloat(scrollSection.getBoundingClientRect().top - parseFloat(scrollSectionStyle.marginTop) - parseFloat(scrollSectionStyle.marginBottom));
						const sectionOffsetBottom = parseFloat(sectionOffsetTop + parseFloat(scrollSection.offsetHeight) + parseFloat(scrollSectionStyle.marginTop) + parseFloat(scrollSectionStyle.marginBottom) - parseFloat(scrollSectionStyle.transform.split(',')[5]));
						if (offsetTop >= parseFloat(sectionOffsetTop - parseFloat(window.innerHeight * 1.5)) && offsetTop <= parseFloat(sectionOffsetBottom + parseFloat(window.innerHeight * 1.5))) {
							scrollSection.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -${offsetTop}, 0, 1)`;
							scrollSection.style.opacity = '1';
							scrollSection.style.pointerEvents = 'all';
						} else {
							scrollSection.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
							scrollSection.style.opacity = '0';
							scrollSection.style.pointerEvents = 'none';
						}
					}
				}
				// PARALLAX
				if (parallaxList.length !== 0) {
					for (let i = 0; i < parallaxList.length; i += 1) {
						const parallax = parallaxList[i];
						parallaxScrollBlock.push(0);
						parallaxIsActivated.push(false);
						let parallaxSpeed = parallax.getAttribute('data-parallax-speed');
						if (parallaxSpeed === null || parallaxSpeed === '') {
							parallaxSpeed = 6;
						}
						const scrollPositionGeneral = status.offset.y;

						if (this.scrollbar.isVisible(parallax)) {
							if (!parallaxIsActivated[i]) {
								parallaxIsActivated[i] = true;
								parallaxScrollBlock[i] = status.offset.y;
							}
							const parallaxTranslate = (scrollPositionGeneral - parallaxScrollBlock[i]) / parseFloat(parallaxSpeed);
							TweenMax.to(parallax, 0.5, {
								y: parallaxTranslate,
							});
						}
					}
				}
				// STAY
				if (stayList.length !== 0) {
					if (sectionScrollList.length === 0) {
						for (let i = 0; i < stayList.length; i += 1) {
							const thisStayElement = stayList[i];
							let stayTop = thisStayElement.getAttribute('data-stay-top');
							if (stayTop === null || stayTop === '') {
								stayTop = 0;
							}
							let stayBottom = parseFloat(window.innerHeight) - parseFloat(thisStayElement.offsetHeight) - parseFloat(thisStayElement.getAttribute('data-stay-bottom'));
							if (stayBottom === null || stayBottom === '' || Number.isNaN(stayBottom)) {
								stayBottom = 0;
							}
							let stayLeft = thisStayElement.getAttribute('data-stay-left');
							if (stayLeft === null || stayLeft === '') {
								stayLeft = 0;
							}
							let stayRight = parseFloat(window.innerWidth) - parseFloat(thisStayElement.offsetWidth) - parseFloat(thisStayElement.getAttribute('data-stay-right'));
							if (stayRight === null || stayRight === '' || Number.isNaN(stayRight)) {
								stayRight = 0;
							}
							const stayOffsetTop = parseFloat(status.offset.y) + parseFloat(stayTop) + parseFloat(stayBottom);
							const stayOffsetLeft = parseFloat(status.offset.x) + parseFloat(stayLeft) + parseFloat(stayRight);
							thisStayElement.style.position = 'absolute';
							TweenMax.to(thisStayElement, 0, {
								x: stayOffsetLeft,
								y: stayOffsetTop,
							});
						}
					}
				}
				// BACKGROUND COLOR
				if (backgroundColorList.length !== 0) {
					for (let i = 0; i < backgroundColorList.length; i += 1) {
						const backgroundClass = backgroundColorList[i].classList[0];
						scrollPositionBackground.push(backgroundColorList[i].offsetTop - window.innerHeight);
						if (direction[0] === 'down') {
							if (parseFloat(offsetTop) > scrollPositionBackground[i]) {
								if (!backgroundColorList[i].classList.contains(`${backgroundClass}--background-animate`)) {
									backgroundColorList[i].classList.add(`${backgroundClass}--background-animate`);
									document.documentElement.style.setProperty('--backgroundcolor', newcolorsBackground[i]);
									document.documentElement.style.setProperty('--textcolor', newcolorsText[i]);
								}
							}
						} else if (parseFloat(offsetTop) < scrollPositionBackground[i]) {
							if (backgroundColorList[i - 1]) {
								if (backgroundColorList[i].classList.contains(`${backgroundClass}--background-animate`)) {
									backgroundColorList[i].classList.remove(`${backgroundClass}--background-animate`);
									document.documentElement.style.setProperty('--backgroundcolor', newcolorsBackground[i - 1]);
									document.documentElement.style.setProperty('--textcolor', newcolorsText[i - 1]);
								}
							}
						}
					}
				}
				// HEADER DISAPPEAR
				if (headerList.length !== 0) {
					for (let i = 0; i < headerList.length; i += 1) {
						const header = headerList[i];
						const headerClass = header.classList[0];
						let headerSmall = header.getAttribute('data-header-small');
						let headerHide = header.getAttribute('data-header-hide');
						if (headerSmall === null || headerSmall === '') {
							headerSmall = 100;
						}
						if (headerHide === null || headerHide === '') {
							headerHide = 300;
						}
						if (status.offset.y < lastOffset[i]) {
							lastOffset[i] = status.offset.y;
							direction[i] = 'up';
						} else {
							lastOffset[i] = status.offset.y;
							direction[i] = 'down';
						}
						if (status.offset.y >= headerSmall) {
							header.classList.add(`${headerClass}--small`);
						} else {
							header.classList.remove(`${headerClass}--small`);
						}
						if (status.offset.y >= headerHide) {
							if (direction[i] === 'down') {
								header.classList.add(`${headerClass}--hide`);
							} else {
								header.classList.remove(`${headerClass}--hide`);
							}
						}
					}
				}
				// FOLLOW ME
				if (followMeContainerList.length !== 0) {
					for (let i = 0; i < followMeContainerList.length; i += 1) {
						const followMeContainer = followMeContainerList[i];
						const followMeList = followMeContainer.querySelectorAll('[data-follow-me]');
						for (let j = 0; j < followMeList.length; j += 1) {
							const followMe = followMeList[j];
							const followMeEase = parseFloat(followMe.getAttribute('data-follow-me-ease'));
							if (parseFloat(offsetTop) >= parseFloat(followMeContainerOffsetTop[i] + followMe.offsetTop) && parseFloat(offsetTop) < parseFloat(followMeContainerOffsetTop[i] + followMeContainerStop[i] - followMe.offsetHeight)) {
								if (followMe.getAttribute('data-follow-me-ease') === '' || followMe.getAttribute('data-follow-me-ease') === null) {
									TweenMax.to(followMe, 0.15, {
										y: parseFloat(offsetTop) - parseFloat(followMeContainerOffsetTop[i] + followMe.offsetTop),
									});
								} else {
									TweenMax.to(followMe, followMeEase, {
										y: parseFloat(offsetTop) - parseFloat(followMeContainerOffsetTop[i] + followMe.offsetTop),
									});
								}
								followMe.style.position = 'absolute';
							}
						}
					}
				}
				// ANIMATION SEQUENCE
				if (animationSequenceContainerList.length !== 0) {
					for (let i = 0; i < animationSequenceContainerList.length; i += 1) {
						const animationSequenceContainer = animationSequenceContainerList[i];
						const animationSequenceList = animationSequenceContainer.querySelectorAll('[data-animation]');
						for (let j = 0; j < animationSequenceList.length; j += 1) {
							const animationSequence = animationSequenceList[j];
							const animationSequenceName = animationSequence.getAttribute('data-animation-name');
							const windowHeight = document.querySelector('[data-wolfpack]').offsetHeight;
							if (animationSequenceName === '' || animationSequenceName === null) {
								animationSequence.style.animation = `animation-sequence 1s linear`;
							} else {
								animationSequence.style.animation = `animation-${animationSequenceName} 1s linear`;
							}
							animationSequence.style.animationDelay = `calc(var(--scroll-${i + j}) * -1s)`;
							animationSequence.style.animationPlayState = 'paused';
							animationSequence.style.animationIterationCount = '1';
							animationSequence.style.animationFillMode = 'both';
							if (parseFloat(offsetTop) >= parseFloat(animationSequenceOffsetTop[i] + animationSequence.offsetTop - windowHeight) && parseFloat(offsetTop) < parseFloat(animationSequenceOffsetTop[i] + animationSequence.offsetTop + animationSequence.offsetHeight)) {
								animationSequence.style.setProperty(`--scroll-${i + j}`, parseFloat(offsetTop - animationSequenceOffsetTop[i] - animationSequence.offsetTop + windowHeight) / parseFloat(windowHeight));
							}
						}
					}
				}
				// TADAM
				if (tadamList.length !== 0) {
					for (let i = 0; i < tadamList.length; i += 1) {
						const threshold = tadamList[i].getAttribute('data-tadam-threshold');
						const thresholdMobile = tadamList[i].getAttribute('data-tadam-threshold-mobile');
						if (threshold !== '-1') {
							let tadamOffset = 0;
							let tadamOffsetMobile = 0;
							if (threshold === null || threshold === '') {
								tadamOffset = 300;
							} else {
								tadamOffset = threshold;
							}
							if (thresholdMobile === null || thresholdMobile === '') {
								tadamOffsetMobile = 100;
							} else {
								tadamOffsetMobile = thresholdMobile;
							}
							if (this.scrollbar.isVisible(tadamList[i])) {
								if (!isActivated[i]) {
									isActivated[i] = true;
									if (window.innerWidth >= 1024) {
										scrollBlock[i] = parseFloat(status.offset.y) + parseFloat(tadamOffset);
									} else {
										scrollBlock[i] = parseFloat(status.offset.y) + parseFloat(tadamOffsetMobile);
									}
								}
								if (tadamList[i].getAttribute('data-tadam-repeat') === null && parseFloat(status.offset.y) > scrollBlock[i]) {
									Wolfpack.showTadam(tadamList[i]);
								} else if (parseFloat(status.offset.y) > scrollBlock[i]) {
									Wolfpack.showTadam(tadamList[i]);
								} else if (tadamList[i].getAttribute('data-tadam-repeat') !== null) {
									Wolfpack.hideTadam(tadamList[i]);
								}
							}
						}
					}
				}
			});

			// ANCHORS
			if (this.anchorElementList.length !== 0) {
				window.addEventListener('resize', Wolfpack.anchors(this.anchorElementList, this.scrollbar));
				setTimeout(() => {
					this.scrollbar.scrollIntoView(document.querySelector('[data-wolfpack-container]'));
					Wolfpack.anchors(this.anchorElementList, this.scrollbar);
				}, 100);
			}

			// PRELOADER
			if (this.preloader) {
				let preloaderDelay = this.preloader.getAttribute('data-preloader-delay');
				const preloaderClass = this.preloader.classList[0];
				const links = document.querySelectorAll('a');
				if (preloaderDelay === null || preloaderDelay === '') {
					preloaderDelay = 300;
				}
				window.addEventListener('load', () => {
					setTimeout(() => {
						Wolfpack.showPreloader(this.preloader, preloaderClass, preloaderDelay);
					}, preloaderDelay);
				});
				for (let i = 0; i < links.length; i += 1) {
					const link = links[i];
					if (!link.getAttribute('href').includes('#')) {
						if (link.getAttribute('target') !== '_blank') {
							link.addEventListener('click', (event) => {
								const destination = link.href;
								event.preventDefault();
								Wolfpack.closePreloader(this.preloader, preloaderClass);
								setTimeout(() => {
									window.location = destination;
								}, preloaderDelay);
							});
						}
					}
				}
			}

			// FORM LABELS
			if (this.formList.length !== 0) {
				for (let i = 0; i < this.formList.length; i += 1) {
					const form = this.formList[i];
					const formInputs = form.querySelectorAll('.gfield');
					for (let j = 0; j < formInputs.length; j += 1) {
						const formInput = formInputs[j];
						const formInputClass = formInput.classList[0];
						setTimeout(() => {
							const formInputSpans = formInput.querySelectorAll('.ginput_container span');
							for (let k = 0; k < formInputSpans.length; k += 1) {
								const formInputSpan = formInputSpans[k];
								formInputSpan.classList.add('spanDisplay');
							}
						}, 100);
						formInput.addEventListener('focusin', () => {
							formInput.classList.add(`${formInputClass}--focus`);
						});
						formInput.addEventListener('focusout', () => {
							if (formInput.querySelector('.ginput_container').classList.contains('ginput_complex')) {
								if (formInput.querySelector('input').value === '' || formInput.querySelector('input').value === null) {
									formInput.classList.remove(`${formInputClass}--focus`);
								}
							} else if (formInput.querySelector('.ginput_container').classList.contains('ginput_container_textarea')) {
								if (formInput.querySelector('textarea').value === '' || formInput.querySelector('textarea').value === null) {
									formInput.classList.remove(`${formInputClass}--focus`);
								}
							} else if (formInput.querySelector('.ginput_container').classList.contains('ginput_container_select')) {
								if (formInput.querySelector('select').value === '' || formInput.querySelector('select').value === null) {
									formInput.classList.remove(`${formInputClass}--focus`);
								}
							} else if (formInput.querySelector('input').value === '' || formInput.querySelector('input').value === null) {
								formInput.classList.remove(`${formInputClass}--focus`);
							}
						});
					}
				}
			}

			// MARQUEE
			if (this.marqueeList.length !== 0) {
				for (let i = 0; i < this.marqueeList.length; i += 1) {
					const marquee = this.marqueeList[i];
					let marqueeSpeed = marquee.getAttribute('data-marquee-speed');
					if (marqueeSpeed === null || marqueeSpeed === '') {
						marqueeSpeed = 20;
					}
					const marqueeClass = marquee.classList[0];
					const marqueeHTML = marquee.innerHTML;
					const marqueeNewHTML = `<div class="${marqueeClass}--marquee" data-marquee-container><div class="${marqueeClass}--marquee-content" data-marquee-content style="animation-duration:${marqueeSpeed}s"><p>${marqueeHTML}</p><p>${marqueeHTML}</p><p>${marqueeHTML}</p><p>${marqueeHTML}</p><p>${marqueeHTML}</p></div></div>`;
					marquee.innerHTML = marqueeNewHTML;
					marquee.style.width = '100%';
				}
				const marqueeContainers = document.querySelectorAll('[data-marquee-container]');
				for (let i = 0; i < marqueeContainers.length; i += 1) {
					const thisMarqueeContainer = marqueeContainers[i];
					const marqueeContainerHTML = thisMarqueeContainer.innerHTML;
					thisMarqueeContainer.innerHTML = marqueeContainerHTML + marqueeContainerHTML;
				}
			}

			// SEPARATE CHARACTERS
			if (this.separateLetterList.length !== 0) {
				Wolfpack.separateLetters(this.separateLetterList);
			}

			// SEPARATE WORDS
			if (this.separateWordList.length !== 0) {
				Wolfpack.separateWords(this.separateWordList);
			}

			// CURSOR
			const offsetCursorTop = 0;
			const cursorPointers = document.querySelectorAll('[data-cursor-pointer]');
			const cursor = document.querySelector('[data-cursor-container]');
			let timer;
			document.addEventListener('mousemove', (e) => {
				Wolfpack.moveCursor(e, cursor, cursorPointers, offsetCursorTop);
				clearTimeout(timer);
				timer = setTimeout(Wolfpack.mouseStopped(cursor, cursorPointers), 100);
			});
			const cursorElements = document.querySelectorAll('[data-cursor]');
			if (cursorElements.length > 0) {
				for (let i = 0; i < cursorElements.length; i += 1) {
					const thisCursorElement = cursorElements[i];
					const thisCursorClass = cursor.classList[0];
					const thisCursorAttribute = thisCursorElement.getAttribute('data-cursor-class');
					if (thisCursorAttribute === null || thisCursorAttribute === '') {
						thisCursorElement.addEventListener('mouseover', () => {
							if (!cursor.classList.contains('animate')) {
								cursor.classList.add(`${thisCursorClass}--animate`);
							}
						});
						thisCursorElement.addEventListener('mouseleave', () => {
							cursor.classList.remove(`${thisCursorClass}--animate`);
						});
					} else {
						thisCursorElement.addEventListener('mouseover', () => {
							if (!cursor.classList.contains(thisCursorAttribute)) {
								cursor.classList.add(`${thisCursorClass}--${thisCursorAttribute}`);
							}
						});
						thisCursorElement.addEventListener('mouseleave', () => {
							cursor.classList.remove(`${thisCursorClass}--${thisCursorAttribute}`);
						});
					}
				}
			}
		}
	}

	static anchors(anchors, scrollbar) {
		if (window.location.hash) {
			setTimeout(() => {
				window.scrollTo(0, 0);
				this.scrollbar.scrollIntoView(document.querySelector(window.location.hash));
				return false;
			}, 1);
		}
		for (let i = 0; i < anchors.length; i += 1) {
			if (anchors[i].pathname === window.location.pathname) {
				anchors[i].onclick = (event) => {
					event.preventDefault();
					this.scrollbar.scrollIntoView(document.querySelector(anchors[i].getAttribute('href').replace('/', '')));
					return false;
				};
			}
		}
	}

	static showPreloader(preloader, preloaderClass, preloaderDelay) {
		preloader.classList.add(`${preloaderClass}--closed`);
		const newDelay = preloaderDelay + 100;
		setTimeout(() => {
			preloader.style.display = 'none';
		}, newDelay);
	}

	static closePreloader(preloader, preloaderClass) {
		preloader.style.display = 'flex';
		setTimeout(() => {
			preloader.classList.remove(`${preloaderClass}--closed`);
		}, 10);
	}

	static tadam(tadam, threshold, thresholdMobile, scrollbar) {
		let scrollBlock = 0;
		const tadamClass = tadam.classList[0];
		if (threshold === '-1') {
			tadam.classList.add(`${tadamClass}--animate`);
		} else {
			let tadamActivated = false;
			this.scrollbar.addListener(function scrollbarListener(status) {
				let tadamOffset = 0;
				let tadamOffsetMobile = 0;
				if (threshold === null || threshold === '') {
					tadamOffset = 300;
				} else {
					tadamOffset = threshold;
				}
				if (thresholdMobile === null || thresholdMobile === '') {
					tadamOffsetMobile = 100;
				} else {
					tadamOffsetMobile = thresholdMobile;
				}
				if (this.scrollbar.isVisible(tadam)) {
					if (!tadamActivated) {
						tadamActivated = true;
						if (window.innerWidth >= 1024) {
							scrollBlock = parseFloat(status.offset.y) + parseFloat(tadamOffset);
						} else {
							scrollBlock = parseFloat(status.offset.y) + parseFloat(tadamOffsetMobile);
						}
					}
					if (tadam.getAttribute('data-tadam-repeat') === null && parseFloat(status.offset.y) > scrollBlock) {
						tadam.classList.add(`${tadamClass}--animate`);
					} else if (parseFloat(status.offset.y) > scrollBlock) {
						tadam.classList.add(`${tadamClass}--animate`);
					} else {
						tadam.classList.remove(`${tadamClass}--animate`);
					}
				}
			});
		}
	}

	static separateLetters(separateLetters) {
		for (let i = 0; i < separateLetters.length; i += 1) {
			const separateCharacter = separateLetters[i];
			let lettersDelay = parseFloat(separateCharacter.getAttribute('data-letters-delay'));
			if (lettersDelay === null || lettersDelay === '' || Number.isNaN(lettersDelay)) {
				lettersDelay = 0.05;
			}
			let lettersDelayInitial = parseFloat(separateCharacter.getAttribute('data-letters-initial'));
			if (lettersDelayInitial === null || lettersDelayInitial === '' || Number.isNaN(lettersDelayInitial)) {
				lettersDelayInitial = 0;
			}
			const separateCharacterClass = separateCharacter.className;
			const separateCharacterHTML = separateCharacter.innerHTML;
			separateCharacter.innerHTML = '';
			const separateCharacterLines = separateCharacterHTML.split('<br>');
			for (let j = 0; j < separateCharacterLines.length; j += 1) {
				const separateCharacterLine = separateCharacterLines[j];
				const separateCharacterLetters = separateCharacterLine.split('');
				let separateCharacterLineContent = '';
				for (let k = 0; k < separateCharacterLetters.length; k += 1) {
					const separateCharacterLetter = separateCharacterLetters[k];
					if (separateCharacterLetter === ' ') {
						separateCharacterLineContent += `<span class="${separateCharacterClass}-space separate-character__space" style="transition-delay:${lettersDelayInitial}s">${separateCharacterLetter}</span>`;
					} else {
						separateCharacterLineContent += `<span class="${separateCharacterClass}-letter separate-character__letter" style="transition-delay:${lettersDelayInitial}s">${separateCharacterLetter}</span>`;
					}
					lettersDelayInitial += parseFloat(lettersDelay);
				}
				separateCharacter.innerHTML = `${separateCharacter.innerHTML}<div class="${separateCharacterClass}-line separate-character__line">${separateCharacterLineContent}</div>`;
			}
		}
	}

	static separateWords(separatesWords) {
		for (let i = 0; i < separatesWords.length; i += 1) {
			const separateWord = separatesWords[i];
			let wordsDelay = parseFloat(separateWord.getAttribute('data-words-delay'));
			if (wordsDelay === null || wordsDelay === '' || Number.isNaN(wordsDelay)) {
				wordsDelay = 0.05;
			}
			let wordsDelayInitial = parseFloat(separateWord.getAttribute('data-words-initial'));
			if (wordsDelayInitial === null || wordsDelayInitial === '' || Number.isNaN(wordsDelayInitial)) {
				wordsDelayInitial = 0;
			}
			const separateWordClass = separateWord.className;
			const separateWordHTML = separateWord.innerHTML;
			separateWord.innerHTML = '';
			const separateWordLines = separateWordHTML.split('<br>');
			for (let j = 0; j < separateWordLines.length; j += 1) {
				const separateWordLine = separateWordLines[j];
				const separateWordWords = separateWordLine.split(' ');
				let separateWordLineContent = '';
				for (let k = 0; k < separateWordWords.length; k += 1) {
					const separateWordWord = separateWordWords[k];
					if (k < separateWordWords.length - 1) {
						separateWordLineContent += `<span class="${separateWordClass}-word separate-word__word" style="transition-delay: ${wordsDelayInitial}s">${separateWordWord}</span><span class="${separateWordClass}-space separate-word__space"> </span>`;
					} else {
						separateWordLineContent += `<span class="${separateWordClass}-word separate-word__word" style="transition-delay: ${wordsDelayInitial}s">${separateWordWord}</span>`;
					}
					wordsDelayInitial += parseFloat(wordsDelay);
				}
				separateWord.innerHTML = `${separateWord.innerHTML}<div class="${separateWordClass}-line separate-word__line">${separateWordLineContent}</div>`;
			}
		}
	}

	static mouseStopped(cursor, cursorPointers) {
		cursor.classList.remove('moving');
		for (let i = 0; i < cursorPointers.length; i += 1) {
			const thisCursorPointer = cursorPointers[i];
			if (thisCursorPointer.classList.contains('cursor__image')) {
				TweenMax.to(thisCursorPointer, 0.5, {
					rotation: 0,
				});
			}
		}
	}

	static moveCursor(e, cursor, cursorPointers, offsetCursorTop) {
		cursor.classList.add('moving');
		for (let i = 0; i < cursorPointers.length; i += 1) {
			const thisCursorPointer = cursorPointers[i];
			const thisCursorPointerHeight = thisCursorPointer.offsetHeight;
			const thisCursorPointerWidth = thisCursorPointer.offsetWidth;
			if (thisCursorPointer.classList.contains('cursor__ball--big')) {
				TweenMax.to(thisCursorPointer, 0.5, {
					x: e.clientX - parseFloat(thisCursorPointerHeight / 2),
					y: e.clientY - parseFloat(thisCursorPointerWidth / 2) + offsetCursorTop,
				});
			} else if (thisCursorPointer.classList.contains('cursor__image')) {
				if (e.clientX > this.oldx) {
					TweenMax.to(thisCursorPointer, 0.5, {
						x: e.clientX - parseFloat(thisCursorPointerHeight / 2),
						y: e.clientY - parseFloat(thisCursorPointerWidth / 2) + offsetCursorTop,
						rotation: e.clientX / 100,
					});
				} else if (e.clientX < this.oldx) {
					TweenMax.to(thisCursorPointer, 0.5, {
						x: e.clientX - parseFloat(thisCursorPointerHeight / 2),
						y: e.clientY - parseFloat(thisCursorPointerWidth / 2) + offsetCursorTop,
						rotation: -e.clientX / 100,
					});
				}
				this.oldx = e.clientX;
				this.oldy = e.clientY;
			} else {
				TweenMax.to(thisCursorPointer, 0.1, {
					x: e.clientX - parseFloat(thisCursorPointerHeight / 2),
					y: e.clientY - parseFloat(thisCursorPointerWidth / 2) + offsetCursorTop,
				});
			}
		}
	}

	static showTadam(tadam) {
		const tadamClass = tadam.classList[0];
		tadam.classList.add(`${tadamClass}--animate`);
	}

	static hideTadam(tadam) {
		const tadamClass = tadam.classList[0];
		tadam.classList.remove(`${tadamClass}--animate`);
	}
}
