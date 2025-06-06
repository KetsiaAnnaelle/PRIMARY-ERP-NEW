// app/layout.tsx

import React from 'react';
import './globals.css'; // Importation des styles globaux si nécessaires
import { Inter } from 'next/font/google';
import Providers from '@/components/providers';
import Navbar from './navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PRIMARY ERP',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {/* <Navbar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
