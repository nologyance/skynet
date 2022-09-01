export type PopRate = {
  from6to12: string,
  from12to18: string,
  from18to24: string
}

export type WeatherReportResponseItem = {
  publishingOffice: string,
  reportDateTime: string,
  timeSeries: ReportDetail[],
}

export type ReportDetail = {
  areas: MainReportDetail[] | PopsReportDetail[] | TemperatureReportDetail[],
  timeDifines: string[]
}

export type MainReportDetail = {
  area: Area,
  waves: Wave[],
  weatherCodes: WeatherCode[],
  weathers: Weather[],
  winds: Wind[]
}

export type PopsReportDetail = {
  area: Area,
  pops: Pop[],
}

export type TemperatureReportDetail = {
  area: Area,
  temps: Temperature[],
}

export type Area = string

export type Wave = string

export type Pop = string

export type WeatherCode = string

export type Weather = string

export type Wind = string

export type Temperature = string
