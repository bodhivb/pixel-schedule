/**
 * Create a popup element
 * @param width Popup width
 * @returns HTML div element
 */
export const createPopup = (width: number = 500, child?: HTMLElement) => {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.style.maxWidth = width + "px";
  if (child) popup.appendChild(child);

  return popup;
};
