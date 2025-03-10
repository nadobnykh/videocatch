import DownloadForm from '../components/DownloadForm';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      
      {/* Main Content */}
      <div className="w-full max-w-xl space-y-8 text-center relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700/50 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm text-gray-400">Fast & Secure</span>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight">
            YouTube <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">Downloader</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Download any YouTube video as an MP4 file with just one click
          </p>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700/50">
          <DownloadForm />
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <span>No registration required</span>
          <span>•</span>
          <span>High quality MP4</span>
          <span>•</span>
          <span>Fast download</span>
        </div>
      </div>
    </main>
  );
}