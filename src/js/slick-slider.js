'use strict';

slickSlider();

function slickSlider() {
    const slider = document.querySelector('.slick-list');
    const cards = document.querySelectorAll('.slick-card');
    const cardWidth = document.querySelector('.slick-card').offsetWidth;
    const nextBtn = document.querySelector('.slick-slider__nav-next');
    const prevBtn = document.querySelector('.slick-slider__nav-prev');

    const pageLimit = 3;
    let currPage = 1;
    let translatex = 0;
    const numCards = cards.length;
    const numPages = Math.ceil(numCards / pageLimit);
    const distance = cardWidth * pageLimit;

    const handleSlider = (pageNum) => {
        const pageDiff = pageNum - currPage;

        if (pageNum === currPage || pageNum === 0 || pageNum > numPages) {
            return false;
        }
        // handle specific pages
        if (pageNum === 1) {
            translatex = 0;
            prevBtn.classList.add('slick-disabled');
            prevBtn.ariaDisabled = true;
            nextBtn.classList.remove('slick-disabled');
            nextBtn.ariaDisabled = false;
        } else if (pageNum === numPages) {
            translatex = slider.lastElementChild.offsetLeft - (2 * cardWidth);
            prevBtn.classList.remove('slick-disabled');
            prevBtn.ariaDisabled = false;
            nextBtn.classList.add('slick-disabled');
            nextBtn.ariaDisabled = true;
        } else if (pageDiff > 1 || pageDiff < -1) {
            translatex = distance * (pageNum - 1);
            prevBtn.classList.remove('slick-disabled');
            prevBtn.ariaDisabled = false;
            nextBtn.classList.remove('slick-disabled');
            nextBtn.ariaDisabled = false;
        }

        // handle previous and next pages
        else {
            if (pageNum < currPage) {
                translatex -= distance;
                nextBtn.classList.remove('slick-disabled');
                nextBtn.ariaDisabled = false;
            } else {
                translatex += distance;
                prevBtn.classList.remove('slick-disabled');
                prevBtn.ariaDisabled = false;
            }
        }

        slider.style.transform = `translateX(-${translatex}px)`;
        changeActiveClass(currPage, pageNum);
        currPage = pageNum;
    };

    const createSliderNav = () => {
        const sliderNav = document.querySelector('.slick-slider__nav');
        const ulElement = document.createElement('ul');
        ulElement.setAttribute('class', 'slick-slider__nav__btns');

        let listArr = [];
        let i = 0;

        while (i < numPages) {
            let li = document.createElement('li');
            li.innerHTML = `<button type=\"button\" class=\"slick-btn\"></button>`;
            listArr.push(li);
            i++;
        }

        listArr[0].setAttribute('class', 'slick-active');

        listArr.forEach(item => {
            ulElement.appendChild(item);
        });
        sliderNav.appendChild(ulElement);
    };

    const changeActiveClass = (c, a) => {
        const navBtns = document.querySelectorAll('.slick-slider__nav__btns li');
        let currItem = navBtns[c - 1];
        let activeItem = navBtns[a - 1];
        currItem.classList.remove('slick-active');
        activeItem.classList.add('slick-active');
    };

    createSliderNav();

    const slickBtns = document.querySelectorAll('.slick-btn');
    slickBtns.forEach((elem, index) => {
        elem.addEventListener('click', () => { handleSlider(index + 1); });
    });

    nextBtn.addEventListener('click', () => { handleSlider(currPage + 1); });

    prevBtn.addEventListener('click', () => { handleSlider(currPage - 1); });
}
