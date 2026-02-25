import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "Please enter both fields" },
      { status: 400 },
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("aerosDatabase");

    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
