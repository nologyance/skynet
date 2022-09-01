import * as functions from "firebase-functions";
import { getConfig, LineClient } from "./common/LineClient";
import * as line from "@line/bot-sdk";
import { saveSchedule } from "./common/Firestore";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const time = event.postback.data;
      saveSchedule(event.source.userId, time);
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
