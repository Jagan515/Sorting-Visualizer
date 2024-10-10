const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
  }
  
  const defaultCompare = (a, b) => {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
  
  const partition = (array, left, right, compareFn, swaps) => {
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
  
    while (i <= j) {
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        if (i <= j) {
            // Swap using destructuring
            [array[i], array[j]] = [array[j], array[i]];
            swaps.push({ firstPostion: i, lastPosition: j });
            i++;
            j--;
        }
    }
  
    return i;
  }
  
  const quick = (array, left, right, compareFn, swaps) => {
    if (left < right) {
        const index = partition(array, left, right, compareFn, swaps);
        if (left < index - 1) {
            quick(array, left, index - 1, compareFn, swaps);
        }
        if (index < right) {
            quick(array, index, right, compareFn, swaps);
        }
    }
  }
  
  class SortingAlgorithms {
      
    bubbleSort(array) {
        const swaps = [];
        const len = array.length; // Cache length to avoid recalculating
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap using destructuring
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swaps.push({ firstPostion: j, lastPosition: j + 1 });
                }
            }
        }
        return swaps;
    }
  
    selectionSort(array) {
        const swaps = [];
        const len = array.length; // Cache length to avoid recalculating
        for (let i = 0; i < len - 1; i++) {
            let min = i;
            for (let j = i + 1; j < len; j++) {
                if (array[j] < array[min]) {
                    min = j;
                }
            }
            if (min !== i) { // Only swap if needed
                // Swap using destructuring
                [array[min], array[i]] = [array[i], array[min]];
                swaps.push({ firstPostion: min, lastPosition: i });
            }
        }
        return swaps;
    }
  
    quickSort(array, compareFn = defaultCompare) {
        const swaps = []; // Localize swaps to this method
        quick(array, 0, array.length - 1, compareFn, swaps);
        return swaps;
    }
  
    // Insertion Sort
    insertionSort(array) {
        const swaps = [];
        const len = array.length; // Cache length to avoid recalculating
        for (let i = 1; i < len; i++) {
            let j = i - 1;
            const current = array[i];
            while (j >= 0 && array[j] > current) {
                // Swap using destructuring
                array[j + 1] = array[j];
                swaps.push({ firstPostion: j + 1, lastPosition: j });
                j--;
            }
            array[j + 1] = current;
        }
        return swaps;
    }
  
  
    // Heap Sort
    heapSort(array) {
        const swaps = [];
        const heapify = (arr, n, i) => {
            let largest = i; // Initialize largest as root
            const left = 2 * i + 1; // left = 2*i + 1
            const right = 2 * i + 2; // right = 2*i + 2
  
            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }
  
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }
  
            if (largest !== i) {
                // Swap using destructuring
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                swaps.push({ firstPostion: i, lastPosition: largest });
  
                heapify(arr, n, largest);
            }
        }
  
        const n = array.length;
  
        // Build heap (rearrange array)
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(array, n, i);
        }
  
        // One by one extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            // Swap
            [array[0], array[i]] = [array[i], array[0]];
            swaps.push({ firstPostion: 0, lastPosition: i });
  
            heapify(array, i, 0);
        }
        return swaps;
    }
  }
  
  export {
    SortingAlgorithms
  }
  