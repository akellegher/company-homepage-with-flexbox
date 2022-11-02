'use strict';

const slides = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.header__carousel__nav li');
const promoSlider = document.querySelector('.slick-slider');
let cycle;
let counter = 0;

const runSlider = () => {
    slides[counter].classList.remove('slick-active');
    navLinks[counter].classList.remove('slick-active');

    if(counter >= slides.length - 1){
        counter = 0;
    } else {
        counter++;
    }

    slides[counter].classList.add('slick-active');
    navLinks[counter].classList.add('slick-active');
}

const handleSlider = (index) => {
    clearInterval(cycle);

    slides[counter].classList.remove('slick-active');
    navLinks[counter].classList.remove('slick-active');

    slides[index].classList.add('slick-active');
    navLinks[index].classList.add('slick-active');

    counter = index;
    
    cycle = setInterval(runSlider, 5000);
}

promoSlider.addEventListener('mouseover', function() {
    clearInterval(cycle);
});

promoSlider.addEventListener('mouseout', function() {
    cycle = setInterval(runSlider, 5000);
});

cycle = setInterval(runSlider, 5000);