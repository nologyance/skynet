import { TEXT, BOLD, BOX, BASELINE, SPACE } from "../../common/FlexMessage";

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
      size: SPACE.xl,
      weight: BOLD,
    },
    {
      type: BOX,
      layout: BASELINE,
      spacing: SPACE.sm,
      contents: [
        {
          type: TEXT,
          text: schedule,
        },
      ],
    },
  ];
};
