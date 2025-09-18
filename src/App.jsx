function App() {
  return (
    <>
      <header className="text-center py-6 bg-gray-100 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">FastConvert</h1>
        <p className="text-gray-600">Free & Secure File Conversion Tools</p>
      </header>

      <main className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Convert JPG to PDF</h2>
        <p className="text-gray-700 mb-6">
          Upload your files below (Day-2 will enable full functionality).
        </p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Select JPG Files
        </button>
      </main>

      <footer className="text-center py-6 bg-gray-100 border-t">
        <p className="mb-2">
          <a href="/privacy.html" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms.html" className="text-blue-600 hover:underline">
            Terms of Service
          </a>
        </p>
        <p className="text-gray-600">© 2025 FastConvert</p>
      </footer>
    </>
  );
}

export default App;
