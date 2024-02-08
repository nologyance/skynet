import { getEventsInNextMonday } from "./event/Calender";
import { weeklyEntryPoint } from "./event/EventMessageMapper";

export const createWeeklyContent = async () => {
  return weeklyEntryPoint(await getEventsInNextMonday());
};
