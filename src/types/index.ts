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
export type UserDB = {
  Id: number;
  FirstName: string;
  LastName: string;
  DateOfBirth:  Dayjs;
  StartDate: Dayjs;
  Street: string;
  City: string;
  State: number;
  ZipCode: number;
  Department: number;
};