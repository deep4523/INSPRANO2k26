import { NextResponse } from 'next/server';
import { INITIAL_SETTINGS } from '@/lib/db';

export async function GET() {
  return NextResponse.json({ success: true, data: INITIAL_SETTINGS });
}
