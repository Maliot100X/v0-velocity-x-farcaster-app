import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Velocity X",
  description: "AI-Powered Clanker Launcher",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}