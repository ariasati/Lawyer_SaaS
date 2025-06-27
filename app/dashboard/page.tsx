import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Timer from '@/components/ui/Timer/Timer';

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const handleTimerSave = async (data: any) => {
    // This will be implemented once we have the database set up
    console.log('Timer data to save:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Track your time and manage your legal matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Widget */}
          <div className="lg:col-span-1">
            <Timer onSave={handleTimerSave} />
          </div>

          {/* Today's Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0:00</div>
                  <div className="text-sm text-gray-600">Hours Tracked</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$0.00</div>
                  <div className="text-sm text-gray-600">Billable Amount</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Time Entries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Time Entries */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Recent Time Entries</h3>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                <p>No time entries yet. Start tracking your time!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">Add New Matter</div>
                  <div className="text-xs text-gray-500 mt-1">Create a new legal matter</div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">Generate Invoice</div>
                  <div className="text-xs text-gray-500 mt-1">Create invoice for time entries</div>
                </div>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">View Reports</div>
                  <div className="text-xs text-gray-500 mt-1">Analyze your time and billing</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 