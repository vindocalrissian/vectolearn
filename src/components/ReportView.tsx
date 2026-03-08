import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { FileDown, Copy, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ReportViewProps {
  report: string;
  onExport?: () => void;
  onCopy?: () => void;
  copySuccess?: boolean;
}

export default function ReportView({ report, onExport, onCopy, copySuccess }: ReportViewProps) {
  if (!report) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-200 overflow-hidden flex flex-col h-full"
    >
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm font-bold text-neutral-800 tracking-wide uppercase">AI Gap Analysis Report</h2>
        </div>

        <div className="flex items-center gap-2">
          {onCopy && (
            <button
              onClick={onCopy}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                copySuccess
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 shadow-sm"
              )}
            >
              {copySuccess ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          )}
          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900 transition-all shadow-sm"
            >
              <FileDown size={14} />
              Export MD
            </button>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-white to-neutral-50/50">
        <div className="prose prose-sm md:prose-base max-w-none prose-emerald prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-neutral-100 prose-p:text-neutral-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-strong:text-neutral-900 prose-ul:text-neutral-600 prose-li:marker:text-emerald-500">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-extrabold text-neutral-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-neutral-800 mt-10 mb-4 pb-2 border-b border-neutral-200" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-neutral-800 mt-8 mb-3" {...props} />,
              ul: ({ node, ...props }) => <ul className="space-y-2 my-4 pl-5 list-disc" {...props} />,
              li: ({ node, ...props }) => (
                <li className="pl-1 text-neutral-700 marker:text-emerald-500" {...props} />
              ),
              p: ({ node, ...props }) => <p className="text-neutral-600 leading-relaxed mb-4" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold text-neutral-900 bg-emerald-50 px-1 rounded" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-emerald-500 bg-emerald-50/50 pl-4 py-2 my-4 rounded-r-lg italic text-neutral-700" {...props} />
              ),
              code: ({ node, inline, ...props }: any) =>
                inline ? (
                  <code className="bg-neutral-100 text-pink-600 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props} />
                ) : (
                  <div className="rounded-xl overflow-hidden my-6 border border-neutral-200 shadow-sm">
                    <div className="bg-neutral-800 px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                    </div>
                    <pre className="bg-neutral-900 p-4 overflow-x-auto text-sm text-neutral-300 font-mono">
                      <code {...props} />
                    </pre>
                  </div>
                )
            }}
          >
            {report}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
