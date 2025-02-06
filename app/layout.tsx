import "./globals.css";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShelterConnect",
  description: "ShelterConnect helps evacuees find safe shelters quickly and easily. Connect with volunteers, donate, and get the help you need during emergencies.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en">
      <body>
        <Banner />
        {children}
      </body>
    </html>
  );
}
