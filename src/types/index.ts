import{ Dayjs} from "dayjs";

export type User = {
  Id: number;
  FirstName: string;
  LastName: string;
  DateOfBirth:  Dayjs;
  StartDate: Dayjs;
  Street: string;
  City: string;
  State: string;
  ZipCode: number;
  Department: string;
};