import { PropsWithChildren } from 'react';
import 'styles/main.css';

export default function SignInLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <title>Sign In - LegalTime Pro</title>
        <meta name="description" content="Sign in to LegalTime Pro - Professional time tracking and billing for law firms" />
      </head>
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  );
} 