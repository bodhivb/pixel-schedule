/**
 * Create a input element
 * @param type The type of the text field
 * @param placeholder The placeholder text
 * @param autocomplete The autocomplete value
 * @returns HTML input element
 */
export const createInput = (
  type: string = "text",
  placeholder: string = "",
  autocomplete: string = ""
) => {
  const el = document.createElement("input");
  el.type = type;
  el.name = type;
  if (placeholder != "") el.placeholder = placeholder;
  if (autocomplete != "") el.autocomplete = autocomplete;
  el.className = "testClass";
  el.required = true;

  return el;
};
