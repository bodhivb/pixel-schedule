/**
 * Create a box element
 * @param id id of the box
 * @returns HTML div element
 */
export const createBox = (id: string) => {
  const box = document.createElement("div");
  box.id = id;
  return box;
};
