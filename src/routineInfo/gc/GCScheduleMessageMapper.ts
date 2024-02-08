/**
 * ごみ収集のスケジュールをFlexMessageに変換する
 * @param {string} schedule ごみ収集のスケジュール
 * @return {FlexMessage} ごみ収集のスケジュール
 */
export const resolveGCSchedule = (schedule: string) => {
  return [
    {
      type: TEXT,
      text: "今日のゴミ収集",
      size: space.xl,
      weight: BOLD,
    },
    {
      type: BOX,
      layout: BASELINE,
      spacing: space.sm,
      contents: [
        {
          type: TEXT,
          text: schedule,
        },
      ],
    },
  ];
};

const BOX = "box" as const;

const BASELINE = "baseline" as const;

const TEXT = "text" as const;

const BOLD = "bold" as const;

const space = {
  xl: "xl",
  sm: "sm",
  lg: "lg",
  xxl: "xxl",
} as const;
