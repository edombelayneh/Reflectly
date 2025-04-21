// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import ThemeWrapper from './theme-wrapper'; 

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Reflectly",
//   description: "Reflectly - Your Minds Favorite Place to Breathe",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//       <ThemeWrapper>
//         <html lang="en">
//           <body className={inter.className}>{children}</body>
//         </html>
//       </ThemeWrapper>
//     </ClerkProvider>
//   );
// }

// app/layout.js
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import ThemeWrapper from './theme-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Reflectly',
  description: 'Your mental wellness companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
