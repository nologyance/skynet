import * as functions from "firebase-functions";
import { LineClient } from "./common/LineClient";
import { Message, QuickReplyItem } from "@line/bot-sdk";

export const askScheduleToGoHome = functions
  .region("asia-northeast1").pubsub.schedule("0 16 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    const client = new LineClient();
    client.pushReactiveMessage(createMessage());
  });

const createMessage = (): Message => {
  return {
    type: "text",
    text: "今日の帰宅予定は？",
    quickReply: {
      items: [
        ...[
          "19:00まで",
          "19:30くらい",
          "20:00くらい",
          "20:30くらい",
          "21:00くらい",
          "21:30過ぎるくらい",
        ].map((time) => quickReply(time)),
      ],
    },
  };
};

const quickReply = (time: string): QuickReplyItem => {
  return {
    type: "action",
    action: {
      type: "postback",
      label: time + "に",
      data: time,
      displayText: "「" + time + "に」で登録しました",
    },
  };
};
