export interface  CreateJobCardDTO{
  checkOutTime:string
}

export interface JobCardResultDTO {
  jobCardID: number;
  ppNumber: string;
  deparment: string;
  employeeName: string;
  checkInTime: string;
  checkOutTime?: string;
  departmentId: number;
  size?: string;
  employeeNumber: string;
  quantity?: string;
  unit?: UnitDTO;
  duration?: string;
  jobCardStatus:string;
}

export interface UnitDTO {
  id: number;
  unitCode: string;
  unitName: string;
  unitSymbol: string;
}

export interface SearchJobCardParams {
  employee_id?: string;
  employee_name?: string;
  pp_no?: string;
  department?: string;
  status?: string;
  check_in_date?: string;
  check_out_date?: string;
  page_number?: string;
  item_per_page?: string;
}

