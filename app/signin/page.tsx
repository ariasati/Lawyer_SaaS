export default function SignIn() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '8px' 
        }}>
          Sign In to LegalTime Pro
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '32px' 
        }}>
          Authentication system coming soon! We're setting up secure login for your law firm.
        </p>
        
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            padding: '16px',
            backgroundColor: '#dbeafe',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: '#1e3a8a', 
              marginBottom: '8px' 
            }}>
              🚀 Get Early Access
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#1e40af' 
            }}>
              Contact us at <strong>support@legaltimepro.com</strong> to get early access to the beta version.
            </p>
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: '#dcfce7',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: '#14532d', 
              marginBottom: '8px' 
            }}>
              📞 Schedule a Demo
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#166534' 
            }}>
              Call <strong>1-800-LEGAL-TIME</strong> to schedule a personalized demo.
            </p>
          </div>
          
          <div style={{
            padding: '16px',
            backgroundColor: '#f3e8ff',
            borderRadius: '8px'
          }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: '#581c87', 
              marginBottom: '8px' 
            }}>
              🎯 Beta Launch Special
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#7c3aed' 
            }}>
              <strong>50% off</strong> for the first 100 law firms that sign up!
            </p>
          </div>
        </div>
        
        <div>
          <a 
            href="/"
            style={{
              display: 'block',
              width: '100%',
              backgroundColor: '#4f46e5',
              color: 'white',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              marginBottom: '12px',
              transition: 'background-color 0.2s'
            }}

          >
            Back to Homepage
          </a>
          
          <a 
            href="mailto:support@legaltimepro.com?subject=Early Access Request"
            style={{
              display: 'block',
              width: '100%',
              border: '1px solid #d1d5db',
              color: '#374151',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'border-color 0.2s'
            }}

          >
            Request Early Access
          </a>
        </div>
      </div>
    </div>
  );
}
