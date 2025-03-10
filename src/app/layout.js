import './globals.css';

export const metadata = {
  title: 'YouTube Downloader',
  description: 'Download YouTube videos as MP4 files',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}