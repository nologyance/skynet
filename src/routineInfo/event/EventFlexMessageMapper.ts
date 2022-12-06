import { Event } from "../../@types/Calender";

export const weeklyEntryPoint = async (events: void | Event[]) => {
  return entryPoint(events, "今週の予定");
};

export const dailyEntryPoint = async (events: void | Event[]) => {
  return entryPoint(events, "予定の更新");
};

export const entryPoint = async (events: void | Event[], title: string) => {
  return {
    type: bubble,
    header: {
      type: box,
      layout: baseline,
      contents: [
        {
          type: text,
          text: title,
          weight: bold,
          size: space.xl,
        },
      ],
    },
    body: {
      type: box,
      layout: vertical,
      contents: [
        resolveEvent(events),
      ],
    },
  };
};

const resolveEvent = (events: void | Event[]) => {
  if (events === undefined || !events.length) {
    return {
      type: text,
      text: "なし",
    };
  }
  return {
    type: box,
    layout: vertical,
    spacing: space.lg,
    contents: [
      ...eventContents(events),
    ],
  };
};

const eventContents = (events: Event[]) => {
  return events.map((event) => {
    return {
      type: box,
      layout: vertical,
      spacing: space.sm,
      contents: [
        creatorAndTitle(event.creator, event.title),
        dateTime(event.startTime, event.endTime),
      ],
    };
  });
};

const creatorAndTitle = (creator: string, title: string | null | undefined) => {
  return {
    type: box,
    layout: baseline,
    spacing: space.sm,
    contents: [
      eventItem(creator + ": " + title),
    ],
  };
};

const dateTime = (startTime: string | null | undefined,
  endTime: string | null | undefined) => {
  return {
    type: box,
    layout: baseline,
    spacing: space.sm,
    contents: [
      eventItem(startTime + " ~ " + endTime),
    ],
  };
};

const eventItem = (str: string | null | undefined) => {
  return {
    type: text,
    text: str ? str : "no content",
  };
};

const bubble = "bubble" as const;

const box = "box" as const;

const baseline = "baseline" as const;

const vertical = "vertical" as const;

const text = "text" as const;

const bold = "bold" as const;

const space = {
  xl: "xl",
  sm: "sm",
  lg: "lg",
  xxl: "xxl",
} as const;
