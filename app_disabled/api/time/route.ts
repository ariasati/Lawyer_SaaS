import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const matterId = searchParams.get('matter_id');
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, return a simple response - we'll add full functionality after database setup
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error in time entries GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { matter_id, description, start_time, end_time, billable_seconds, hourly_rate } = body;

    // Validate required fields
    if (!matter_id || !description || !hourly_rate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // For now, return a simple success response - we'll add full functionality after database setup
    return NextResponse.json({ success: true, message: 'Time entry functionality will be available after database migration' }, { status: 201 });
  } catch (error) {
    console.error('Error in time entries POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 