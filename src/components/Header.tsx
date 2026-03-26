/**
 * Header.tsx
 * Purpose: Renders the top branding and terminal-style header for the application.
 */
import { Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-green-500/30 bg-gray-950/50 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Terminal className="w-6 h-6 text-green-400" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-green-400">THE_PAYLOAD_FORGE</h1>
          <p className="text-xs text-green-500/70">v1.0.0 // DuckyScript Generator</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs text-green-500/50">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        SYSTEM_ONLINE
      </div>
    </header>
  );
}
