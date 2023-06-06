/**
 * Create a button element
 * @param text HTML text
 * @returns HTML button element
 */
export const createButton = (text: string = "") => {
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = text;

  return button;
};
