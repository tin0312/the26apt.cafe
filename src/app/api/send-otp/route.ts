import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export async function POST(req: Request) {
  const { phoneNumber } = await req.json();

  // generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // store in DB/Redis with expiry (5 min)
  // For demo, pretend we store in memory (not safe in prod)
  globalThis.otpStore = globalThis.otpStore || {};
  globalThis.otpStore[phoneNumber] = { otp, expires: Date.now() + 5 * 60 * 1000 };

  // send via SMS
  await client.messages.create({
    body: `Your login code is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phoneNumber,
  });

  

  return NextResponse.json({ success: true });
}