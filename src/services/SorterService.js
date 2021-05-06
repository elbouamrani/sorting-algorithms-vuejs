import { Bus } from "./BusService";

const validateur = (data) => {
  for (let index = 0; index < data.length; index++) {
    if (data[index] > data[index + 1]) {
      return false;
    }
  }
  return true;
};

const swap = (items, i, j) => {
  Bus.$emit("swap", [i, j]);

  var tmp = items[i];
  items[i] = items[j];
  items[j] = tmp;
};

const partition = (items, pivot, left, right) => {
  var pivotValue = items[pivot],
    partitionIndex = left;

  for (var i = left; i < right; i++) {
    if (items[i] < pivotValue) {
      swap(items, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(items, right, partitionIndex);
  return partitionIndex;
};

export const Sorter = (data, algorithm) => {
  algorithm([...data]);
};

export const Algorithms = {
  simple: (items) => {
    while (!validateur(items)) {
      for (let index = 0; index < items.length; index++) {
        if (index + 1 === items.length) break;
        if (items[index] > items[index + 1]) {
          swap(items, index, index + 1);
        }
      }
    }
    return items;
  },
  bubbleSort: (items) => {
    for (let i = items.length - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        if (items[j - 1] > items[j]) {
          swap(items, j, j - 1);
        }
      }
    }
    return items;
  },
  selectionSort: (items) => {
    let minIndex;

    for (let i = 0; i < items.length; i++) {
      minIndex = i;
      for (let j = i + 1; j < items.length; j++) {
        if (items[j] < items[minIndex]) {
          minIndex = j;
        }
      }
      swap(items, minIndex, i);
    }
    return items;
  },
  quickSort: (items, left = 0, right) => {
    var pivot, partitionIndex;

    if (!right) {
      right = items.length;
    }
    console.log(right);

    if (left < right) {
      pivot = right;
      partitionIndex = partition(items, pivot, left, right);

      Algorithms.quickSort(items, left, partitionIndex - 1);
      Algorithms.quickSort(items, partitionIndex + 1, right);
    }
    return items;
  }
};
