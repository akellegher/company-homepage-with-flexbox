'use strict';

const slides = document.querySelectorAll('.promo-slide');
const navItems = document.querySelectorAll('.header__promo__carousel-nav li');
const navLinks = document.querySelectorAll('.header__promo__carousel-nav li a');
const carouselPromo = document.querySelector('.header__promo__carousel');
let cycle;
let counter = 0;

const runCarousel = () => {
    slides[counter].classList.remove('slide-active');
    navItems[counter].classList.remove('slide-active');

    if(counter >= slides.length - 1){
        counter = 0;
    } else {
        counter++;
    }

    slides[counter].classList.add('slide-active');
    navItems[counter].classList.add('slide-active');
}

const handleCarousel = index => {
    clearInterval(cycle);

    slides[counter].classList.remove('slide-active');
    navItems[counter].classList.remove('slide-active');

    slides[index].classList.add('slide-active');
    navItems[index].classList.add('slide-active');

    counter = index;
    
    cycle = setInterval(runCarousel, 5000);
}

navLinks.forEach((item, index) => {
    item.addEventListener('click', () => {handleCarousel(index)});
});

carouselPromo.addEventListener('mouseover', () => {clearInterval(cycle);});

carouselPromo.addEventListener('mouseout', () => {cycle = setInterval(runCarousel, 5000);});

cycle = setInterval(runCarousel, 5000);