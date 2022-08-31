//modal
const modalButton = document.querySelector('#modalButton');
const modalContainer = document.querySelector('.modal-container');
const modalText = document.querySelector('.winner');

//audio files
var noughtsAudio = new Audio("noughts.mp3");
var crossesAudio = new Audio("crosses.mp3");
var drawAudio = new Audio("draw.mp3");

let cells = document.querySelectorAll('.cell');

// board array
let board = ["","","","","","","","",""];

let currentPlayer = "X";

let running = true;

// winning conditions
const winConditions = [
    // horizontal board index
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical board index
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal board index
    [0, 4, 8],
    [2, 4, 6]
];




cells.forEach(cell => cell.addEventListener("click", function () {

        if (running == true){
            //insert current player into cell if cell empty
            if (cell.innerHTML != "O" && cell.innerHTML != "X"){
                cell.innerHTML = currentPlayer;
            }
        //grab cellIndex for board
        const cellIndex = this.getAttribute("cellIndex");
        //insert cellIndex into board array
        board[cellIndex] = currentPlayer
        changePlayer();
        checkWinner();
        checkDraw();
        }
        
        
}));

function changePlayer(){
    //if currentPlayer is X change to O else currentPlayer X
    currentPlayer = currentPlayer == "X" ? "O" : "X";
}

function checkWinner(){
    
    //for loop
    for(let i = 0; i < winConditions.length; i++){

        //first winConditions array index as condition
        let condition = winConditions[i];
        //first winConditions index
        let cellA = board[condition[0]];
        //ssecond winConditions index
        let cellB = board[condition[1]];
        //third winConditions index
        let cellC = board[condition[2]];

        //if matching pair of 3 'O' found in board
        if (cellA == "O" && cellB == "O" && cellC == "O"){
            console.log("O is winner");
            modalContainer.classList.add('show');
            modalText.innerHTML = 'O Wins!';
            noughtsAudio.play();
            running = false
        }

        //if matching pair of 3 'X' found in board
        if (cellA == "X" && cellB == "X" && cellC == "X"){
            console.log("X is winner");
            modalContainer.classList.add('show');
            modalText.innerHTML = 'X Wins!';
            crossesAudio.play();
            running = false          
        }        
    }
}

function checkDraw(){
    if (running == true){
        //if board does not include ""
        if (!board.includes("")){
            console.log("DRAW");
            modalContainer.classList.add('show');
            modalText.innerHTML = 'Its a draw!';
            drawAudio.play();
            running = false
        }
    }
}

//resets board
function resetBoard(){
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerHTML = "");
    running = true;
}

//remove modal container class show
modalButton.addEventListener('click', function(e) {
    modalContainer.classList.remove('show')
    resetBoard()
})

