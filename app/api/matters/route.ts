import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, return a simple response - we'll add full functionality after database setup
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error in matters GET:', error);
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
    const { client_name, matter_description, matter_number, default_rate } = body;

    // Validate required fields
    if (!client_name || !matter_description) {
      return NextResponse.json({ error: 'Client name and matter description are required' }, { status: 400 });
    }

    // For now, return a simple success response - we'll add full functionality after database setup
    return NextResponse.json({ success: true, message: 'Matter functionality will be available after database migration' }, { status: 201 });
  } catch (error) {
    console.error('Error in matters POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 