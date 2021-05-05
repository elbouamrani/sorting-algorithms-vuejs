import { Bus } from "./BusService";

export const simple = (data) => {
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
};

export const validateur = (data) => {
  for (let index = 0; index < data.length; index++) {
    if (data[index] > data[index + 1]) {
      return false;
    }
  }
  return true;
};
