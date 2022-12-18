import { createNoticeChangeMessageWithPreMessage }
  from "../src/NoticeScheduleToGoHome";

it("createNoticeChangeMessage", () => {
  const replyItem = (time: string) => {
    return {
      type: "action",
      action: {
        type: "postback",
        label: `${time}に`,
        data: `update_${time}`,
        displayText: `「${time}」で登録しました`,
      },
    };
  };
  const createMessageMock = jest.fn(
    () => "ユーザーA は 19:00までに\nユーザーB は 20:00くらいに帰るそうです。");
  expect(createNoticeChangeMessageWithPreMessage(createMessageMock()))
    .toStrictEqual({
      quickReply: {
        items: [
          "19:00まで",
          "19:30くらい",
          "20:00くらい",
          "20:30くらい",
          "21:00くらい",
          "21:30過ぎるくらい",
        ].map((time) => replyItem(time)),
      },
      text: `ユーザーA は 19:00までに
ユーザーB は 20:00くらいに帰るそうです。
予定を変更しますか？変更する場合は返信してください。`,
      type: "text",
    });
});
