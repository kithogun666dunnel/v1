import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
};

// 🔐 JWT is REQUIRED (auth ke bina server ka koi matlab nahi)
if (!env.JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET");
}

// ❌ Mongo is OPTIONAL for Week-1
// No error if MONGO_URI missing
