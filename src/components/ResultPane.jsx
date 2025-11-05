import React from 'react';

export default function ResultPane({ result, onClear }) {
  if (!result) return null;
  const { url, filename } = result;

  return (
    <section className="w-full max-w-4xl mx-auto mt-6">
      <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-medium">Flipbook ready</h3>
            <p className="text-sm text-slate-400">Single-file HTML with password protection and swipe-based page flips.</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={url} download={filename} className="px-4 py-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-500">Download</a>
            <button onClick={onClear} className="px-3 py-2 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">Start over</button>
          </div>
        </div>
        <div className="mt-4 aspect-[9/16] w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe title="Flipbook Preview" src={url} className="w-full h-full bg-black" sandbox="allow-scripts" />
        </div>
      </div>
    </section>
  );
}
