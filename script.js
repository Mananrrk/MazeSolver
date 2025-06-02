const ROWS = 10;
const COLS = 10;

const algoSelect = document.getElementById('algoSelect');

let maze = [];
let start = null;
let end = null;
let mode = 'wall'; // default mode

const mazeDiv = document.getElementById('maze');

function createGrid() {
  mazeDiv.innerHTML = '';
  maze = [];

  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener('click', () => onCellClick(r, c));

      mazeDiv.appendChild(cell);
      row.push(cell);
    }
    maze.push(row);
  }
}

function setMode(newMode) {
  mode = newMode;
  console.log('Mode set to', mode);
}

function onCellClick(r, c) {
  const cell = maze[r][c];

  if (mode === 'start') {
    if (start) {
      start.classList.remove('start');
    }
    start = cell;
    start.classList.add('start');
    start.classList.remove('wall', 'end', 'path');

  } else if (mode === 'end') {
    if (end) {
      end.classList.remove('end');
    }
    end = cell;
    end.classList.add('end');
    end.classList.remove('wall', 'start', 'path');

  } else if (mode === 'wall') {
    if (cell.classList.contains('wall')) {
      cell.classList.remove('wall');
    } else {
      if (cell !== start && cell !== end) {
        cell.classList.add('wall');
      }
    }
  }
}

async function solveMaze() {
  if (!start || !end) {
    alert('Please set both start and end points.');
    return;
  }

  // Clear previous path visualization
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      maze[r][c].classList.remove('path');
    }
  }

  const algo = algoSelect.value;

  if (algo === 'bfs') {
    await solveWithBFS();
  } else if (algo === 'dfs') {
    await solveWithDFS();
  }
}

async function solveWithBFS() {
  const queue = [];
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  const startRow = +start.dataset.row;
  const startCol = +start.dataset.col;
  const endRow = +end.dataset.row;
  const endCol = +end.dataset.col;

  queue.push([startRow, startCol]);
  visited[startRow][startCol] = true;

  let found = false;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    if (r === endRow && c === endCol) {
      found = true;
      break;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nr < ROWS &&
        nc >= 0 &&
        nc < COLS &&
        !visited[nr][nc] &&
        !maze[nr][nc].classList.contains('wall')
      ) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        // Visualize visited cell
        if (maze[nr][nc] !== end && maze[nr][nc] !== start) {
          maze[nr][nc].classList.add('path');
          await sleep(50);
        }
      }
    }
  }

  if (!found) {
    alert('No path found!');
    return;
  }

  let path = [];
  let curr = [endRow, endCol];
  while (curr) {
    path.push(curr);
    curr = parent[curr[0]][curr[1]];
  }
  path.reverse();

  // Animate final path (skip start and end)
  for (let i = 1; i < path.length - 1; i++) {
    const [r, c] = path[i];
    maze[r][c].classList.add('path');
    await sleep(150);
  }
}

async function solveWithDFS() {
  const startRow = +start.dataset.row;
  const startCol = +start.dataset.col;
  const endRow = +end.dataset.row;
  const endCol = +end.dataset.col;

  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  let found = false;

  async function dfs(r, c) {
    if (r === endRow && c === endCol) {
      found = true;
      return true;
    }

    visited[r][c] = true;

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nr < ROWS &&
        nc >= 0 &&
        nc < COLS &&
        !visited[nr][nc] &&
        !maze[nr][nc].classList.contains('wall')
      ) {
        parent[nr][nc] = [r, c];
        await sleep(100);
        if (maze[nr][nc] !== end && maze[nr][nc] !== start) {
          maze[nr][nc].classList.add('path');
        }
        if (await dfs(nr, nc)) {
          return true;
        }
        if (maze[nr][nc] !== end && maze[nr][nc] !== start) {
          maze[nr][nc].classList.remove('path'); // backtrack visualization
          await sleep(50);
        }
      }
    }
    return false;
  }

  await dfs(startRow, startCol);

  if (!found) {
    alert('No path found!');
    return;
  }

  // Optional final path highlight
  let path = [];
  let curr = [endRow, endCol];
  while (curr) {
    path.push(curr);
    curr = parent[curr[0]][curr[1]];
  }
  path.reverse();

  for (let i = 1; i < path.length - 1; i++) {
    const [r, c] = path[i];
    maze[r][c].classList.add('path');
    await sleep(100);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetMaze() {
  start = null;
  end = null;
  mode = 'wall';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      maze[r][c].className = 'cell';
    }
  }
}

createGrid();