import { IXeduleFacilityType } from "./xeduleFacilityType";

export interface IXeduleClassroom {
  id: number;
  code: string;
  location: string;
  facilityTypes: IXeduleFacilityType[];
}
