export interface DeviceDto {
    id: number;
    type: string;
    userId: number;
    deviceId: string;
    vehicleId: number;
    deviceStatus: string;
    lastMaintenance: string;
}

export interface IncidentDto {
    id: number;
    serverity: string;
    location: string;
    incidentTime: string;
    incidentStatus: string;
    device: DeviceDto;
}