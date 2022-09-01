import { formatDateTime } from "../../common/DateUtils";
import {
  MainReportDetail,
  PopRate,
  PopsReportDetail,
  ReportDetail,
  TemperatureReportDetail,
  WeatherReportResponseItem,
} from "../../@types/WeatherReport";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios").default;

export const getWeatherReport = async () => {
  let responseItems: WeatherReportResponseItem[];
  try {
    const url = process.env.WTHATHER_REPORT_URL;
    responseItems = (await axios.get(url)).data;
  } catch (e) {
    console.log("fetch error");
    return null;
  }
  return new WeatherReport(responseItems);
};

export class WeatherReport {
  reportDatetime: string;
  weather: string;
  popRate: PopRate;
  temp: {
    min: string,
    max: string
  };

  constructor(from: WeatherReportResponseItem[]) {
    const target = from[0];
    this.reportDatetime = formatDateTime(target.reportDateTime);
    this.weather = this.getWeather(target.timeSeries);
    this.popRate = this.getPopRate(target.timeSeries);
    this.temp = this.getTemprature(target.timeSeries);
  }

  private getWeather(detail: ReportDetail[]) {
    if (!this.isMainReport(detail[0].areas)) {
      return "";
    }
    return detail[0].areas[0].weathers[0];
  }

  private isMainReport(series: MainReportDetail[] |
    PopsReportDetail[] |
    TemperatureReportDetail[]
  ): series is MainReportDetail[] {
    return (series[0] as MainReportDetail).weathers !== undefined;
  }

  private getPopRate(detail: ReportDetail[]): PopRate {
    if (!this.isPopsReportDetail(detail[1].areas)) {
      return {
        from6to12: "",
        from12to18: "",
        from18to24: "",
      };
    }
    return {
      from6to12: detail[1].areas[0].pops[0],
      from12to18: detail[1].areas[0].pops[1],
      from18to24: detail[1].areas[0].pops[2],
    };
  }

  private isPopsReportDetail(series: MainReportDetail[] |
    PopsReportDetail[] |
    TemperatureReportDetail[]
  ): series is PopsReportDetail[] {
    return (series[0] as PopsReportDetail).pops !== undefined;
  }

  private getTemprature(detail: ReportDetail[]) {
    if (!this.isTemperatureReportDetail(detail[2].areas)) {
      return {
        min: "",
        max: "",
      };
    }
    return {
      // 朝7時時点では、最高気温と最低気温が同じになる
      min: "-",
      max: detail[2].areas[0].temps[0],
    };
  }

  private isTemperatureReportDetail(series: MainReportDetail[] |
    PopsReportDetail[] |
    TemperatureReportDetail[]
  ): series is TemperatureReportDetail[] {
    return (series[0] as TemperatureReportDetail).temps !== undefined;
  }
}
