let viewerVisible = false,                  // If true, will open first image in gallery
    gallerySelector = ".illustrations",     // The wrapper element around the thumbnails
    imageIndex,
    viewerEls = {};

let firstTouch = {};
let lastTouch = {};
let root = document.documentElement;

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
        firstTouch.x = e.touches[0].clientX;
        firstTouch.y = e.touches[0].clientY;
    });

    viewerEls.viewerEl.addEventListener("touchmove", function(e){
        lastTouch.x = e.touches[0].clientX;
        lastTouch.y = e.touches[0].clientY;

        let xDelta = firstTouch.x - lastTouch.x;

        root.style.setProperty('--image-offset',  "translateX(" + (-xDelta/4) +  "px)");
    });

    viewerEls.viewerEl.addEventListener("touchend", function(e){
        let xDelta = firstTouch.x - lastTouch.x;
        let yDelta = firstTouch.y - lastTouch.y;
        root.style.setProperty('--image-offset',  "translateX(0px)");
        if ( Math.abs(yDelta < 100) ){
            if ( xDelta < -200 ) { previousImage() }
            if ( xDelta > 200)         { nextImage() }
        }
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
