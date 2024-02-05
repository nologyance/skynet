/**
 * ごみ収集のスケジュールをFlexMessageに変換する
 * @param {string} schedule ごみ収集のスケジュール
 * @return {FlexMessage} ごみ収集のスケジュール
 */
export const resolveGCSchedule = (schedule: string) => {
  return [
    {
      type: text.prop,
      text: "今日のゴミ収集",
      size: space.xl,
      weight: bold.prop,
    },
    {
      type: box.prop,
      layout: baseline.prop,
      spacing: space.sm,
      contents: [
        {
          type: text.prop,
          text: schedule,
        },
      ],
    },
  ];
};

const box = {
  prop: "box" as const,
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
