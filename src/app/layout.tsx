import React from 'react';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'EchoMind 2.1',
  description: 'A modern media management component with project organization and voice control',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 