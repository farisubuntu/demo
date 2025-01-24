import { NextResponse, type NextRequest } from "next/server";

import { sql } from "@/lib/db";
// think 'PUT' is like 'update'
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user_id = Number((await params).id);
  const { name, email } = await request.json();
  const user =
    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE user_id = ${user_id} RETURNING *`;
    
  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user_id = Number((await params).id);
  const result=await sql`DELETE FROM users WHERE user_id = ${user_id} RETURNING *`;
  console.log("api/users/[id]/route.ts ..." ,result);
  return NextResponse.json(null, { status: 204 });

}
