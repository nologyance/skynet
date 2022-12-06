import { getEventsInNextMondayOnlyUpdatedFromYesterday }
  from "./event/Calender";
import { dailyEntryPoint } from "./event/EventFlexMessageMapper";
import { resolveGCSchedule } from
  "./gc/GarbageCollectionScheduleFlexMessageMapper";
import { getGarbageCollectionSchedule as getGCSchedule }
  from "./gc/GetGarbageCollectionSchedule";
import { getWeatherReport } from "./weatherReport/WeatherReport";
import { resolveWeatherReport }
  from "./weatherReport/WeatherReportFlexMessageMapper";

export const getUpdatedEvent = async () => {
  const events = await getEventsInNextMondayOnlyUpdatedFromYesterday();
  if (events == null) {
    return null;
  }
  return dailyEntryPoint(events);
};

export const dailyContent = async () => {
  return {
    type: bubble.prop,
    body: {
      type: box.prop,
      layout: vertical.prop,
      contents: [
        ...resolveGCSchedule(getGCSchedule()),
        ...resolveWeatherReport(await getWeatherReport()),
      ],
    },
  };
};

const bubble = {
  prop: "bubble" as const,
};

const box = {
  prop: "box" as const,
};

const vertical = {
  prop: "vertical" as const,
};
