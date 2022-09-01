import { WeatherReport } from "./WeatherReport";

export const resolveWeatherReport = (report: WeatherReport | null) => {
  if (report === null) {
    return [];
  }
  return [
    {
      type: text.prop,
      text: "今日の天気",
      weight: bold.prop,
      size: space.xl,
    },
    {
      type: box.prop,
      layout: vertical.prop,
      spacing: space.sm,
      contents: [
        ...abstract(report.weather),
        temperatureContent("最高", report.temp.max),
        temperatureContent("最低", report.temp.min),
        {
          type: text.prop,
          text: "降水確率",
          weight: bold.prop,
        },
        popReteContent("6時~12時", report.popRate.from6to12),
        popReteContent("12時~18時", report.popRate.from12to18),
        popReteContent("18時~24時", report.popRate.from18to24),
      ],
    },
  ];
};

const abstract = (weather: string) => {
  return [
    {
      type: text.prop,
      text: "概況",
      weight: bold.prop,
    },
    {
      type: text.prop,
      text: weather,
      wrap: true,
    },
  ];
};

const temperatureContent = (maxOrmin: string, temperature: string) => {
  return {
    type: box.prop,
    layout: baseline.prop,
    spacing: space.lg,
    contents: [
      {
        type: text.prop,
        text: maxOrmin + "気温",
        weight: bold.prop,
      },
      {
        type: text.prop,
        text: temperature + "℃",
      },
    ],
  };
};

const popReteContent = (between: string, rate: string) => {
  return {
    type: box.prop,
    layout: baseline.prop,
    spacing: space.sm,
    contents: [
      {
        type: text.prop,
        text: between,
        weight: bold.prop,
      },
      {
        type: text.prop,
        text: rate + "%",
      },
    ],
  };
};

const box = {
  prop: "box" as const,
};

const vertical = {
  prop: "vertical" as const,
};

const baseline = {
  prop: "baseline" as const,
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
