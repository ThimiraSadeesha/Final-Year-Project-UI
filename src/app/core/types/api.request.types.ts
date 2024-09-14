import {APIRequestResources} from "../enums"
import {IncidentService} from "../../components/services/incident.service";


export type APIRequestResource =
  APIRequestResources.AuthService |
  APIRequestResources.EmployeeService |
  APIRequestResources.HospitalService |
  APIRequestResources.UserService |
  APIRequestResources.FireService |
  APIRequestResources.PoliceService |
  APIRequestResources.InsuranceService |
  APIRequestResources.IncidentService |
  APIRequestResources.ResponseService



export type APIRequestMethod = 'delete' | 'get' | 'post' | 'put'

export type APIRequestCacheStrategy = 'performance' | 'freshness'
