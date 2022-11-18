export const createTextField = () => {
  let el = document.createElement("input");
  el.type = "email";
  el.className = "testClass";

  return el;
};
