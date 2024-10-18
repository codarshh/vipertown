const gameBoard = document.querySelector(".game-board");
const score = document.querySelector(".score span");

let currentInput = "w";
let viper;
let viperFood;
let width = 20;
let lastLocation = [0, 0];

let colorScheme = {
    viper: "#708742",
    board: "#e2f3c1",
    food: "#f25555"
}

gameBoard.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
gameBoard.style.gridTemplateRows = `repeat(${width}, 1fr)`;
for(let i = 0; i < width; i++) {
    for(let j = 0; j < width; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `${j},${i}`;    

        gameBoard.appendChild(cell)
    }

}

const foodLocation = () => {
        return [
            Math.floor(Math.random() *  20), 
            Math.floor(Math.random() *  20)
        ];
}

const ateFood = () => {
    document.getElementById(viperFood.toString()).style.backgroundColor = colorScheme.viper;

    viperFood = foodLocation();
}

const paintViper = (viper) => {
    viper.forEach(viperCell => {
        document.getElementById(viperCell.toString()).style.backgroundColor = colorScheme.viper;
    })
} 

const removeViperTrail = (viper) => {
    viper.forEach(viperCell => {  
        document.querySelectorAll(".cell").forEach(element => {
            element.style.backgroundColor = colorScheme.board;
        })
    })
    document.getElementById(viperFood.toString()).style.backgroundColor = colorScheme.food;

}

const paintFood = () => {
    viperFood = foodLocation();

    document.getElementById(viperFood.toString()).style.backgroundColor = colorScheme.food;

}

paintFood();
viper = [foodLocation(), foodLocation()];
setInterval(() => {
    
    removeViperTrail(viper);
    paintViper(viper);
    // viperFood = foodLocation();
    // console.log(foodLocation())

    // document.getElementById(viperFood.toString()).style.backgroundColor = colorScheme.food;

    let viperHead = viper[0];
    // console.log(viperHead[1]);

    // if (viperHead[1] == 0) {
    //     console.log("end")
    //     if (currentInput == "w" || currentInput == "s") {
    //         viper[0][1] = 9; 
    //     } else {
    //         viper[1][0] = 0; 
    //     }
    // }

    if (JSON.stringify(viperHead) == JSON.stringify(viperFood)) {
        console.log("food")
        ateFood();
        viper = [
            ...viper,
            lastLocation
        ]
        // console.log(Number(score.textContent) + 1)
        score.textContent = `${Number(score.textContent) + 1}`;
    }
    

    if (currentInput == "w") {

        viper = [ 
            [ 
                Number(viper[0].toString().split(",")[0]), Number(viper[0].toString().split(",")[1]) - 1    
            ] ,
            ...viper
        ]
        viper.pop();
    } else if (currentInput == "a") {
        viper = [ 
            [ 
                Number(viper[0].toString().split(",")[0]) - 1, Number(viper[0].toString().split(",")[1])
            ] ,
            ...viper
        ]
        viper.pop();

    } else if (currentInput == "s") {
        console.warn(viper)

        viper = [ 
            [ 
                Number(viper[0].toString().split(",")[0]), Number(viper[0].toString().split(",")[1]) + 1
            ],
            ...viper
        ]
        viper.pop();
    } else if (currentInput == "d") {
        viper = [ 
            [
                Number(viper[0].toString().split(",")[0]) + 1, Number(viper[0].toString().split(",")[1])
            ],
            ...viper
        ]
        viper.pop();
    }

    lastLocation = viper[viper.length - 1];
    console.log(viper)

}, 300)

document.addEventListener("keydown", (event) => {
    if (event.key == "w" || event.key == "ArrowUp") {
        currentInput = "w";
    } else if (event.key == "a" || event.key == "ArrowLeft") {
        currentInput = "a";
    } else if (event.key == "s" || event.key == "ArrowDown") {
        currentInput = "s";
    } else if (event.key == "d" || event.key == "ArrowRight") {
        currentInput = "d";
    }
})