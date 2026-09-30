import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, message: 'Sponsorship inquiry submitted successfully' });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to submit inquiry' }, { status: 400 });
  }
}
