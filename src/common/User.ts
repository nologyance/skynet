export const User = {
  USER_A: {
    name: process.env.USER_A_NAME || "不明",
    enName: process.env.USER_A_EN_NAME || "unknown",
    userId: process.env.USER_A_ID || "id",
    email: process.env.USER_A_EMAIL,
  },
  USER_B: {
    name: process.env.USER_B_NAME || "不明",
    enName: process.env.USER_B_EN_NAME || "unknown",
    userId: process.env.USER_B_ID || "id",
    email: process.env.USER_B_EMAIL,
  },
  UNKNOWN: {
    name: "不明",
    enName: "unknown",
    userId: "unknown",
    email: "example@example.com",
  },
} as const;
export type User = typeof User[keyof typeof User];

export const userIdOf = (userId: string) => {
  switch (userId) {
    case User.USER_A.userId:
      return User.USER_A;
    case User.USER_B.userId:
      return User.USER_B;
    default:
      return User.UNKNOWN;
  }
};

export const convertCreator = (email: string | undefined) => {
  switch (email) {
    case User.USER_A.email:
      return User.USER_A.name;
    case User.USER_B.email:
      return User.USER_B.name;
    default:
      return User.UNKNOWN.name;
  }
};
