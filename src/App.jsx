import React, { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import ResultPane from './components/ResultPane';
import SecurityNote from './components/SecurityNote';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.12),transparent),radial-gradient(800px_400px_at_10%_80%,rgba(16,185,129,0.12),transparent)]">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
      <main className="relative z-10 px-4 sm:px-6 pb-16">
        <Header />
        <UploadForm onResult={setResult} />
        <ResultPane result={result} onClear={() => setResult(null)} />
        <SecurityNote />
      </main>
    </div>
  );
}
