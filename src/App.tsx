/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import Header from './components/Header';
import Editor from './components/Editor';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-green-400 font-mono selection:bg-green-500/30 selection:text-green-200">
      <div className="max-w-5xl mx-auto min-h-screen flex flex-col border-x border-green-500/10 shadow-[0_0_50px_rgba(34,197,94,0.05)]">
        <Header />
        <main className="flex-1 flex flex-col">
          <Editor />
        </main>
        <footer className="border-t border-green-500/20 p-2 text-center text-[10px] text-green-500/40">
          duckduckducky.nealfrazier.tech // USE RESPONSIBLY
        </footer>
      </div>
    </div>
  );
}
