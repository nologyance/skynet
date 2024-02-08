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
    type: bubble.prop,
    body: {
      type: box.prop,
      layout: vertical.prop,
      contents: [
        ...resolveGCSchedule(getGCScheduleNow()),
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
