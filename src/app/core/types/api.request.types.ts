import {APIRequestResources} from "../enums"


export type APIRequestResource =
  APIRequestResources.AuthService |
  APIRequestResources.EmployeeService |
  APIRequestResources.PlanCardService |
  APIRequestResources.UnitService



export type APIRequestMethod = 'delete' | 'get' | 'post' | 'put'

export type APIRequestCacheStrategy = 'performance' | 'freshness'
