import { Event } from "../../@types/Calender";
import { BASELINE, BOLD, BOX, BUBBLE, SPACE, TEXT, VERTICAL }
  from "../../common/FlexMessage";

export const weeklyEntryPoint = async (events: void | Event[]) => {
  return entryPoint(events, "今週の予定");
};

export const dailyEntryPoint = async (events: void | Event[]) => {
  return entryPoint(events, "予定の更新");
};

export const entryPoint = async (events: void | Event[], title: string) => {
  return {
    type: BUBBLE,
    header: header(title),
    body: body(events),
  };
};

const header = (title: string) => {
  return {
    type: BOX,
    layout: BASELINE,
    contents: [
      {
        type: TEXT,
        text: title,
        weight: BOLD,
        size: SPACE.xl,
      },
    ],
  };
};

const body = (events: void | Event[]) => {
  return {
    type: BOX,
    layout: VERTICAL,
    contents: [
      resolveEvent(events),
    ],
  };
};

const resolveEvent = (events: void | Event[]) => {
  if (events === undefined || !events.length) {
    return {
      type: TEXT,
      text: "なし",
    };
  }
  return {
    type: BOX,
    layout: VERTICAL,
    spacing: SPACE.lg,
    contents: [
      ...eventContents(events),
    ],
  };
};

const eventContents = (events: Event[]) => {
  return events.map((event) => {
    return {
      type: BOX,
      layout: VERTICAL,
      spacing: SPACE.sm,
      contents: [
        creatorAndTitle(event.creator, event.title),
        dateTime(event.startTime, event.endTime),
      ],
    };
  });
};

const creatorAndTitle = (creator: string, title: string | null | undefined) => {
  return {
    type: BOX,
    layout: BASELINE,
    spacing: SPACE.sm,
    contents: [
      eventItem(creator + ": " + title),
    ],
  };
};

const dateTime = (startTime: string | null | undefined,
  endTime: string | null | undefined) => {
  return {
    type: BOX,
    layout: BASELINE,
    spacing: SPACE.sm,
    contents: [
      eventItem(startTime + " ~ " + endTime),
    ],
  };
};

const eventItem = (str: string | null | undefined) => {
  return {
    type: TEXT,
    text: str ? str : "no content",
  };
};
