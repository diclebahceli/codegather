import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../../styles/_variables.scss";
import "./globals.css";
import Header from "./components/header/Header";
import {Encode_Sans} from "next/font/google";
import {Toaster} from "react-hot-toast";
import {SetInterceptors} from "./services/AuthService";
import {AuthProvider} from "./contexts/AuthContext";
import Protected from "./components/protected/Protected";
import {Montserrat, Roboto_Mono, Open_Sans, Poppins, Fira_Code} from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const inter = Inter({subsets: ["latin"]});

const encodeSans = Encode_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Code Together",
  description: "Code together is a platform where you can compete with others in coding challenges and improve your coding skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const protectedRoutes = [
    "/pages/competitions",
    "/pages/myCompetitions",
    "/pages/question",
    "/pages/admin"
  ];
  SetInterceptors();
  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
        <AuthProvider>
          <div className="d-flex flex-column vh-100 w-100">
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
