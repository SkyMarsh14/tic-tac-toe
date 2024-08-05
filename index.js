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
        console.log(`It's ${activePlayer.name}'s turn!`)
    }

    let activePlayer = players[0];
    const swapPlayers = ()=>{
        activePlayer = (activePlayer === players [0]) ? activePlayer = players[1] : activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;

    const winAnnounce =(row,column) =>{

        let table = board.gameboard;

        function winCondition(){
            if(table[row].every((n)=>(n>0))){
                return true;
            }else if([table[0][column],table[1][column],table[2][column]].every((n)=>(n>0))){
                return true;
            }else if([table[0][0],table[1][1],table[2][2]].every((n)=>(n>0))){
                return true;
            }else if([table[0][2],table[1][1],table[2][0]].every((n)=>(n>0))){
                return true;
            }
        }

        

        if(winCondition()){
            console.log(`${getActivePlayer()} has won!`)
        }
    
    }
    return {board,printGameboard, markCell, swapPlayers, getActivePlayer}
}

function ScreenControll(){
    const game = GameController();
    const turnH1 = document.querySelector('.turnH1');

    function updateActivePlayer(){
    turnH1.textContent = game.getActivePlayer();
    }
    return {game, turnH1, updateActivePlayer}
}

const play = ScreenControll();