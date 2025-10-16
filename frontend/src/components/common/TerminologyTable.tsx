import React from 'react';
import { BookOpen } from 'lucide-react';

interface Term {
  term: string;
  characteristics: string;
  focus: string;
}

interface TerminologyTableProps {
  title: string;
  terms: Term[];
  headers?: string[];
}

export const TerminologyTable: React.FC<TerminologyTableProps> = ({ title, terms, headers = ['METHODOLOGY', 'KEY CHARACTERISTICS', 'FOCUS'] }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-3 text-purple-400" />
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            {terms.map((term, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {term.term}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {term.characteristics}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {term.focus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
