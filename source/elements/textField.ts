export const createTextField = (
  type: string = "text",
  placeholder: string = ""
) => {
  const el = document.createElement("input");
  el.type = type;
  el.name = type;
  if (placeholder != "") el.placeholder = placeholder;
  el.className = "testClass";

  return el;
};
