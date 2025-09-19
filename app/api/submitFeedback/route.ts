import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

// Reuse the Admin app if already initialised
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Save into feedback_submissions
    await db.collection("feedback_submissions").add({
      ...body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
