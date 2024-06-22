import { render, parseSjdon, createElement } from "./lib/suiweb.min.js";

let state = Array(6).fill('').map(el => Array(7).fill(''));
let currentPlayer = 'r';
let gameEnded = false;
let stateSeq = [];

const App = () => [Board, {board: state}];
const Board = ({board}) => {
    return (
        ["div", {class: "board"}, 
            ...board.map((row, rowIndex) => 
                row.map((cell, columnIndex) => 
                    Field({type: cell, columnIndex: columnIndex})
                )
            ).flat()
        ]
    );
};
const Field = ({type, columnIndex}) => {
    let color = type === 'r' ? 'red' : type === 'b' ? 'blue' : '';
    return ["div", {class: "field", onclick: () => handleClick(columnIndex)}, ["div", {class: `piece ${color}`}]];
};

function elt(type, attrs, ...children) {
    let node = document.createElement(type);
    Object.keys(attrs).forEach(key => {
        node.setAttribute(key, attrs[key]);
    });
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}

function setInList(lst, idx, val) {
    let newList = [...lst];
    newList[idx] = val;
    return newList;
}

function setInObj(obj, attr, val) {
    let newObj = {...obj};
    newObj[attr] = val;
    return newObj;
}


function showBoard() {
    const app = document.querySelector(".app");
    render(parseSjdon([App], createElement), app);
    return app;
}

function renderSJDON(element, parent) {
    const [tag, props, ...children] = element;

    const newElement = document.createElement(tag);

    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (key === 'style') {
                newElement.style.cssText = value;
            } else {
                newElement.setAttribute(key, value);
            }
        }
    }

    for (const child of children) {
        if (Array.isArray(child)) {
            renderSJDON(child, newElement);
        } else {
            const textNode = document.createTextNode(child);
            newElement.appendChild(textNode);
        }
    }

    parent.appendChild(newElement);
}

function connect4Winner(player, board) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
    ];
    const rows = board.length;
    const cols = board[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] !== player) continue;

            for (let [dx, dy] of directions) {
                let x = row, y = col, count = 0;

                while (x >= 0 && x < rows && y >= 0 && y < cols && board[x][y] === player) {
                    x += dx;
                    y += dy;
                    count++;
                }

                if (count >= 4) return true;
            }
        }
    }

    return false;
}

function handleClick(column) {
    if (gameEnded) return;

    for (let i = state.length - 1; i >= 0; i--) {
        if (state[i][column] === '') {
            stateSeq.push(state); 
            state = setInList(state, i, setInList(state[i], column, currentPlayer));
            if (connect4Winner(currentPlayer, state)) {
                gameEnded = true;
                alert(`Player ${currentPlayer === 'r' ? 'Red' : 'Blue'} has won!`);
            }
            currentPlayer = currentPlayer === 'r' ? 'b' : 'r';
            showBoard();
            break;
        }
    }
}

function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(state));
    localStorage.setItem('currentPlayer', currentPlayer);
    localStorage.setItem('gameEnded', gameEnded);
}

function loadGame(newGame = false) {
    if (newGame) {
        state = Array(6).fill('').map(el => Array(7).fill(''));
        currentPlayer = 'r';
        gameEnded = false;
    } else {
        state = JSON.parse(localStorage.getItem('gameState')) || Array(6).fill('').map(el => Array(7).fill(''));
        currentPlayer = localStorage.getItem('currentPlayer') || 'r';
        gameEnded = JSON.parse(localStorage.getItem('gameEnded')) || false;
    }
    showBoard();
}

document.querySelector('.new-game').addEventListener('click', () => loadGame(true));
document.querySelector('.save-game').addEventListener('click', saveGame);
document.querySelector('.load-game').addEventListener('click', () => loadGame(false));
document.querySelector('.undo').addEventListener('click', () => {
    if (gameEnded || stateSeq.length === 0) {
        return;
    }
    state = stateSeq.pop();
    currentPlayer = currentPlayer === 'r' ? 'b' : 'r';
    showBoard();
});
loadGame();

function memo(func) {
    let cache = new Map();
    return (...args) => {
        let key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = func(...args);
        cache.set(key, result);
        return result;
    }
}

let fibonacci = (n) => {
    if (n < 2) return n
    else return fibonacci(n-1) + fibonacci(n-2)
}

fibonacci = memo(fibonacci);

console.time("fibonacci without memoizer");
fibonacci(30);
console.timeEnd("fibonacci without memoizer");

console.time("fibonacci with memoizer");
fibonacci(30);
console.timeEnd("fibonacci with memoizer");

showBoard();