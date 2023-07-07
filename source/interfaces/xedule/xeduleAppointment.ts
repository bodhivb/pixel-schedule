import { IXeduleAttendeeIds } from "./xeduleAttendeeIds";

export interface IXeduleAppointment {
  appointments: {
    [key: number]: {
      id: number;
      attendeeIds: IXeduleAttendeeIds;
      code: string;
      name: string;
      type: string;
      start: string;
      end: string;
    };
  };
  days: {
    [key: number]: {
      id: number;
      appointmentIds: number[];
      date: string;
    };
  };
}
