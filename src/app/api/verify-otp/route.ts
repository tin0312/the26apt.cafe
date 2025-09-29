import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phoneNumber, otp } = await req.json();

  const record = globalThis.otpStore?.[phoneNumber];
  if (!record) {
    return NextResponse.json({ success: false, error: "No OTP requested" }, { status: 400 });
  }

  if (record.expires < Date.now()) {
    return NextResponse.json({ success: false, error: "OTP expired" }, { status: 400 });
  }

  if (record.otp !== otp) {
    return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });
  }

  // OTP valid → simulate user session
  const userId = "user-" + phoneNumber;

  // cleanup after use
  delete globalThis.otpStore[phoneNumber];

  return NextResponse.json({ success: true, userId });
}