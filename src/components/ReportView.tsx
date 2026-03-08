import React from 'react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

interface ReportViewProps {
  markdown: string;
}

export default function ReportView({ markdown }: ReportViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose prose-neutral prose-emerald max-w-none"
    >
      <div className="markdown-body bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
        <Markdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-neutral-900 mb-6 pb-4 border-b border-neutral-100 flex items-center gap-3" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-emerald-800 mt-8 mb-4 uppercase tracking-wide text-sm" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-base font-medium text-neutral-800 mt-6 mb-3" {...props} />,
            ul: ({node, ...props}) => <ul className="space-y-2 my-4 list-none pl-0" {...props} />,
            li: ({node, ...props}) => (
              <li className="flex items-start gap-3 text-neutral-700" {...props}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>{props.children}</span>
              </li>
            ),
            p: ({node, ...props}) => <p className="text-neutral-600 leading-relaxed mb-4" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-neutral-900" {...props} />,
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-6 bg-emerald-50/50 rounded-r-lg italic text-neutral-700" {...props} />
            ),
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </motion.div>
  );
}
