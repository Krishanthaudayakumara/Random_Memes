import React from "react";



export default function Memecanvas(props){

    function draw() {
        var canvas = document.getElementById("idCanvas");
        var context = canvas.getContext("2d");
    
        var imageObj = new Image();
    
        imageObj.onload = function () {
          context.drawImage(imageObj, 0, 0);
          context.font = "40px Calibri";
          context.fillStyle = "white";
          context.fillText("My TEXT!", 50, 30);
    
          var canvas = document.getElementById("idCanvas");
          var dataURL = canvas.toDataURL();
          console.log(dataURL)
    
          
        };
        imageObj.setAttribute("crossOrigin", "anonymous");
        imageObj.src = props.url;
      }

    return(
        <canvas id="idCanvas" width="576" height="577" onClick={draw}></canvas>

    )
}