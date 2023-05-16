/**
 * Create a label element
 * @param text HTML text
 * @returns HTML label element
 */
export const createLabel = (text: string = "") => {
  const label = document.createElement("label");
  label.innerHTML = text;
  return label;
};
