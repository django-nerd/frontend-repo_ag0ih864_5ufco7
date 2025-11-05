import React, { useRef, useState } from 'react';

export default function UploadForm({ onResult }) {
  const fileRef = useRef(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError('Please choose a PDF file.');
      return;
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are supported.');
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append('pdf', file);
      form.append('password', password || '');

      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const res = await fetch(`${baseUrl}/api/convert`, { method: 'POST', body: form });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Conversion failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const filename = (res.headers.get('Content-Disposition') || '').split('filename=')[1]?.replaceAll('"','') || 'flipbook.html';
      onResult({ url, blob, filename });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto bg-slate-900/60 border border-white/5 rounded-xl p-4 sm:p-6 backdrop-blur">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-300">PDF File</label>
          <input ref={fileRef} type="file" accept="application/pdf" className="mt-1 w-full text-sm text-slate-200 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer bg-slate-800/60 border border-white/10 rounded-md p-2" />
        </div>
        <div className="sm:w-64">
          <label className="block text-sm font-medium text-slate-300">Password</label>
          <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Required to open" className="mt-1 w-full rounded-md bg-slate-800/60 border border-white/10 px-3 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-medium">
          {loading ? 'Converting…' : 'Convert to Flipbook'}
        </button>
        {error && <span className="text-sm text-rose-400">{error}</span>}
      </div>
    </form>
  );
}
