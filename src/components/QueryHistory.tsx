import React from 'react';
import { History, Trash2, Clock } from 'lucide-react';
import '../styles/QueryHistory.css';

interface HistoryItem {
  query: string;
  timestamp: Date;
}

interface QueryHistoryProps {
  history: HistoryItem[];
  clearHistory: () => void;
  loadFromHistory: (item: HistoryItem) => void;
}

const QueryHistory: React.FC<QueryHistoryProps> = ({
  history,
  clearHistory,
  loadFromHistory,
}) => {
  return (
    <div className="query-history">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2><History size={20} style={{ verticalAlign: 'middle', marginRight: '5px' }} />Query History</h2>
        <button className="button clear" onClick={clearHistory}>
          <Trash2 size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Clear
        </button>
      </div>
      {history.map((item, index) => (
        <div key={index} className="history-item" onClick={() => loadFromHistory(item)}>
          <Clock size={14} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          <span style={{ fontSize: '12px', color: '#666' }}>
            {item.timestamp.toLocaleTimeString()}
          </span>
          <div style={{ marginTop: '5px' }}>{item.query}</div>
        </div>
      ))}
    </div>
  );
};

export default QueryHistory;