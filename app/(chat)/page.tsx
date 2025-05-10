'use client';

import React, { useState } from 'react';

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('Thinking...');

    try {
      const res = await fetch('https://skk7w7rnzd7jxw-5000.proxy.runpod.net/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4">
      <h1 className="text-3xl font-bold mb-4 mt-4 text-center">💬 Ask the LLM</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-4 bg-white shadow rounded mb-4"
      >
        <textarea
          className="w-full border border-gray-300 p-2 rounded mb-2 resize-none"
          rows={4}
          placeholder="Type your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      <div className="w-full max-w-2xl p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-2">Response:</h2>
        <pre className="whitespace-pre-wrap">{response}</pre>
      </div>
    </div>
  );
}
