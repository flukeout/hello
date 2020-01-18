let viewerVisible = false,                  // If true, will open first image in gallery
    gallerySelector = ".illustrations",     // The wrapper element around the thumbnails
    imageIndex,
    viewerEls = {};

let firstTouchX = 0;
let lastTouchX = 0;

document.addEventListener("DOMContentLoaded", function() { 
    viewerEls.bodyEl =            document.querySelector("body");
    viewerEls.viewerEl =          document.querySelector(".image-viewer");

    viewerEls.viewerImageList =   document.querySelectorAll(gallerySelector + " img");
    viewerEls.viewerImageThumbs = document.querySelector(gallerySelector);
    viewerEls.viewerImageEl =     document.querySelector(".image-viewer img");
    viewerEls.viewerCaptionEl =   document.querySelector(".image-viewer .caption");
    viewerEls.prevEl =            document.querySelector(".previous");
    viewerEls.nextEl =            document.querySelector(".next");
    viewerEls.viewerCloseEl =     document.querySelector(".close-viewer");

    let requiredElementCount = 8;

    if(Object.entries(viewerEls) == requiredElementCount) {
        console.log("One of the elements reuquired for the image viewer was not found.");
        return false;
    }

    if(viewerVisible) {
        showViewer(viewerEls.viewerImageList[0]);
    }

    viewerEls.viewerEl.addEventListener("touchstart", function(e){
        firstTouchX = e.touches[0].clientX;
    });

    viewerEls.viewerEl.addEventListener("touchmove", function(e){
        lastTouchX = e.touches[0].clientX;
    });


    viewerEls.viewerEl.addEventListener("touchend", function(e){
        console.log(firstTouchX, lastTouchX);
    });


    viewerEls.viewerImageThumbs.addEventListener("click", function(e){
        clickImage(e);
    });

    viewerEls.prevEl.addEventListener("click", function(e){
        previousImage();
    });

    viewerEls.nextEl.addEventListener("click", function(e){
        nextImage();
    });

    viewerEls.viewerCloseEl.addEventListener("click", function(e){
        hideViewer();
    });
});


document.addEventListener("keydown", function(e){
    if (e.key == "Escape") {
        hideViewer();
    }

    if (e.key == "ArrowLeft") {
        viewerVisible && previousImage();
    }

    if (e.key == "ArrowRight") {
        viewerVisible && nextImage();
    }
});


const hideViewer = () => {
    console.log(viewerEls.viewerEl);
    viewerEls.viewerEl.classList.remove("show");
    viewerVisible = false;
    let selectedImage = document.querySelector(".selected");
    if(selectedImage) {
        selectedImage.classList.remove("selected");
    }
}


const showViewer = el => {
    viewerVisible = true;
    viewerEls.viewerEl.classList.toggle("show");
    showImage(el);
}


const nextImage = () => {
    let currentImage = document.querySelector(".illustrations .selected");
    let nextImage = currentImage.nextElementSibling;
    if(nextImage) {
        showImage(nextImage);
    } else {
        showImage(document.querySelector(".illustrations img:first-child"));
    }
}


const previousImage = () => {
    let currentImage = document.querySelector(".illustrations .selected");
    let previousImage = currentImage.previousElementSibling;

    if(previousImage) {
        showImage(previousImage);
    } else {
        showImage(document.querySelector(".illustrations img:last-child"));
    }
}


const showImage = el => {
    let currentImage = document.querySelector(".selected");
    let newSrc = el.getAttribute("src");

    if(el.hasAttribute("thumbnail")){
        let splitSrc = newSrc.split(".");
        splitSrc[0] = splitSrc[0] + "_full"; 
        newSrc = splitSrc.join(".");
    }

    let newAlt = el.getAttribute("alt");
    let newCaption = el.getAttribute("caption");

    if(currentImage) {
        currentImage.classList.remove("selected");
    }

    viewerEls.viewerImageEl.setAttribute("src", newSrc);
    viewerEls.viewerImageEl.setAttribute("alt", newAlt);
    viewerEls.viewerCaptionEl.innerText = newCaption;

    el.classList.add("selected");
}


const clickImage = e => {
    let src = e.target.getAttribute("src");

    if(src) {
        showViewer(e.target);
        e.target.classList.add("selected");
    }
}
