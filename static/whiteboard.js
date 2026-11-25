const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d"); // ctx = context
const wb = canvas.getBoundingClientRect();


const createBoardBtn = document.getElementById("create-board-btn");
createBoardBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("/api/boards", {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to create a new board");
        }

        const data = await response.json();
        const boardId = data.board_id;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        console.log("New board created with ID:", boardId);

    } catch (error) {
        console.error("Error creating a new board:", error);
    }
});

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



