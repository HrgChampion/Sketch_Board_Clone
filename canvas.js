let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let mouseDown = false;
let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// mousedown -> start new path , mousemove -> path fill (graphics)

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
});

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown) drawStroke({
        x: e.clientX,
        y: e.clientY,
        color: eraserFlag ? eraserColor : penColor,
        width: eraserFlag ? eraserWidth : penWidth
    })
});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
});

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", () => {
        penColor = colorElem.classList[0];
        tool.strokeStyle = penColor;
    })
});

pencilWidthElem.addEventListener("change", () => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", () => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", () => {
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }else{
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
});

download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
   let a = document.createElement("a");
   a.href = url;
    a.download = "board.png"
    a.click();
})