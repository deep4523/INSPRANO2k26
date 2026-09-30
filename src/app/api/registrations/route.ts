import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, message: 'Registration received successfully' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to process registration' }, { status: 400 });
  }
}
