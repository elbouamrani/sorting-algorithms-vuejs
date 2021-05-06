import { Bus } from "./BusService";

const validateur = (data) => {
  for (let index = 0; index < data.length; index++) {
    if (data[index] > data[index + 1]) {
      return false;
    }
  }
  return true;
};

export const Sorter = (data, algorithm) => {
  const emitter = (itemToSwap) => {
    Bus.$emit("swap", itemToSwap);
  };

  algorithm(data, emitter);
};

export const Algorithms = {
  simple: (data) => {
    const items = [...data];

    while (!validateur(items)) {
      for (let index = 0; index < items.length; index++) {
        if (index + 1 === items.length) break;
        if (items[index] > items[index + 1]) {
          Bus.$emit("swap", [index, index + 1]);
          const tmp = items[index + 1];
          items[index + 1] = items[index];
          items[index] = tmp;
        }
      }
    }
    return items;
  },
  bubbleSort: (data) => {
    console.log("bubbleSort");
    const arr = [...data];

    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 1; j <= i; j++) {
        if (arr[j - 1] > arr[j]) {
          var temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
          Bus.$emit("swap", [j, j - 1]);
        }
      }
    }
    return arr;
  },
  selectionSort: (data) => {
    console.log("selectionSort");
    const arr = [...data];

    var minIdx,
      temp,
      len = arr.length;
    for (var i = 0; i < len; i++) {
      minIdx = i;
      for (var j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      Bus.$emit("swap", [minIdx, i]);
    }
    return arr;
  }
};
