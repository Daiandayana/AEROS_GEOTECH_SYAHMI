import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, newPassword } = await req.json();

  if (!username || !newPassword) {
    return NextResponse.json(
      { message: "Please provide username and newPassword" },
      { status: 400 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("aerosDatabase");

    const result = await db.collection("users").updateOne(
      { username },
      { $set: { password: newPassword } },
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
