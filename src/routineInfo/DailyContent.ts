import { BOX, BUBBLE, VERTICAL } from "../common/FlexMessage";
import { getEventsInNextMondayOnlyHavingDiff } from "./event/Calender";
import { dailyEntryPoint } from "./event/EventMessageMapper";
import { resolveGCSchedule } from "./gc/GCScheduleMessageMapper";
import { getGCScheduleNow } from "./gc/GetGCSchedule";

export const getUpdatedEvent = async () => {
  const events = await getEventsInNextMondayOnlyHavingDiff();
  if (events == null) {
    return null;
  }
  return dailyEntryPoint(events);
};

export const dailyContent = async () => {
  return {
    type: BUBBLE,
    body: {
      type: BOX,
      layout: VERTICAL,
      contents: [
        ...resolveGCSchedule(getGCScheduleNow()),
      ],
    },
  };
};
