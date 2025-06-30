export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In to LegalTime Pro
          </h2>
          <p className="text-gray-600 mb-8">
            Authentication system coming soon! We're setting up secure login for your law firm.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🚀 Get Early Access</h3>
              <p className="text-blue-800 text-sm">
                Contact us at <strong>support@legaltimepro.com</strong> to get early access to the beta version.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">📞 Schedule a Demo</h3>
              <p className="text-green-800 text-sm">
                Call <strong>1-800-LEGAL-TIME</strong> to schedule a personalized demo.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">🎯 Beta Launch Special</h3>
              <p className="text-purple-800 text-sm">
                <strong>50% off</strong> for the first 100 law firms that sign up!
              </p>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <a 
              href="/"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Back to Homepage
            </a>
            
            <a 
              href="mailto:support@legaltimepro.com?subject=Early Access Request"
              className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Request Early Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
