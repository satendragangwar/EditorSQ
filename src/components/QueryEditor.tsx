import React from 'react';
import { Play, FileDown, Download } from 'lucide-react';
import '../styles/QueryEditor.css';

interface QueryEditorProps {
  query: string;
  loading: boolean;
  results: any;
  setQuery: (query: string) => void;
  executeQuery: () => void;
  exportResults: (format: 'csv' | 'json') => void;
}

const QueryEditor: React.FC<QueryEditorProps> = ({
  query,
  loading,
  results,
  setQuery,
  executeQuery,
  exportResults,
}) => {
  return (
    <div className="query-editor">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your SQL query here..."
      />
      <div style={{ marginTop: '10px' }}>
        <button className="button" onClick={executeQuery} disabled={loading}>
          <Play size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Execute Query
        </button>
        {results && (
          <>
            <button className="button export" onClick={() => exportResults('csv')}>
              <FileDown size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Export CSV
            </button>
            <button className="button export" onClick={() => exportResults('json')}>
              <Download size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
              Export JSON
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QueryEditor;