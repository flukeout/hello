let directions = ["top-left","top-right","top","bottom","bottom-left","bottom-right","center","left","right"],
    faceEl,
    faceElSelector = ".bio-photo",
    imagePath = "images/faces/";

document.addEventListener("DOMContentLoaded", function() { 
  faceEl = document.querySelector(faceElSelector);

  for(var j = 0; j < directions.length; j++) {
    var direction = directions[j];
    var src = imagePath + direction + ".jpg";
    var img = document.createElement("img");
    img.classList.add("loader");
    document.querySelector("body").appendChild(img);
    img.setAttribute("src",src);
    img.addEventListener("onload",function(){
      loadImage();
    });
  }

  document.addEventListener("mousemove",function(e) {
      updateFace(e);
  });
});


function updateFace(e){
  let faceRect = faceEl.getBoundingClientRect();
  let faceSize = faceRect.width;

  var deltaX = faceRect.x + faceSize/2 - e.pageX;
  var deltaY = faceRect.y + faceSize/2 - e.pageY;
  var rad = Math.atan2(deltaX, deltaY);
  var angle = rad * (180 / Math.PI);
  var direction;

  if(angle < 22.5 && angle > -22.5) {
    direction = "top";
  }

  if(angle < -22.5 && angle > -67.5) {
    direction = "top-right";
  }

  if(angle < -67.5 && angle > -112.5) {
    direction = "right";
  }

  if(angle < -112.5 && angle > -157.5) {
    direction = "bottom-right";
  }
  if((angle < -157.5 && angle > -180) ||  (angle < 180 && angle > 157.5)) {
    direction = "bottom";
  }

  if(angle > 22.5 && angle  < 67.5) {
    direction = "top-left";
  }

  if(angle > 67.5 && angle < 112.5) {
    direction = "left";
  }

  if(angle > 112.5 && angle < 157.5) {
    direction = "bottom-left";
  }

  var totalDelta = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
  if(totalDelta < 50) {
    direction = "center";
  }

  if(direction){
    faceEl.style.backgroundImage = "url(" + imagePath + direction+".jpg";
  }
}
