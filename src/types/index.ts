import{ Dayjs} from "dayjs";

export type EmployeeFromDB = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth:  Date;
  startDate: Date;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  department: string;
};
export type EmployeeFromDBConvert = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs;
  startDate: Dayjs;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  department: string;
};
export type EmployeeToDB = {
  id: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: Dayjs;
  StartDate: Dayjs;
  Street: string;
  City: string;
  State: string;
  ZipCode: number;
  Department: string;
};
export type EmployeeToDBConvert = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Dayjs;
  startDate: Dayjs;
  street: string;
  city: string;
  state: number;
  zipCode: number;
  department: number;
};

export type User = {
  email: string;
  password: string;
};