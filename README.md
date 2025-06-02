# Maze Solver

A simple interactive Maze Solver web app that lets users create a maze, set start and end points, draw walls, and visualize the pathfinding process using either **Breadth-First Search (BFS)** or **Depth-First Search (DFS)** algorithms.

---

## Features

- Interactive grid-based maze creation
- Set **Start** and **End** points
- Draw and remove walls to create obstacles
- Choose between BFS and DFS algorithms to solve the maze
- Animated visualization of the pathfinding process
- Reset functionality to clear the maze and start over

---

## Demo

![Maze Solver Demo](demo.gif)  
*(Add a demo GIF or screenshot here if you want)*

---

## How to Use

1. Click **Set Start** and click a cell to set the starting point.
2. Click **Set End** and click a cell to set the ending point.
3. Click **Draw Walls** and click cells to toggle walls (obstacles).
4. Select the algorithm (BFS or DFS) from the dropdown.
5. Click **Solve Maze** to see the algorithm visualize the pathfinding.
6. Click **Reset** to clear the maze and start fresh.

---

## Technologies Used

- HTML5
- CSS3 (external stylesheet)
- JavaScript (Vanilla JS)

---

## Code Structure

- `index.html`: Main HTML structure and UI elements.
- `styles.css`: External stylesheet for styling the grid and controls.
- `script.js`: Contains all JavaScript logic including grid creation, event handling, and pathfinding algorithms.

---

## Algorithm Explanation

- **BFS (Breadth-First Search):** Finds the shortest path in terms of steps, guaranteed to find the shortest path in an unweighted grid.
- **DFS (Depth-First Search):** Explores as far as possible down each branch before backtracking; may not find the shortest path but can be faster in some cases.

---

## How to Run Locally

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Start creating and solving mazes!

---

## Future Improvements

- Add diagonal movements support.
- Add weighted paths for more complex algorithms (like A*).
- Improve UI with more controls and customization.
- Add maze generation algorithms.

---

## License

This project is open source and free to use.

---

## Author

Manan Goyal – [GitHub Profile](https://github.com/mananrrk)  
Contact: manan.goyal@example.com

---

Feel free to contribute, report bugs, or suggest features!
