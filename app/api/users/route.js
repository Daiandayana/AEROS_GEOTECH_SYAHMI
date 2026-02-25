import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("aerosDatabase");

    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}