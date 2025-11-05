import React from 'react';

export default function Header() {
  return (
    <header className="w-full max-w-4xl mx-auto text-center py-8">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
        PDF to HTML5 Flipbook
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-300">
        Upload a PDF and get a single-file, password-protected flipbook with ultra-realistic page turns.
      </p>
    </header>
  );
}
