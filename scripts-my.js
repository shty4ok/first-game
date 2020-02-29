var Game = (function (minTime, maxTime) {
	var self = this;
	var numberOfImage;
	var num;
	var numPrev;
	var timeout;
	var intervalId;
	var buttonPlaceRight;
	var buttonPlaceLeft;
	var imageBorderProcentShow = 30;
	var count = 0;
	var randProcNum;
	var clickCount;
	//var buttonLeftOrRight;


	//clear all images beside one image
	clearImage = function () {
		var clss = document.getElementsByClassName('img');
		for (var i = 0; i < clss.length; i++) {
			if (clss[i] != numberOfImage) {
				clss[i].style.display = "none";
			}
		}
	};

	//get random image 
	getRandomImage = function () {
		num = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
		while (num == numPrev) {
			num = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
		}
		var currentImg = 'img_' + num;
		numberOfImage = document.getElementById(currentImg);
		numberOfImage.style.display = "block";
		if (num % 2 != 0) {
			numberOfImage.style.float = "right";
		}
		console.log(currentImg);
		numPrev = num;
	};

	// func generate random number at 0 to 100 % in 33% show border by image
	genRandomBorderImage = function (imgBrdProcSh, minProc, maxProc) {
		randProcNum = Math.round(Math.random() * (maxProc - minProc) + minProc);
		if ((randProcNum > 0) && (randProcNum < imgBrdProcSh)) {
			if (num % 2 == 0) {
				numberOfImage.style.border = "15px solid red";
			} else {
				numberOfImage.style.border = "15px solid yellow";
			}
		}
	};

	clearBorder = function () {
		numberOfImage.style.border = "none";
	};

	viewButtonLandR = function () {
		buttonPlaceRight = document.getElementById('buttonClickRight');
		buttonPlaceLeft = document.getElementById('buttonClickLeft');
		buttonPlaceLeft.style.display = "block";
		buttonPlaceRight.style.display = "block";
	};

	checkResultBorder = function (numCount, imageBorderProcentShowBorder) {
		if ((randProcNum > 0) && (randProcNum < imageBorderProcentShowBorder)) {
			checkResult(numCount);
		}
	};

	checkResult = function (pointWin) {
		var countView = document.getElementById('counter');
		count = count + pointWin;
		countView.innerHTML = count;
	};

	checkResultPosition = function (btnLORPosition, imageBorderProcentShowBorder) {
		if ((randProcNum > imageBorderProcentShowBorder) && (randProcNum < 100)) {
			if (num % 2 != 0) {
				if (btnLORPosition % 2 != 0) {
					checkResult(1); // if true left-right without border
				} else {
					checkResult(-1); // if false left-right without border
				}
			} else {
				if (btnLORPosition % 2 != 0) {
					checkResult(-1); // if false left-right without border
				} else {
					checkResult(1); // if true left-right without border
				}
			}
		}
	};

	//change img, set count and set a new interval
	mainRunChangeImg = function (clickButtonChangeImg, buttonLeftOrRight) {
		checkResultPosition(buttonLeftOrRight, imageBorderProcentShow); //count++ and view result
		checkResultBorder(-4, imageBorderProcentShow);
		self.timeout = 0;
		getRandomImage();
		clearImage();
		clearBorder();
		genRandomBorderImage(imageBorderProcentShow, 0, 100); // imageBorderProcentShow - % show board, 0 and 100 = 0% - 100%
		highLightManIcons();
		clearInterval(self.intervalId);
		self.timeout = 1200;
		self.intervalId = setInterval(self.showImage, self.timeout);
		clickCount = 1;
	};
	//when click on the button change current image to another
	clickChange = function (buttonChangeImg, buttonLOrR) {
		buttonChangeImg.onclick = function () {
			mainRunChangeImg(buttonChangeImg, buttonLOrR);
		};
	};

	checkKeyCodeButton = function () {
		var left = 37;
		var right = 39;

		document.onkeydown = function (e) {
			if (e.keyCode == left) {
				mainRunChangeImg(buttonPlaceLeft, 0);
			} else if (e.keyCode == right) {
				mainRunChangeImg(buttonPlaceRight, 1);
			}
		};

		// repeat keydown (need to read about event.preventDefault(); and event.Event();)

		// document.addEventListener("keydown", function (event) {
		// 	
		// 	console.log(event.which);
		// 	if (event.which == left) {
		// 	mainRunChangeImg(buttonPlaceLeft, 0);
		// 	} else if (event.which == right) {
		// 		mainRunChangeImg(buttonPlaceRight, 1);
		// 	}
		// });
	};

	//highlight man icons
	highLightManIcons = function () {
		var fat = document.getElementById('fat');
		var normal = document.getElementById('normal');
		var strong = document.getElementById('strong');
	
		if (count > 0 && count <= 20) {
			fat.style.backgroundColor = "#4CAF50";
			normal.style.backgroundColor = "transparent";
			strong.style.backgroundColor = "transparent";
		} else if (count > 20 && count <= 50) {
			fat.style.backgroundColor = "transparent";
			normal.style.backgroundColor = "#4CAF50";
			strong.style.backgroundColor = "transparent";
		} else if (count > 50) {
			fat.style.backgroundColor = "transparent";
			normal.style.backgroundColor = "transparent";
			strong.style.backgroundColor = "#4CAF50";
		}
	};

	//check click buttons
	checkNotClickButtons = function(){
		if (clickCount == 0){
			checkResult(-1); 
		}
	};
	
	//initialize functions
	self.showImage = function () {
		clickCount = 0;
		getRandomImage();
		clearImage();
		clearBorder();
		viewButtonLandR();
		checkResultBorder(5, imageBorderProcentShow);
		clickChange(buttonPlaceLeft, 0);
		clickChange(buttonPlaceRight, 1);
		checkKeyCodeButton();
		checkNotClickButtons();
		genRandomBorderImage(imageBorderProcentShow, 0, 100); // imageBorderProcentShow - % show board, 0 and 100 = 0% - 100%
		highLightManIcons();
	};

	//button pause/resume
	pauseButton = function () {
		if (self.intervalId < 1) {
			self.intervalId = setInterval(self.showImage, self.timeout);
		} else {
			clearInterval(self.intervalId);
			self.intervalId = 0;
		}
	};
});

var gameRandom = new Game(1, 4); // create object
gameRandom.timeout = 1200;
gameRandom.intervalId = setInterval(gameRandom.showImage, gameRandom.timeout);