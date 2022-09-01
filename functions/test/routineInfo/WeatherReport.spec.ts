import { getWeatherReport }
  from "../../src/routineInfo/weatherReport/WeatherReport";
it("get", async () => {
  console.log((await getWeatherReport()));
});
