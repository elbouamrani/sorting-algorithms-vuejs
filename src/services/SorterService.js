import { Bus } from "./BusService";

export const simple = (items) => {
  for (let index = 0; index < items.length; index++) {
    if (index + 1 === items.length) break;

    // console.log(items[index].value > items[index + 1].value);

    if (items[index].value > items[index + 1].value) {
      // console.log("swaping");

      Bus.$emit("swap", [index, index + 1]);

      const tmp = items[index + 1].value;
      items[index + 1].value = items[index].value;
      items[index].value = tmp;
      // console.log(items.map((item) => item.value));
    }
  }
  // console.log(items.map((item) => item.value));
  return items;
};
