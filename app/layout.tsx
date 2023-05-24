import React from 'react';
import Header from '@/components/layout/Header/Header';
import './globals.scss';

export const metadata = {
  title: 'OmniPortal',
  description: 'Your gateway to the Internet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {

  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
