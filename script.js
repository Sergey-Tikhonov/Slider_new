
alert ('Практически неделю пытался придумать что-то своё. Но! Либо не работала инфа картинок, либо горизонтальные тайтлы. Расстроился... Решил переделать всё. И срисовал с вебинара Юлии Токаревской.')
alert('Это неудачный "дубль" https://sergey-tikhonov.github.io/slider')


let images = [{
    img: "images/assets/image-1.png",
    title: "Rostov-on-Don, Admiral",
	info: {
		city: "Rostov-on-Don LCD admiral",
		area: "81 m2",
		time: "3.5 months",
		cost: "Upon request"
	}
  }, {
    img: "images/assets/image-2.png",
    title: "Sochi Thieves",
	  info: {
		city: "Sochi Thieves",
		area: "105 m2",
		time: "4 months",
		cost: "Upon request"
	}
  }, {
    img: "images/assets/image-3.png",
    title: "Rostov-on-Don Patriotic",
	  info: {
		city: "Rostov-on-Don Patriotic",
		area: "93 m2",
		time: "3 months",
		cost: "Upon request"
	}
  }];

let sliderOptions = {
	dots: true,				
	titles: {				
		display: true,		
		number: 3			
	},
	autoplay: true,			
	autoplayInterval: 5000	
};

document.addEventListener("DOMContentLoaded", function() {
	initSlider(sliderOptions);
});

function initSlider(options) {
	
	if (!images || !images.length) {
		return;
	}

	options = options || {
		titles: {
			display: true,
			number: 3
		},
		dots: true,
		autoplay: false
	};
	
	const numOfTitles = options.titles.number;


	let sliderImages = document.querySelector(".slider__images"); 			
	let sliderImageInfo = document.querySelector(".slider__image-info");	
	let sliderArrows = document.querySelectorAll(".slider__arrow");			
	let sliderDots = document.querySelector(".slider__dots-ul");			
	let sliderTitles = document.querySelector(".slider__titles");			
	
	initImages();
	initArrows();

	if (options.dots) {
		initDots();
	}
	
	if (options.titles.display) {
		initTitles(options.titles.number);
	}

	if (options.autoplay) {
		initAutoplay();
	}

	function initImages() {
		images.forEach((image, index) => {
			let imageDiv = `<div class="slider__image-div n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].img});" data-index="${index}"></div>`;
			sliderImages.innerHTML += imageDiv;
			initImageInfo(index);
		});
	}

	function initImageInfo(index) {
		let cityInfo = sliderImageInfo.querySelector(".city .slider__info-container");
		let areaInfo = sliderImageInfo.querySelector(".area .slider__info-container");
		let timeInfo = sliderImageInfo.querySelector(".time .slider__info-container");
		let costInfo = sliderImageInfo.querySelector(".cost .slider__info-container");
		
		cityInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.city}</p>`;
		areaInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.area}</p>`;
		timeInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.time}</p>`;
		costInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.cost}</p>`;
	}
	
	function initArrows() {
		sliderArrows.forEach(arrow => {
			arrow.addEventListener("click", function() {
				
				let curNumber = +sliderImages.querySelector(".active").dataset.index;
				
				let nextNumber;
				if (arrow.classList.contains("left")) {
					nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
				} else {
					nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
				}
				
				moveSlider(nextNumber);
			});
		});
	}

	function initDots() {
		
		images.forEach((image, index) => {
			
			let dot = `<li class="slider__dots n${index} ${index === 0? "active" : ""}" data-index="${index}"><img src="images/dot.svg" alt="point"></li>`;
			
			sliderDots.innerHTML += dot;
		});
		
		sliderDots.querySelectorAll(".slider__dots").forEach(dot => {
			dot.addEventListener("click", function() {
				moveSlider(this.dataset.index);
			})
		})
	}

	function moveSlider(num) {
		sliderImages.querySelector(".active").classList.remove("active");
		sliderImages.querySelector(".n" + num).classList.add("active");
		if (options.dots) {
			sliderDots.querySelector(".active").classList.remove("active");
			sliderDots.querySelector(".n" + num).classList.add("active");
		}
		if (options.titles) {
			changeTitle(numOfTitles,num);
		}
		changeImageInfo(num);
	}

	function changeImageInfo(num) {
		
		sliderImageInfo.querySelectorAll(".active").forEach((item) => {
			item.classList.remove("active");
		});
		
		sliderImageInfo.querySelectorAll(".n" + num).forEach((item) => {
			item.classList.add("active");
		});
	}
	

	function initTitles(numOfTitles) {
		let sliderTitles = document.querySelector(".slider__titles");
		
		let n = (images.length < numOfTitles) ? images.length :  numOfTitles;	

		images.forEach((image, index) => {
			let title = `<li class="horizontal-list_item n${index}" data-index="${index}" style="display: ${(index < n) ? "" : "none"}; opacity: ${(index < n) ? "1" : "0"};">
							<p class="p  ${index === 0? "active" : ""}">${cropTitle(images[index].title, 50)}</p>
						</li>`;
			sliderTitles.innerHTML += title;		

		});

		sliderTitles.querySelectorAll(".p").forEach((item,index) => {
			item.addEventListener("click", function() {
				moveSlider(index);
			});
		});
	}

	function cropTitle(title, size) {
		if (title.length <= size) {
		  return title;
		} else {
		  return title.substr(0, size) + "...";
		}
	}

	function changeTitle(numOfTitles,num) {

		if (images.length <= numOfTitles) {
			sliderTitles.querySelector(".active").classList.remove("active");
			sliderTitles.querySelector(`.n${num} .p`).classList.add("active");
			return;
		}

		let titlesList = sliderTitles.querySelectorAll(".horizontal-list_item");
		
		titlesList.forEach((item) => {
			item.style.display = "none";
			item.style.opacity = "0";
		});
		
		let prev = (num == 0) ? images.length-1 : +num-1;
		let next = (num == images.length-1) ? 0 : +num+1;
		
		sliderTitles.querySelector(".active").classList.remove("active");
		sliderTitles.querySelector(`.n${num} .p`).classList.add("active");
		sliderTitles.querySelector(`.n${prev}`).style.display = "";
		sliderTitles.querySelector(`.n${num}`).style.display = "";
		sliderTitles.querySelector(`.n${next}`).style.display = "";
		
		sliderTitles.querySelector(`.n${prev}`).style.opacity = "1";
		sliderTitles.querySelector(`.n${num}`).style.opacity  = "1";
		sliderTitles.querySelector(`.n${next}`).style.opacity  = "1";
	}

	function initAutoplay() {
		setInterval(() => {
			let curNumber = +sliderImages.querySelector(".active").dataset.index;
			let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
			moveSlider(nextNumber);
		}, options.autoplayInterval);
	}

}
