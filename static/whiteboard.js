const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d"); // ctx = context

// only adjust the canvas height and width here 
canvas.width = 1450;
canvas.height = 720;

// the board the user is currently working on
let currentBoardId = null;

// the boards that have been seen in this session
let boards = [];

updateBoardList();

// creates a new board with a UUID and clears the current board 
const createBoardBtn = document.getElementById("create-board-btn");
createBoardBtn.addEventListener("click", async () => {
    let board_created = false;
    try {
        await createBoard();
        
        board_created = true;
        
        boards.push(currentBoardId);
        updateBoardList();
        console.log(boards)

    } catch (error) {
        console.error("Error creating a new board:", error);
    }

    if (board_created) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

async function createBoard() {
    const response = await fetch(API.createBoard, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify({
                now: new Date()
            })
        });

    if (!response.ok) {
        throw new Error("Failed to create a new board");
    }

    const data = await response.json();
    currentBoardId = data.board_id;
    
    
    console.log("New board created with ID:", currentBoardId);
    return 0;
}


// drawing global variables
let isDrawing = false;
let posX = 0;
let posY = 0;

// marker styling 
    //marker styling inputs:
const strokeWidthRange = document.getElementById("stroke-range");
const strokeWidthNumber = document.getElementById("stroke-number")

const strokeColorInput = document.getElementById("color");
    //Initialize strokeWidth using default value of strokeWidthRange
let strokeWidth = Number(strokeWidthRange.value);
    //sets the strokeWidthControl variables to the same number
function updateStrokeWidth(value) {
    strokeWidth = Number(value);
    strokeWidthRange.value = strokeWidth;
    strokeWidthNumber.value = strokeWidth;
}
    // update via dragging the slider
strokeWidthRange.addEventListener("input", (event) => {
    updateStrokeWidth(event.target.value);
});
    // update via inputting stroke number
strokeWidthNumber.addEventListener("input", (event) => {
    updateStrokeWidth(event.target.value);
});

updateStrokeWidth(strokeWidth);

    //set stroke color
let strokeColor = strokeColorInput.value;
    // update via text input
strokeColorInput.addEventListener('input', () => {
    strokeColor = strokeColorInput.value;
})


ctx.lineCap = "round";
ctx.lineJoin = "round";

// event listeners 
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

// resets the X and Y positions
function startDrawing(event) {
    const wb = canvas.getBoundingClientRect();

    isDrawing = true;
    posX = event.clientX - wb.left;
    posY = event.clientY - wb.top;
}

function stopDrawing() {
    isDrawing = false;
}

function draw(event) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    if (isDrawing) {       
        const wb = canvas.getBoundingClientRect();

        ctx.beginPath();
        
        // console.log("1. X = ", posX, "Y = ", posY)
        
        ctx.moveTo(posX, posY);
        ctx.lineTo(event.clientX - wb.left, event.clientY - wb.top);
        ctx.stroke();
        
        posX = event.clientX - wb.left;
        posY = event.clientY - wb.top; 
        
        // console.log("2. X = ", posX, "Y = ", posY)
    }
    
}



console.log("width: ", canvas.width, " height: ", canvas.height);

// Saving the Board 
// A board must be created before it can be saved 
const saveBoardBtn = document.getElementById("save-board-btn");
saveBoardBtn.addEventListener("click", async () => {
    try {
        await saveBoard();
    } catch (error) {
        console.error("Error saving board:", error);
    }
});

async function saveBoard() {
    if (currentBoardId === null) {
        await createBoard();
        console.log("new board inside save board. current board ID: ", currentBoardId);

        if (!boards.includes(currentBoardId)) {
            boards.push(currentBoardId);
        }

        updateBoardList();

    }
    console.log("Registered click on saveBoardBtn")
    
    const dataURL = canvas.toDataURL();
    console.log(dataURL);

    const url = API.saveBoard.replace("PLACEHOLDER", currentBoardId);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_data: dataURL,
            date_last_updated: new Date()

        }) 
    });
    console.log("submitted POST request to: ", url);
    if (!response.ok) {
        throw new Error("Failed to save board");
    }
}


// Loading the Board
// Old board must be saved before it can be loaded 
const loadBoardForm = document.getElementById("load-board-form")
const loadBoardInput = document.getElementById("uuid")
loadBoardForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        console.log("Loading board ID: ", loadBoardInput.value);
        await loadBoard(loadBoardInput.value);
    } catch (error) {
        console.error("Error loading board:", error);
    }
});


async function loadBoard(user_input) {
    var cleaned_input = user_input.trim();
    
    if (cleaned_input === "") {
        document.getElementById("current-uuid").innerHTML = `<p style="color: red;">No board to load.</p>`
        console.log("No board to load");
        return;
    }

    if (!boards.includes(cleaned_input)) {
        document.getElementById("current-uuid").innerHTML = `<p style="color: red;">This board does not exist. Check your input and try again.</p>`
        console.log("Error: Bad input");
        return;
    }
    
    const url = API.loadBoard.replace("PLACEHOLDER", cleaned_input);

    const response = await fetch(url, {
        method: "GET"
    });
    console.log("submitted GET request to: ", url);
    if (!response.ok) {
        throw new Error("Failed to load board");
    }

    // save the json response data 
    const data = await response.json();

    console.log("Entire response:", data);
    
    // save the previous board since we will clear it 
    // saveBoard(); 
    
    // set the new current board ID. 
    // this is safe since we already checked that the 
    // board is not null and the server handles enforcing
    // that the uuid actually exists 
    currentBoardId = cleaned_input; 
    console.log("Current board ID:", currentBoardId);
    displayCurrentUUID(currentBoardId);

    // prepare to have some new image data
    const boardImageData = data.image_data; 

    // creates a new image
    const image = new Image(); 
    
    // clear the board
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the image onto the canvas after it is loaded 
    image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    // tell the browser what to load, comes from the response JSON data 
    image.src = boardImageData; 

}

function getDisplayUuidMessage(uuid) {
    // handle when there is not a board ID yet
    let display_uuid = null;
    if (currentBoardId == null) {
        display_uuid = "No UUID has been generated for this board. Please save your work."
    }
    else {
        display_uuid = uuid;
    }
    return display_uuid; 
}

// board-uuid-list is the HTML element of boards seen this session
function updateBoardList() {
    
    let b_count = boards.length;
    let boardIDList = document.getElementById("board-uuid-list");
    
    boardIDList.innerHTML = "";

    if (b_count < 1) {
        boardIDList.innerHTML = `<p>No boards have been created yet.</p>`;
    }
    else {
        // display all boards 
        for (let i=0; i < b_count; i++) {
            boardIDList.innerHTML += `<p>board ${i+1} uuid: ${boards[i]}</p>`
            
        }
    }

    displayCurrentUUID(currentBoardId);
    

    console.log("board count = ", b_count);

}

function displayCurrentUUID(uuid) {
    let currentBoardIdDisplay = document.getElementById("current-uuid");

    if (uuid != null) {
        currentBoardIdDisplay.innerHTML = `<p>You are viewing board uuid: ${uuid}</p>`
    }
    else {
        currentBoardIdDisplay.innerHTML =
            `<p>This board does not have a UUID yet.</p>`;
    }
}

console.log(boards)