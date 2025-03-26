import React, { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { Database, HelpCircle, X, Copy } from 'lucide-react';
import './styles/App.css';
import {customers} from './customers.js'



const QueryEditor = lazy(() => import('./components/QueryEditor'));
const QueryHistory = lazy(() => import('./components/QueryHistory'));
const ResultsTable = lazy(() => import('./components/ResultsTable'));

interface QueryResult {
  columns: string[];
  rows: any[];
}

interface HistoryItem {
  query: string;
  timestamp: Date;
}

interface SuggestedQuery {
  title: string;
  query: string;
  description: string;
}

const suggestedQueries: SuggestedQuery[] = [
  {
    title: "View all customers",
    query: "SELECT * FROM customers",
    description: "Display complete information for all customers"
  },
  {
    title: "Basic customer information",
    query: "SELECT customerID, companyName, contactName FROM customers",
    description: "Show essential customer details"
  },
  {
    title: "Contact information",
    query: "SELECT customerID, city, country, phone FROM customers",
    description: "Display customer contact and location details"
  },
  {
    title: "Find all German customers",
    query: "SELECT * FROM customers WHERE country = 'Germany'",
    description: "Lists all customers from Germany"
  },
  {
    title: "Count customers by country",
    query: "SELECT country, COUNT(*) as count FROM customers GROUP BY country",
    description: "Shows the distribution of customers across countries"
  },
  {
    title: "Find customers without fax",
    query: "SELECT * FROM customers WHERE fax = ''",
    description: "Lists customers who don't have a fax number"
  }
];

const quickStartQueries = [
  {
    title: "View all data",
    query: "SELECT * FROM customers"
  },
  {
    title: "Basic info",
    query: "SELECT customerID, companyName, contactName FROM customers"
  }
];

const sampleData = customers;

function App() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
     setShowWelcome(true)
  }, []);

  const closeWelcome = () => {
    setShowWelcome(false);
  };

  const executeQuery = useCallback(() => {
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        let filteredData = [...sampleData];
        
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('where')) {
          const whereCondition = query.toLowerCase().split('where')[1].trim();
          if (whereCondition.includes('country =')) {
            const country = whereCondition.split('=')[1].trim().replace(/'/g, '');
            filteredData = sampleData.filter(item => item.country === country);
          }
        }

        const result: QueryResult = {
          columns: Object.keys(sampleData[0]),
          rows: filteredData
        };

        setResults(result);
        setHistory(prev => [...prev, { query, timestamp: new Date() }]);
        setLoading(false);
      } catch (err) {
        setError('Error executing query: ' + (err instanceof Error ? err.message : String(err)));
        setLoading(false);
      }
    }, 1000);
  }, [query]);

  const exportResults = useCallback((format: 'csv' | 'json') => {
    if (!results) return;

    let content: string;
    let filename: string;
    let type: string;

    if (format === 'csv') {
      content = [
        results.columns.join(','),
        ...results.rows.map(row => 
          results.columns.map(col => JSON.stringify(row[col])).join(',')
        )
      ].join('\n');
      filename = 'query_results.csv';
      type = 'text/csv';
    } else {
      content = JSON.stringify(results.rows, null, 2);
      filename = 'query_results.json';
      type = 'application/json';
    }

    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [results]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const loadFromHistory = useCallback((historyItem: HistoryItem) => {
    setQuery(historyItem.query);
  }, []);

  const copyQuery = useCallback((queryText: string) => {
    navigator.clipboard.writeText(queryText);
  }, []);

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <Database size={24} />
            <span>Atlan Online SQL Query Executor</span>
          </div>
          <div className="nav-links">
            <button className="nav-button" onClick={() => setShowSuggestions(!showSuggestions)}>
              <HelpCircle size={20} />
              <span>Help</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="app-container">
        {showWelcome && (
          <div className="welcome-overlay">
            <div className="welcome-modal">
              <button className="close-button" onClick={closeWelcome}>
                <X size={20} />
              </button>
              <h2>Welcome to Atlan SQL Query Executor!</h2>
              <p>This tool helps you execute SQL queries on customer data. Here are some features:</p>
              <ul>
                <li>Execute SQL queries on sample customer data</li>
                <li>Export results in CSV or JSON format</li>
                <li>View and reuse query history</li>
                <li>Use suggested queries to get started</li>
              </ul>
              <div className="quick-start-queries">
                <h3>Try these queries to get started:</h3>
                {quickStartQueries.map((q, index) => (
                  <div key={index} className="quick-start-query">
                    <h4>{q.title}</h4>
                    <code>{q.query}</code>
                    <button onClick={() => { setQuery(q.query); closeWelcome(); }} className="button usq">
                      Use Query
                    </button>
                  </div>
                ))}
              </div>
              <button className="button usq" onClick={closeWelcome}>Get Started</button>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="suggestions-panel">
            <h3>Suggested Queries</h3>
            <div className="suggestions-grid">
              {suggestedQueries.map((sq, index) => (
                <div key={index} className="suggestion-card">
                  <h4>{sq.title}</h4>
                  <p>{sq.description}</p>
                  <code>{sq.query}</code>
                  <div className="suggestion-actions">
                    <button onClick={() => setQuery(sq.query)} className="button">
                      Use Query
                    </button>
                    <button onClick={() => copyQuery(sq.query)} className="button">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="query-section">
          <Suspense fallback={<div className="loading"></div>}>
            <QueryEditor
              query={query}
              loading={loading}
              results={results}
              setQuery={setQuery}
              executeQuery={executeQuery}
              exportResults={exportResults}
            />
            <QueryHistory
              history={history}
              clearHistory={clearHistory}
              loadFromHistory={loadFromHistory}
            />
          </Suspense>
        </div>

        {error && <div className="error-message">{error}</div>}

        <Suspense fallback={<div className="loading"></div>}>
          {results && (
            <ResultsTable
              results={results}
              loading={loading}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
            />
          )}
        </Suspense>
      </div>

    
    </div>
  );
}

export default App;