import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/contexts/ToastContext';
import { QueryProvider } from '@/providers/QueryProvider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Barber System',
  description: 'Um sistema completo de gestão para barbearias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <QueryProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}