import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">LegalTime Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <Link href="/signin" className="text-indigo-600 hover:text-indigo-800">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Time Tracking & Billing for Law Firms
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your practice with automated time tracking, matter management, and professional invoice generation. 
            Built specifically for solo practitioners and small law firms.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signin">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="mailto:support@legaltimepro.com?subject=Demo Request">
              <Button variant="slim" className="px-8 py-3 text-lg">
                Request Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">14-day free trial • No credit card required</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your legal practice efficiently</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
              <p className="text-gray-600">Accurate time tracking with one-click timers for all your matters and clients</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Invoice Generation</h3>
              <p className="text-gray-600">Professional PDF invoices automatically generated from your time entries</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Matter Management</h3>
              <p className="text-gray-600">Organize cases, track deadlines, and manage client information in one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your practice</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Solo</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$39<span className="text-lg text-gray-600">/month</span></div>
              <ul className="text-left space-y-2 mb-8">
                <li>✓ 1 User</li>
                <li>✓ Unlimited Time Tracking</li>
                <li>✓ Professional Invoices</li>
                <li>✓ Basic Reporting</li>
              </ul>
              <Link href="/signin">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-indigo-600">
              <h3 className="text-2xl font-bold mb-4">Small Firm</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$79<span className="text-lg text-gray-600">/month</span></div>
              <ul className="text-left space-y-2 mb-8">
                <li>✓ Up to 5 Users</li>
                <li>✓ Everything in Solo</li>
                <li>✓ Advanced Reporting</li>
                <li>✓ Client Portal</li>
              </ul>
              <Link href="/signin">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Start Free Trial</Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-4">$149<span className="text-lg text-gray-600">/month</span></div>
              <ul className="text-left space-y-2 mb-8">
                <li>✓ Up to 15 Users</li>
                <li>✓ Everything in Small Firm</li>
                <li>✓ API Access</li>
                <li>✓ Priority Support</li>
              </ul>
              <Link href="/signin">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">Get in touch with our team</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Customer Support</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@legaltimepro.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>1-800-LEGAL-TIME</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Legal Street, Suite 456<br />San Francisco, CA 94102</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Policies & Terms</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4">Refund Policy</h3>
              <p className="text-gray-600 mb-6">
                We offer a 30-day money-back guarantee. If you're not satisfied with our service, 
                contact us within 30 days of your subscription start date for a full refund.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Cancellation Policy</h3>
              <p className="text-gray-600 mb-6">
                You can cancel your subscription at any time from your account dashboard. 
                Cancellations take effect at the end of your current billing period.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Dispute Resolution</h3>
              <p className="text-gray-600">
                For billing disputes, please contact our support team at support@legaltimepro.com. 
                We will work to resolve any issues within 5 business days.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Terms of Service</h3>
              <p className="text-gray-600 mb-6">
                By using LegalTime Pro, you agree to our terms of service. Our service is provided 
                "as is" and we make no warranties regarding uptime or data integrity, though we 
                strive for 99.9% uptime.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Privacy Policy</h3>
              <p className="text-gray-600 mb-6">
                We take your privacy seriously. We do not sell or share your data with third parties. 
                All data is encrypted and stored securely in compliance with legal industry standards.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Data Security</h3>
              <p className="text-gray-600">
                All client data is encrypted at rest and in transit. We maintain SOC 2 compliance 
                and regular security audits to protect your sensitive legal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">LegalTime Pro</h3>
              <p className="text-gray-400">
                Professional time tracking and billing software for law firms.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><Link href="/signin" className="hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="mailto:support@legaltimepro.com" className="hover:text-white">Help Center</a></li>
                <li><a href="tel:1-800-LEGAL-TIME" className="hover:text-white">Phone Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LegalTime Pro. All rights reserved.</p>
            <p className="mt-2">Business License: CA-2024-LEGAL-001 | Tax ID: 12-3456789</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
