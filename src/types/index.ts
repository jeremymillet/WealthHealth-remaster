import{ Dayjs} from "dayjs";

export type Employee = {
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

export type EmployeeFormValues = {
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  StartDate: string;
  Street: string;
  City: string;
  State: number;
  ZipCode: number;
  Department: number;
};

export type User = {
  email: string;
  password: string;
};
export type Department = {
  id: number;
  value: string;
  label: string;
}

export type States = {
  id: number;
  value: string;
  label: string;
}