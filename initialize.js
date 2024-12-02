console.log('initialize')
let searchForm = document.querySelector('.search-form')

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active')
    navbar.classList.remove('active');

    if(window.scrollY > 30) {
        document.querySelector('header').classList.add('header-active')
    }
    else {
        document.querySelector('header').classList.remove('header-active')
    }
}


//----------------------- Dùng swiper ----------------------
var swiper = new Swiper(".featured-slider", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
            0: {
                slidesPerView: 1,
            },
            450: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        }
})
//================== Kết thúc dùng swiper =================


// -------------------- Xử lí slides -----------------------
let slides = document.querySelectorAll('.home .slides-container .slide')
let index = 0

function next() {
    slides[index].classList.remove('active')
    if (index + 1 == slides.length) {
        index = 0
    }
    else {
        index += 1
    }
    slides[index].classList.add('active')
}

function prev() {
    slides[index].classList.remove('active')
    if (index - 1 < 0) {
        index = slides.length - 1
    }
    else {
        index -= 1
    }
    slides[index].classList.add('active')
}
