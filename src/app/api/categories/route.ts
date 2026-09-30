import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  const result = await executeQuery('SELECT * FROM event_categories ORDER BY display_order ASC');
  return NextResponse.json({ success: true, data: result.rows });
}
