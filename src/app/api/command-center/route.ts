import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  const res = await executeQuery('SELECT COUNT(*) as totalEvents FROM events');
  const row = res.rows[0] || {};
  return NextResponse.json({
    success: true,
    data: {
      totalEvents: row.totalEvents || 28,
      totalPrizeFormatted: '₹85,000+',
      categoriesCount: row.categoriesCount || 7,
      registrationOpen: true,
      upcomingEvents: row.upcomingEvents || 28,
    }
  });
}
