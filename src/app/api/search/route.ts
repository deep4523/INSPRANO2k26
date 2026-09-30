import { NextResponse } from 'next/server';
import { INITIAL_EVENTS, INITIAL_CATEGORIES } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get('q') || '').trim().toLowerCase();

    if (!query) {
      return NextResponse.json({
        success: true,
        data: { events: [], categories: [] },
      });
    }

    const events = INITIAL_EVENTS.filter(
      (e: any) =>
        (e.name && e.name.toLowerCase().includes(query)) ||
        (e.department && e.department.toLowerCase().includes(query)) ||
        (e.description && e.description.toLowerCase().includes(query)) ||
        (e.short_description && e.short_description.toLowerCase().includes(query))
    );

    const categories = INITIAL_CATEGORIES.filter(
      (c: any) => c.name && c.name.toLowerCase().includes(query)
    );

    return NextResponse.json({
      success: true,
      data: { events, categories },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, data: { events: [], categories: [] }, error: 'Search failed' },
      { status: 500 }
    );
  }
}
