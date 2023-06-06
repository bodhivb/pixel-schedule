import { TeacherFunction } from "../interfaces/teacher/teacherFunctionEnum";
import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { TeacherTeam } from "../interfaces/teacher/teacherTeamEnum";

/**
 * Return the primary/secondary color of the teacher box/card.
 * @param teacher teacher data
 * @returns [primaryColor, secondaryColor]
 */
export const getTeacherColor = (teacher: ITeacher) => {
  // All lob teachers are green
  if (teacher.function) {
    if (teacher.function == TeacherFunction.LOB) {
      // return green color
      return ["#46ae4d", "#a3cb78"];
    }
  }

  // Other teachers are colored by team
  if (teacher.team) {
    switch (teacher.team) {
      case TeacherTeam.DDM:
        // return orange color
        return ["#ff6600", "#f5a56e"];
      case TeacherTeam.SD:
        // return blue color
        return ["#617cbd", "#5879a6"];
    }
  }

  // return default color
  return ["#cccccc", "#ffffff"];
};

/**
 * Return the primary/secondary color number of the teacher box/card.
 * @param teacher
 * @returns [primaryColor, secondaryColor]
 */
export const getTeacherColorNumber = (teacher: ITeacher) => {
  const color = getTeacherColor(teacher);
  color[0] = color[0].replace("#", "0x");
  color[1] = color[1].replace("#", "0x");
  return color.map((c) => parseInt(c));
};
