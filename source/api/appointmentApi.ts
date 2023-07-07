import { IXeduleAppointment } from "../interfaces/xedule/xeduleAppointment";
import { XeduleApi } from "./xeduleApi";

export class AppointmentApi extends XeduleApi<IXeduleAppointment> {
  constructor() {
    super("Appointment/Date/");
  }

  /**
   * Get the appointment for the current week with selected attendee
   * @returns
   */
  public async getAppointment(...attendeeIds: number[]): Promise<any[]> {
    // Week date
    const today = new Date();
    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );

    return super.get(
      this.dateToPath(today) +
        "/" +
        this.dateToPath(nextWeek) +
        "/Attendee?id=" +
        attendeeIds.join("&id=")
    );
  }

  /**
   * Convert date to xedule path format
   * @param date
   * @returns
   */
  public dateToPath(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}
