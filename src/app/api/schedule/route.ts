import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  const res = await executeQuery('SELECT * FROM schedule_items');
  return NextResponse.json({ success: true, data: res.rows });
}
