import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { UserSchedule } from "../@types/Schedule";
import { userIdOf } from "./User";
import * as dayjs from "dayjs";
import { firestore } from "firebase-admin";

// eslint-disable-next-line import/namespace
admin.initializeApp(
  functions.config().firebase
);

// This helper function pipes your types through a firestore converter
const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  firestore().collection(collectionPath).withConverter(converter<T>());

// Construct a database helper object
export const db = {
  schedule: (date: string, user: string | undefined) =>
    dataPoint<UserSchedule>(`schedules/${date}/${user}`),
};

export const saveSchedule = (userId: string, time: string) => {
  const today = dayjs().format("YYYY/MM/DD");
  const userName = userIdOf(userId).enName;
  if (userName === "unknown") {
    return;
  }
  db.schedule(today, userName).add({
    time: time,
  });
};
