/**
 * Editor.tsx
 * Purpose: Main workspace containing the payload selector, text editor, and action buttons.
 */
import { useState, useMemo } from 'react';
import { Copy, Check, Download, ChevronDown } from 'lucide-react';
import payloadsData from '../data/payloads.json';

// Type definition for our payload structure
type Payload = {
  id: string;
  os: string;
  name: string;
  description: string;
  script: string;
};

export default function Editor() {
  const [script, setScript] = useState('');
  const [selectedPayloadId, setSelectedPayloadId] = useState('');
  const [copied, setCopied] = useState(false);

  // Group payloads by OS for the dropdown menu
  const groupedPayloads = useMemo(() => {
    return (payloadsData as Payload[]).reduce((acc, payload) => {
      if (!acc[payload.os]) {
        acc[payload.os] = [];
      }
      acc[payload.os].push(payload);
      return acc;
    }, {} as Record<string, Payload[]>);
  }, []);

  // Handle payload selection from the dropdown
  const handlePayloadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedPayloadId(id);
    
    if (id) {
      const payload = (payloadsData as Payload[]).find(p => p.id === id);
      if (payload) {
        setScript(payload.script);
      }
    } else {
      setScript('');
    }
  };

  // Copy current script to clipboard
  const handleCopy = async () => {
    if (!script) return;
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Download script as a .txt file
  const handleDownload = () => {
    if (!script) return;
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payload.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full gap-4 p-4 md:p-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-gray-900/40 p-3 border border-green-500/20 rounded-sm">
        <div className="w-full sm:w-auto flex-1 max-w-md relative">
          <label htmlFor="payload-select" className="sr-only">Select Payload</label>
          <select
            id="payload-select"
            value={selectedPayloadId}
            onChange={handlePayloadChange}
            className="w-full appearance-none bg-gray-950 border border-green-500/40 text-green-400 py-2 pl-3 pr-10 rounded-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 font-mono text-sm"
          >
            <option value="">-- Select a predefined payload --</option>
            {Object.entries(groupedPayloads).map(([os, payloads]) => (
              <optgroup key={os} label={`--- ${os.toUpperCase()} ---`} className="bg-gray-900 text-green-500/70 font-bold">
                {payloads.map((payload) => (
                  <option key={payload.id} value={payload.id} className="text-green-400 font-normal">
                    {payload.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/70 pointer-events-none" />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            disabled={!script}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-950/50 hover:bg-green-900/80 border border-green-500/50 text-green-400 px-4 py-2 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
          <button
            onClick={handleDownload}
            disabled={!script}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm"
          >
            <Download className="w-4 h-4" />
            SAVE
          </button>
        </div>
      </div>

      {/* Description Area (if payload selected) */}
      {selectedPayloadId && (
        <div className="text-xs text-green-500/70 border-l-2 border-green-500/50 pl-3 py-1 font-mono">
          <span className="font-bold text-green-400">INFO:</span> {(payloadsData as Payload[]).find(p => p.id === selectedPayloadId)?.description}
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 relative group flex flex-col min-h-[400px]">
        <div className="absolute top-0 left-0 w-full h-6 bg-gray-900/80 border-t border-l border-r border-green-500/30 rounded-t-sm flex items-center px-3 gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          <span className="ml-2 text-[10px] text-green-500/50 font-mono tracking-widest">payload.txt</span>
        </div>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="// Enter DuckyScript here..."
          className="flex-1 w-full mt-6 bg-gray-950/80 border border-green-500/30 text-green-300 p-4 font-mono text-sm md:text-base resize-none focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500/50 rounded-b-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
