import React from 'react';
import Header from './components/Header';
import FileConverter from './components/FileConverter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FileConverter />
      </main>
      <Footer />
    </div>
  );
}

export default App;