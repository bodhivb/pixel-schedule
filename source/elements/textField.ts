export const createTextField = (type: string = "text") => {
  const el = document.createElement("input");
  el.type = type;
  el.name = type;
  el.className = "testClass";

  return el;
};
