import * as line from "@line/bot-sdk";
import { Message } from "@line/bot-sdk";
import * as functions from "firebase-functions";
import { saveSchedule } from "./common/Firestore";
import { getConfig, LineClient } from "./common/LineClient";
import { toQuickReplyItem } from "./common/MessageFactory";
import { User, userIdOf } from "./common/User";
import { scheduleToGoHomeCandidate } from "./ScheduleToGoHomeCandidate";

export const lineWebhook = functions
  .region("asia-northeast1")
  .https.onRequest(async (request, response) => {
    console.log("start");
    const signature = request.get("x-line-signature");

    if (!signature || !LineClient.validateSignature(
      request.rawBody, getConfig().channelSecret, signature
    )) {
      throw new Error("request invalid: " + signature);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise.all(request.body.events.map(lineEventHandler))
      .then((result) => response.json(result))
      .catch((error) => console.error(error));
  });

const lineEventHandler = async (event: line.WebhookEvent) => {
  if (event.type !== "postback") {
    console.log("event type is not postback");
    return Promise.resolve(null);
  }
  try {
    if (event.source.userId !== undefined) {
      if (event.postback.data.startsWith("first_")) {
        const time = event.postback.data.replace("first_", "");
        saveSchedule(event.source.userId, time);
      } else if (event.postback.data.startsWith("update_")) {
        const time = event.postback.data.replace("update_", "");
        if (time === "変更なし") {
          return;
        }
        // FIXME: DBも更新する
        // saveSchedule(event.source.userId, time);
        const client = new LineClient();
        if (userIdOf(event.source.userId) === User.USER_A) {
          await client.pushMessage(
            [User.USER_B],
            noticeChangeMessage(`${User.USER_A.name}はやっぱり${time}に帰るそうです。`)
          );
        } else {
          await client.pushMessage(
            [User.USER_A],
            noticeChangeMessage(`${User.USER_B.name}はやっぱり${time}に帰るそうです。`)
          );
        }
      } else if (event.postback.data.startsWith("completed_")) {
        const time = event.postback.data.replace("completed_", "");
        if (time === "変更なし") {
          return;
        }
        const client = new LineClient();
        if (userIdOf(event.source.userId) === User.USER_A) {
          const message = `${User.USER_A.name}はやっぱり${time}に帰るそうです。`;
          await client.pushMessage(
            [User.USER_B],
            { type: "text", text: message }
          );
        } else {
          const message = `${User.USER_B.name}はやっぱり${time}に帰るそうです。`;
          await client.pushMessage(
            [User.USER_A],
            { type: "text", text: message }
          );
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Promise.resolve(null);
    } else {
      console.log("invalid user");
      return Promise.resolve(null);
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    return Promise.resolve(null);
  } finally {
    console.log("end");
  }
};


export const noticeChangeMessage = (preMessage: string): Message => {
  const NO_CHANGE = "変更なし";
  const noChangeItem = toQuickReplyItem({
    label: NO_CHANGE,
    data: `completed_${NO_CHANGE}`,
    displayText: `「${NO_CHANGE}」で登録しました`,
  });

  const candidateItem = scheduleToGoHomeCandidate
    .map((candidate) => toQuickReplyItem({
      label: `${candidate}に`,
      data: `completed_${candidate}`,
      displayText: `「${candidate}」で登録しました`,
    }));

  return {
    type: "text",
    text: preMessage + "\n" + "予定を変更しますか？変更する場合は返信してください。",
    quickReply: {
      items: [noChangeItem, ...candidateItem],
    },
  };
};
