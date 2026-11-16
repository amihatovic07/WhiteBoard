const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d"); // ctx = context
const wb = canvas.getBoundingClientRect();

let isDrawing = false;
let posX = 0;
let posY = 0;


ctx.lineWidth = 10;
ctx.strokeStyle = "black";

canvas.addEventListener("mousedown", startDrawing)
canvas.addEventListener("mouseup", stopDrawing)
canvas.addEventListener("mousemove", draw)

function startDrawing(event) {
    isDrawing = true;
    posX = event.clientX - wb.left;
    posY = event.clientY - wb.top;
}

function stopDrawing() {
    isDrawing = false;
}

function draw(event) {
    if (isDrawing) {
        ctx.beginPath();
        console.log("1. X = ", posX, "Y = ", posY)
        ctx.moveTo(posX, posY);
        ctx.lineTo(event.clientX - wb.left, event.clientY - wb.top);
        ctx.stroke();
        posX = event.clientX - wb.left;
        posY = event.clientY - wb.top; 
        console.log("2. X = ", posX, "Y = ", posY)
    }
}



