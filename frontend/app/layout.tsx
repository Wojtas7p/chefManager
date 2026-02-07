// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
       <head>
        {/* <link rel="preload" href="/_next/static/css/app/layout.css" as="style" /> */}
      </head>
      <body>
        <AuthProvider>
        {/* <Navbar/> */}
        <div className="fixed top-0 z-50 w-full h-0">
          <Navbar />
        </div>
        {children}    
        
        </AuthProvider>
      </body>
    </html>
  );
}


