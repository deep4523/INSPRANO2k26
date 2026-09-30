import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const res = await executeQuery('SELECT * FROM events WHERE slug = ?', [params.slug]);
  if (!res.rows || res.rows.length === 0) {
    return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: res.rows[0] });
}
