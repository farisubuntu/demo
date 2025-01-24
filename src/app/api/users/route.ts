import { NextResponse, type NextRequest } from "next/server";

import { sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  const users = await sql`SELECT * FROM users`;
  return NextResponse.json(users);
}

// think 'POST' is like 'create'
export async function POST(request: NextRequest) {
  const { name, email } = await request.json();
  const user =
    await sql`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING *`;
  return NextResponse.json(user, { status: 201 });
}

