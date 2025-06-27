import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { generateInvoicePDF, InvoiceData } from '@/lib/invoice-generator';
import { format, addDays } from 'date-fns';

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
    console.error('Error in invoices GET:', error);
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
    const { period_start, period_end, generate_pdf = true } = body;

    // Validate required fields
    if (!period_start || !period_end) {
      return NextResponse.json({ error: 'Period start and end dates are required' }, { status: 400 });
    }

    // For now, return a simple success response - we'll add full functionality after database setup
    return NextResponse.json({ 
      success: true, 
      message: 'Invoice functionality will be available after database migration',
      period_start,
      period_end 
    }, { status: 201 });
  } catch (error) {
    console.error('Error in invoices POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 