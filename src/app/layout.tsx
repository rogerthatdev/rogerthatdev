import '@/app/globals.css'
import TopNavigation from '@/components/TopNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><TopNavigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
