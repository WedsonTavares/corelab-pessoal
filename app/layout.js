import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '../components/Sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Corelab - Gerenciador de Tarefas',
  description:
    'Sistema de gerenciamento de tarefas desenvolvido para o Corelab Challenge',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-Br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white`}
      >
        {/* Full Page Layout */}
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          {/* Main Content */}
          <div className="flex flex-col flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto w-full">
              <Header /> {/* Moves with content */}
              <main>{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
