import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/_variables.scss";
import "./globals.css";
import Header from "./components/header/Header";
import { Encode_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SetInterceptors } from "./services/AuthService";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/protected/Protected";

const inter = Inter({ subsets: ["latin"] });
const encodeSans = Encode_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const protectedRoutes = [
    "/pages/ongoingCompetitions",
    "/pages/myCompetitions",
  ];
  SetInterceptors();
  return (
    <html lang="en" className={encodeSans.className}>
      <body>
        <AuthProvider>
          <div className="d-flex flex-column vh-100 vw-100">
            <Protected protectedRoutes={protectedRoutes}>
              <Header />
              <div className="flex-grow-1">
                {children}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    success: {
                      duration: 900,
                    },
                  }}
                />
              </div>
            </Protected>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
