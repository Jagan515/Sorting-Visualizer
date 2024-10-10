import { sleep } from "./helper/util.js";
import { SortingAlgorithms } from "./helper/sortingAlgorithms.js";

let nBars = 10;
let numbersBars = document.getElementById('numbersBars');
const stage = document.getElementById('stage');
stage.style.width = `${nBars * 30}px`;
const selectAlgorithm = document.getElementById('selectAlgorithm');
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');

let bars = [];
let barsDivs = [];
let isAlreadySorted = false; // Flag to track if array is sorted

const sortingAlgorithms = new SortingAlgorithms({});

const start = () => {
  stage.innerHTML = '';

  bars = Array.from({ length: nBars }, () => ({
    width: 20,
    height: Math.floor(Math.random() * 200) + 1,
  }));

  barsDivs = bars.map((bar, i) => {
    const barDiv = document.createElement('div');
    barDiv.style.width = `${bar.width}px`;
    barDiv.style.height = `${bar.height}px`;
    barDiv.style.left = `${5 + i * 30}px`;
    barDiv.classList.add('bar');
    stage.appendChild(barDiv);
    return barDiv;
  });

  // Reset the flag and re-enable the solve button when a new array is generated
  isAlreadySorted = false; // New array, not yet sorted
  solveBtn.disabled = false; // Re-enable the solve button
};

start();

async function swapBars(barsDivs, i, j) {
  [barsDivs[i].style.left, barsDivs[j].style.left] = [`${5 + j * 30}px`, `${5 + i * 30}px`];
  barsDivs[i].classList.add('activate');
  barsDivs[j].classList.add('activate');
  await sleep(300);
  barsDivs[i].classList.remove('activate');
  barsDivs[j].classList.remove('activate');
  [barsDivs[i], barsDivs[j]] = [barsDivs[j], barsDivs[i]]; // Swap references
}

// Function to check if the array is already sorted
const isSorted = (array) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
};
const algorithms = [
  sortingAlgorithms.bubbleSort,
  sortingAlgorithms.selectionSort,
  sortingAlgorithms.quickSort,  
  sortingAlgorithms.insertionSort, // Add Insertion Sort
  sortingAlgorithms.heapSort       // Add Heap Sort
];

const solve = async () => {
  if (isAlreadySorted) {
    return; // Do nothing if array has already been sorted
  }

  const array = structuredClone(bars.map(el => el.height));

  // Check if the array is already sorted
  if (isSorted(array)) {
    isAlreadySorted = true; // Set the flag to prevent further sorting
    return; // Do nothing if already sorted
  }

  // Disable the solve button to prevent multiple clicks
  solveBtn.disabled = true;

  const swaps = algorithms[selectAlgorithm.selectedIndex](array);

  for (const swap of swaps) {
    if (swap.firstPostion !== swap.lastPosition) {
      await swapBars(barsDivs, swap.firstPostion, swap.lastPosition);
    }
  }

  isAlreadySorted = true; // Mark the array as sorted after completing the sort
};

generateBtn.addEventListener('click', () => {
  const value = parseInt(numbersBars.value, 10);

  // Validate input value before generating the new array
  if (value < 1 || value > 30) {
      alert("Please enter a number between 1 and 30.");
      numbersBars.value = 10; // Reset to default value
      nBars = 10; // Update nBars to default value
  } else {
      nBars = value; // Update nBars to the valid input
      stage.style.width = `${nBars * 30}px`;
  }
  
  start();
});

solveBtn.addEventListener('click', solve);
