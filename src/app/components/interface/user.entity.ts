export interface UserDTO {
    id: number;
    userName: string;
    fullName: string;
    nic: string;
    contactNumber: string;
    email: string;
    gender: string;
    address: string;
    city: string;
    district: string;
    province: string;
    userPassword: string;
}

export interface RoleDto {
    roleId: number;
    roleName: string;
    permission: string;
    roleStatus: string;
}

export interface VehicleDto {
    id: number;
    model: string;
    createdAt: string;
    vehicleType: string;
    vehicleNumber: string;
    manufactureYear: string;
}

export interface EmergencyPersonDto {
    id: number;
    nic: string;
    email: string;
    gender: string;
    address: string;
    relation: string;
    personName: string;
    contactNumber: string;
}

export interface UserDataDTO {
    userId: number;
    userName: string;
    fullName: string;
    nic: string;
    contactNumber: string;
    email: string;
    gender: string;
    address: string;
    city: string;
    district: string;
    province: string;
    userPassword: string;
    role: RoleDto;
    vehicle: VehicleDto | null;
    device: any; // Can be typed as DeviceDto if available
    emergencyPerson: EmergencyPersonDto;
    notifications: any; // Can be typed if notification structure is known
}
