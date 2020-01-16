let viewerVisible = false,
    imageIndex,
    bodyEl,
    viewerEl,
    viewerImageList,
    viewerImageEl,
    viewerCaptionEl,
    viewerCloseEl,
    prevEl,
    nextEl;

document.addEventListener("DOMContentLoaded", function() { 
    bodyEl =            document.querySelector("body");
    viewerEl =          document.querySelector(".viewer");
    viewerImageList =   document.querySelectorAll(".illustrations img");
    viewerImageEl =     document.querySelector(".viewer img");
    viewerCaptionEl =     document.querySelector(".viewer .caption");
    prevEl =            document.querySelector(".previous");
    nextEl =            document.querySelector(".next");
    viewerCloseEl =     document.querySelector(".close-viewer");

    document.querySelector(".illustrations").addEventListener("click", function(e){
        clickImage(e);
    });

    prevEl.addEventListener("click", function(e){
        previousImage();
    });

    nextEl.addEventListener("click", function(e){
        nextImage();
    });

    viewerCloseEl.addEventListener("click", function(e){
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
    viewerEl.classList.remove("show");
    viewerVisible = false;
    let selectedImage = document.querySelector(".selected");
    if(selectedImage) {
        selectedImage.classList.remove("selected");
    }
}


const showViewer = el => {
    viewerVisible = true;
    viewerEl.classList.toggle("show");
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

    viewerImageEl.setAttribute("src", newSrc);
        viewerImageEl.setAttribute("alt", newAlt);
    viewerCaptionEl.innerText = newCaption;

    el.classList.add("selected");
}


const clickImage = e => {
    let src = e.target.getAttribute("src");

    if(src) {
        showViewer(e.target);
        e.target.classList.add("selected");
    }
}
