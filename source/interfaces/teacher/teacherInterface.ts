import { TeacherFunction } from "./teacherFunctionEnum";
import { TeacherTeam } from "./teacherTeamEnum";
import { ITeacherSkill } from "./teacherSkillInterface";

export interface ITeacher {
  // Required properties
  firstName: string;
  imageKey: string;
  imagePath: string;

  // Optional properties
  lastName?: string;
  function?: TeacherFunction;
  team?: TeacherTeam;
  skills?: ITeacherSkill[];
}

export function isTeacher(data: any): data is ITeacher {
  return data && data.firstName && data.imageKey && data.imagePath;
}
