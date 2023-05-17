/**
 * Create a button element
 * @param text HTML text
 * @returns HTML button element
 */
export const createImage = (url: string, size: number) => {
  const el = document.createElement("img");
  el.src = url;

  el.height = size;
  el.width = size;

  return el;
};
