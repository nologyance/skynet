import { createMessage, quickReply } from "../src/AskScheduleToGoHome";

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
        ].map((time) => quickReply(time)),
      },
    });
});
