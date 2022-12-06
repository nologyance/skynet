import * as line from "@line/bot-sdk";
import * as functions from "firebase-functions";
import { saveSchedule } from "./common/Firestore";
import { getConfig, LineClient } from "./common/LineClient";
import { User, userIdOf } from "./common/User";

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

const lineEventHandler = (event: line.WebhookEvent) => {
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
        // FIXME: DBも更新する
        // saveSchedule(event.source.userId, time);
        const client = new LineClient();
        if (userIdOf(event.source.userId) === User.USER_A) {
          client.pushMessage(
            User.USER_B, `${User.USER_A.name}はやっぱり${time}に帰るそうです。`);
        } else {
          client.pushMessage(
            User.USER_A, `${User.USER_B.name}はやっぱり${time}に帰るそうです。`);
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
