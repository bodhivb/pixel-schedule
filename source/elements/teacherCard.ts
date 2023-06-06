/**
 * Create a teacher card element
 * @param id id of the teacher card
 * @returns HTML div element
 */
export const createTeacherCard = (id: string) => {
  const card = document.createElement("div");
  card.id = id;
  card.classList.add("card");
  return card;
};
