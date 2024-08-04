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
        swapPlayers();
        printGameboard();
        console.log(`It's ${activePlayer.name}'s turn!`)

        winAnnounce();
    }

    let activePlayer = players[0];
    const swapPlayers = ()=>{
        activePlayer = (activePlayer === players [0]) ? activePlayer = players[1] : activePlayer = players[0];
    }

    const winAnnounce =() =>{
        console.log(row, column)
    }

    return {board,printGameboard, markCell, swapPlayers, activePlayer}
}


const gameOne = GameController();
gameOne.markCell(0,0);