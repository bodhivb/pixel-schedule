/**
 * Create a file input element
 * @returns HTML input element
 */
export const createInputFile = (
  data: (value: string | any) => void,
  accept: string = "application/JSON"
) => {
  const el = document.createElement("input");
  el.type = "file";
  el.accept = accept;

  // File change event
  el.addEventListener("change", (event) => {
    // Get the file
    if (!event.target) return;
    const file = (<HTMLInputElement>event.target).files?.[0];
    if (!file) return;

    // Read the file
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target || !event.target.result) return;

      // Return the data of the file
      try {
        data(JSON.parse(event.target.result as string));
      } catch {
        data(event.target.result as string);
      }
    };
    reader.readAsText(file);
  });

  return el;
};
