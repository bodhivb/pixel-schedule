import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { createImage } from "./image";
import { createLabel } from "./label";

/**
 * Create a teacher box element
 * @param id id of the teacher box
 * @returns HTML div element
 */
export const createTeacherBox = (teacher: ITeacher) => {
  const box = document.createElement("div");
  box.id = teacher.firstName;

  box.appendChild(createLabel(teacher.firstName));
  box.appendChild(createImage(teacher.imagePath, 100));

  box.classList.add("teacherBox");
  return box;
};
