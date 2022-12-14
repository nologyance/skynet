import * as line from "@line/bot-sdk";
import { Message } from "@line/bot-sdk";
import * as functions from "firebase-functions";
import { User } from "./User";

export class LineClient {
  client: line.Client;

  constructor() {
    this.client = process.env.toString() === "test" ?
      new MockClient(getConfig()) :
      new line.Client(getConfig());
  }

  public async pushMessage(to: User[], message: Message) {
    if (to.length === 1) {
      await this.client.pushMessage(to[0].userId, message);
    } else {
      await this.client.multicast(to.map((t) => t.userId), message);
    }
  }

  public static validateSignature(body: string | Buffer,
    channelSecret: string, signature: string): boolean {
    return line.validateSignature(body, channelSecret, signature);
  }
}

export const getConfig = () => {
  return process.env.toString() === "test" ?
    {
      channelAccessToken: "token",
      channelSecret: "secret",
    } :
    {
      channelAccessToken: functions.config().line.channel_access_token,
      channelSecret: functions.config().line.channel_secret,
    };
};

/**
 * モック実装
 */
class MockClient extends line.Client {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pushMessage(to: string, messages: line.Message |
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    line.Message[], notificationDisabled?: boolean)
    : Promise<line.MessageAPIResponseBase> {
    console.log(to + messages);
    return Promise.resolve({ "x-line-request-id": "id" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multicast(to: string[], messages: line.Message |
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    line.Message[], notificationDisabled?: boolean)
    : Promise<line.MessageAPIResponseBase> {
    console.log(to[0] + messages);
    console.log(to[1] + messages);
    return Promise.resolve({ "x-line-request-id": "id" });
  }
}
