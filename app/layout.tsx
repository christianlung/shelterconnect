import './globals.css';
import Banner from '../components/Banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShelterConnect',
  description:
    'ShelterConnect helps evacuees find safe shelters quickly and easily. Connect with volunteers, donate, and get the help you need during emergencies.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body id="root">
        <Banner />
        <div className="mt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
