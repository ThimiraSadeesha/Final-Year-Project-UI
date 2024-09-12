export interface SearchPlanCardDTO {
  id: number;
  ppNo: string;
  department: string;
  empNo: string;
  checkInTime: string;
  checkOutTime: string;
  empName: string;
  quantity: number;
  unit: string;
  duration: string;
  status: string;
}

// export interface JobRecordDTO{
//   checkInTime: string | null;
//   checkOutTime: string | null;
//   duration: string | null | undefined;
//   department: string;
//   empName: string;
//   empNo: string;
//   id: number;
//   ppNo: string;
//   quantity: number | null;
//   status: string;
//   unit: string | null;
// }

export interface UnitDTO {
  id: number;
  unitCode: string;
  unitName: string;
  unitSymbol: string;
  unitStatus: string;
  createdBy: string;
  updatedBy?: string | null;
  deletedBy?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface JobRecordDTO {
  id: number;
  ppNo: string;
  department: string;
  empNo: string;
  checkInTime: string;
  checkOutTime: string;
  empName: string;
  quantity: string;
  duration: string;
  status: string;
  // unit: UnitDTO;
  unitName: string;
}

export interface JobCardSearchResultDTO {
  ppNo: string;
  unitName?: string ;
  jobCardId: number;
  jobStatus: string;
  department: string;
  duration: string;
  quantity: string;
  size: string;
  employeeName: string;
  employeeNumber: string;
  checkInTime: string;
  checkOutTime?: string;
}



export interface CheckJobCard{
  id: number;
  value: number;
}