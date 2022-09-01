import { getEventsInNextMonday } from "./event/Calender";
import { weeklyEntryPoint } from "./event/EventFlexMessageMapper";

export const createWeeklyContent = async () => {
  return weeklyEntryPoint(await getEventsInNextMonday());
};
