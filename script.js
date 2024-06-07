//logo functions
function handleLogoClick() {
    if (window.location.pathname.endsWith('index.html')) {
        window.location.reload();
    } else {
        window.location.href = 'index.html';
    }
}

//sliding image
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Optional: Automatic slide change every 5 seconds
setInterval(() => {
    nextSlide();
}, 8000);

//gallery
var fullImgBox = document.getElementById("fullImgBox");
        var fullImg = document.getElementById("fullImg");

        function openFullImg(pic) {
            fullImgBox.style.display = "flex";
            fullImg.src = pic;
        }
        function closeFullImg() {
            fullImgBox.style.display = "none";
        }