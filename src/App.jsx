function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="py-6 bg-white shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-600">FastConvert</h1>
          <p className="text-sm text-gray-500">No upload — your files stay on your device</p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Convert your files instantly, securely, and for free
        </h2>

        {/* Tool buttons */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10 w-full max-w-lg">
          <a href="/jpg-to-pdf" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
            JPG → PDF
          </a>
          <a href="/video-to-mp3" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
            Video → MP3
          </a>
          <a href="/pdf-tools" className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg font-semibold">
            PDF Tools
          </a>
        </div>

        {/* Email capture */}
        <form
          action="https://formspree.io/f/xjkeqodv"  // Formspree'de yeni form açınca linki buraya değiştireceğiz
          method="POST"
          className="w-full max-w-md bg-white shadow rounded-lg p-6"
        >
          <label className="block mb-2 text-left font-medium">Stay updated:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full border px-3 py-2 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-500">
        <a href="/privacy" className="mx-2 hover:underline">Privacy</a>
        <a href="/terms" className="mx-2 hover:underline">Terms</a>
        <a href="/dmca" className="mx-2 hover:underline">DMCA</a>
      </footer>
    </div>
  )
}

export default App;
