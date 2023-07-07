import { TeacherFunction } from "../interfaces/teacher/teacherFunctionEnum";
import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { getTeacherColor } from "../utils/teacherColor";
import { createImage } from "./image";
import { createLabel } from "./label";

/**
 * Create a teacher box element
 * @param id id of the teacher box
 * @returns HTML div element
 */
export const createTeacherBox = (teacher: ITeacher) => {
  // Create box
  const box = document.createElement("div");
  box.id = teacher.firstName ?? "Teacher";
  box.classList.add("teacherBox");

  const color = getTeacherColor(teacher);
  box.style.setProperty("background-color", color[1]);

  // Add image
  const img = createImage(teacher.imagePath, 80);
  img.style.setProperty("background-color", color[0]);
  img.style.setProperty("border", "4px solid " + color[1]);
  box.appendChild(img);

  // Add text
  const text = document.createElement("div");
  text.classList.add("teacherText");

  let teacherName = "";
  if (teacher.firstName || teacher.lastName) {
    teacherName = (teacher.firstName ?? "") + " " + (teacher.lastName ?? "");
  } else {
    teacherName = teacher.imageKey;
  }

  text.appendChild(createLabel(teacherName));

  if (teacher.function)
    text.appendChild(createLabel(TeacherFunction[teacher.function]));

  box.appendChild(text);
  return box;
};
