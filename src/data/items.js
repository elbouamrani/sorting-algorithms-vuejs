export const simple = [66, 44, 25, 88, 36, 85, 75, 45, 11, 87];

export const generateur = (size, max) => {
  const items = [];
  for (let index = 0; index < size; index++) {
    items.push(Math.round(Math.random() * max));
  }
  return items;
};
