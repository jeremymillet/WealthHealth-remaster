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