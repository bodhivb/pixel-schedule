import { TeacherFunction } from "../interfaces/teacher/teacherFunctionEnum";
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

  const img = createImage(teacher.imagePath, 80);
  img.classList.add("teacherImg");
  box.appendChild(img);

  const text = document.createElement("div");
  text.classList.add("teacherText");
  const teacherName = teacher.firstName + " " + (teacher.lastName ?? "");
  text.appendChild(createLabel(teacherName));

  if (teacher.function)
    text.appendChild(createLabel(TeacherFunction[teacher.function]));

  box.appendChild(text);
  box.classList.add("teacherBox");
  return box;
};
