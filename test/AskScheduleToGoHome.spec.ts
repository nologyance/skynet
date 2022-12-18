import { createMessage } from "../src/AskScheduleToGoHome";
import { toQuickReplyItem } from "../src/common/MessageFactory";

it("createMessage", () => {
  expect(createMessage())
    .toStrictEqual({
      type: "text",
      text: "今日の帰宅予定は？",
      quickReply: {
        items: [
          "19:00まで",
          "19:30くらい",
          "20:00くらい",
          "20:30くらい",
          "21:00くらい",
          "21:30過ぎるくらい",
        ].map((time) => toQuickReplyItem({
          label: `${time}に`,
          data: `first_${time}`,
          displayText: `「${time}」で登録しました`,
        })),
      },
    });
});
