/**
 * Interface for linking Xedule teachers to their pixel images.
 */
export interface ILinkTeacher {
  /** Xedule teacher id. */
  teacherId: number;

  /** File name or existing teachers pixel image. */
  imageKey: string;
}
