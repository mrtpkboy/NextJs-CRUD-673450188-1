import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Management",
  description: "ระบบจัดการข้อมูลนักศึกษา (Next.js + Prisma + SQLite)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Suspense fallback={<p className="p-6 text-gray-500">กำลังโหลด...</p>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
