import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "./components/navbar";
import ReduxProvider from "./redux/provider/provider";
import { StateProvider } from "./context/AuthState";
import { ProtectedRouteWrapper } from "./route/protected";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <StateProvider>
            <ProtectedRouteWrapper>
              <AntdRegistry>
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                  {children}
                </div>
              </AntdRegistry>
            </ProtectedRouteWrapper>
          </StateProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
