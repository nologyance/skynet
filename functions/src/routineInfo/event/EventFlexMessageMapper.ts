import { Event } from "../../@types/Calender";

export const weeklyEntryPoint = async (events: void | Event[]) => {
  return entryPoint(events, "今週の予定");
};

export const dailyEntryPoint = async (events: void | Event[]) => {
  return entryPoint(events, "予定の更新");
};

export const entryPoint = async (events: void | Event[], title: string) => {
  return {
    type: bubble.prop,
    header: {
      type: box.prop,
      layout: baseline.prop,
      contents: [
        {
          type: text.prop,
          text: title,
          weight: bold.prop,
          size: space.xl,
        },
      ],
    },
    body: {
      type: box.prop,
      layout: vertical.prop,
      contents: [
        resolveEvent(events),
      ],
    },
  };
};

const resolveEvent = (events: void | Event[]) => {
  if (events === undefined || !events.length) {
    return {
      type: text.prop,
      text: "なし",
    };
  }
  return {
    type: box.prop,
    layout: vertical.prop,
    spacing: space.lg,
    contents: [
      ...eventContents(events),
    ],
  };
};

const eventContents = (events: Event[]) => {
  return events.map((event) => {
    return {
      type: box.prop,
      layout: vertical.prop,
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
    type: box.prop,
    layout: baseline.prop,
    spacing: space.sm,
    contents: [
      eventItem(creator + ": " + title),
    ],
  };
};

const dateTime = (startTime: string | null | undefined,
  endTime: string | null | undefined) => {
  return {
    type: box.prop,
    layout: baseline.prop,
    spacing: space.sm,
    contents: [
      eventItem(startTime + " ~ " + endTime),
    ],
  };
};

const eventItem = (str: string | null | undefined) => {
  return {
    type: text.prop,
    text: str ? str : "no content",
  };
};

const bubble = {
  prop: "bubble" as const,
};

const box = {
  prop: "box" as const,
};

const baseline = {
  prop: "baseline" as const,
};

const vertical = {
  prop: "vertical" as const,
};

const text = {
  prop: "text" as const,
};

const bold = {
  prop: "bold" as const,
};

const space = {
  xl: "xl" as const,
  sm: "sm" as const,
  lg: "lg" as const,
  xxl: "xxl" as const,
};
