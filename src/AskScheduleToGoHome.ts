import { Message } from "@line/bot-sdk";
import * as functions from "firebase-functions";
import { LineClient } from "./common/LineClient";
import { toQuickReplyItem } from "./common/MessageFactory";
import { User } from "./common/User";
import { scheduleToGoHomeCandidate } from "./ScheduleToGoHomeCandidate";

export const askScheduleToGoHome = functions
  .region("asia-northeast1").pubsub.schedule("0 16 * * 1-5")
  .timeZone("Asia/Tokyo")
  .onRun(() => {
    new LineClient().pushMessage([User.USER_A, User.USER_B], createMessage());
  });

export const createMessage = (): Message => {
  const candidateItem = scheduleToGoHomeCandidate
    .map((candidate) => toQuickReplyItem({
      label: `${candidate}に`,
      data: `first_${candidate}`,
      displayText: `「${candidate}」で登録しました`,
    }));

  return {
    type: "text",
    text: "今日の帰宅予定は？",
    quickReply: {
      items: candidateItem,
    },
  };
};
