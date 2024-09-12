export interface EmployeeDTO {
  employeeId: number
  employeeCode: string
  employeeFullName: string
  employeeDisplayName: string
  employeeCategoryId: number
  employeeCategoryName: string
  employeeStatus: string
}

export interface EmployeeResultDTO {
  category: {
    id: number;
    code: string;
    name: string;
    status: string;
    level: string;
  };
  code: string;
  contactNumber: string;
  createdAt: string;
  createdBy: number;
  deletedAt: string | null;
  deletedBy: number | null;
  department: {
    id: number;
    code: string;
    name: string;
    departmentStatus: string;
    createdBy: number;
  };
  displayName: string;
  email: string;
  employeeStatus: string;
  fullName: string;
  gender: string;
  id: number;
  joinDate: string;
  nic: string;

}

export interface Department {
  id: number;
  code: string;
  name: string;
  departmentStatus: string;
}
