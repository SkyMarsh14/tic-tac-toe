let playerOneName; 
let playerTwoName;
function Gameboard(){
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    (function(){
        for(let i = 0; i<rows; i++){
            gameboard[i]=[];
            for (let j = 0; j<columns; j++){
                gameboard[i].push(0);
            }
        }
    })();

    
    return{gameboard}
}


function GameController(
    playerOneName= 'Player One',
    playerTwoName = 'Player Two'
){
    const board = Gameboard();

    
    
    const printGameboard = () =>{
        console.table(board.gameboard);
    }
    
    const players = [
        {name:playerOneName,
            token:1
        },
        {name:playerTwoName,
            token:2
        }
    ];
    
    const markCell = (row,column)=>{
        if(board.gameboard[row][column]===(1||2)){
            console.log("This Cell is already Taken")
            return
        }
        board.gameboard[row][column]=activePlayer.token;
        printGameboard();
        
        winAnnounce(row,column);
        swapPlayers();
        console.log(`It's ${getActivePlayer().name}'s turn!`)
    }

    let activePlayer = players[0];
    const swapPlayers = ()=>{
        activePlayer = (activePlayer === players [0]) ? activePlayer = players[1] : activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;
    const winAnnounce =(row,column) =>{

        let table = board.gameboard;

        function winCondition(){
            if(table[row].every((n)=>(n===table[row][column]))){
                return true;
            }else if([table[0][column],table[1][column],table[2][column]].every((n)=>(n===table[row][column]))){
                return true;
            }else if([table[0][0],table[1][1],table[2][2]].every((n)=>(n===table[row][column]))){
                return true;
            }else if([table[0][2],table[1][1],table[2][0]].every((n)=>(n===table[row][column]))){
                return true;
            }
        }

    

        if(winCondition()){
            console.log(`${getActivePlayer().name} has won!`)
            play.turnH1.textContent = `${getActivePlayer().name} has won!`
            play.turnH1.classList.add('win');
            const allCell = document.querySelectorAll('.cell');
            allCell.forEach((cell)=>cell.disabled=true);
            return
        }

        (function(){
            const allCell = document.querySelectorAll('.cell');
            if(Array.from(allCell).every(cell=>cell.disabled===true)){
                play.turnH1.textContent = "Draw!";
                play.turnH1.classList.add('win');
            }
        })();
    }
    return {board,printGameboard, markCell, swapPlayers, getActivePlayer,winAnnounce}
}

function ScreenController(){
    const game = GameController(playerOneName,playerTwoName);
    const turnH1 = document.querySelector('.turnH1');
    const boardDiv = document.querySelector('.boardDiv');

    function updateActivePlayer(){
    turnH1.textContent = `${game.getActivePlayer().name}'s Turn!`;
    }
    function createTable(){
        let Arr = game.board.gameboard;
        Arr.forEach((row,indexRow)=>row.forEach((col,indexCol)=>{
            const cell = document.createElement('button');
            cell.classList.add("cell");
            cell.setAttribute("data-index-row",`${indexRow}`);
            cell.setAttribute("data-index-col",`${indexCol}`);

            boardDiv.append(cell);
            

            cell.addEventListener("click",(e)=>{
                updateActivePlayer();
                markCell(e);
            })
        }))
    }
    function markCell(e){
        const token = game.getActivePlayer().token;
        if(token===1){
            e.currentTarget.textContent = "〇";
        }else{
            e.currentTarget.textContent = "✕";
        }
        const row = e.target.dataset.indexRow;
        const column = e.target.dataset.indexCol;
        game.board.gameboard[row][column] = token;
        e.target.disabled = true ;
        
        game.winAnnounce(row,column);
        play.game.swapPlayers();
    }

    return {game, updateActivePlayer, createTable,markCell,turnH1}
}

function StartGame(){
    const close = document.querySelector('dialog');
    close.addEventListener("submit",e=>{
        e.preventDefault();
        const playerOne = document.querySelector('#playerOneName');
        const playerTwo = document.querySelector('#playerTwoName');
        playerOneName = playerOne.value;
        playerTwoName = playerTwo.value;
        play = ScreenController();

        play.createTable();
        play.updateActivePlayer();
        
        close.close();
    })
};

let play;
StartGame();