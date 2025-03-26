import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { Filter } from 'lucide-react';
import '../styles/ResultsTable.css';

interface ResultsTableProps {
  results: {
    columns: string[];
    rows: any[];
  };
  loading: boolean;
  filterValue: string;
  setFilterValue: (value: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  loading,
  filterValue,
  setFilterValue,
}) => {
  const filteredResults = results.rows.filter(row => 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const rowRenderer = ({ index, key, style }: any) => {
    const row = filteredResults[index];
    return (
      <div key={key} style={style} className="table-row">
        {results.columns.map((column, colIndex) => (
          <div key={colIndex} className="table-cell" title={String(row[column])}>
            {row[column] === null ? 'null' : String(row[column])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="results-section">
      <h2>Results</h2>
      {loading && <div className="loading"></div>}
      {results && !loading && (
        <>
          <div className="status-bar">
            <span>{filteredResults.length} rows returned</span>
            <div className="filter-container">
              <Filter size={16} />
              <input
                type="text"
                placeholder="Filter results..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="filter-input"
              />
            </div>
            <span>Execution time: 0.5s</span>
          </div>
          <div className="table-container" style={{ height: '400px' }}>
            <div className="table-header">
              {results.columns.map((column, index) => (
                <div key={index} className="table-cell header-cell">
                  {column}
                </div>
              ))}
            </div>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height - 40}
                  rowCount={filteredResults.length}
                  rowHeight={50} 
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsTable;