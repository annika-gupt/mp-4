import React from 'react';
import Navigation from '@/components/Navigation';
import "./about/globals.css";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
    variable: "--font-pixelify-sans",
    subsets: ["latin"],
});


interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`${pixelify.variable} antialiased`}
            >
                <Navigation/>
                {children}
            </body>
        </html>
    );
}