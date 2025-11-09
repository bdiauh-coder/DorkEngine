'use client';

import { useState, useEffect, useMemo, useCallback, memo, useDeferredValue, type ChangeEvent } from 'react';
import { DORK_CATEGORIES, GOOGLE_OPERATORS } from './data/dorks';

const CustomSelect = memo(({ value, onChange, options, label }: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.custom-select') && !target.closest('.custom-select-dropdown')) {
          setIsOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div style={{ position: 'relative' }}>
      <label className="label">{label}</label>
      <div
        className="custom-select"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="custom-select-value">{value}</div>
        <div className="custom-select-arrow">{isOpen ? '▲' : '▼'}</div>
      </div>
      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map(option => (
            <div
              key={option}
              className={`custom-select-option ${value === option ? 'selected' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const DorkItem = memo(({ dork, index, targetInput, keywordInput, isExpanded, onToggle, onSave }: {
  dork: string;
  index: number;
  targetInput: string;
  keywordInput: string;
  isExpanded: boolean;
  onToggle: (index: number) => void;
  onSave: (dork: string, category: string) => void;
}) => {
  const finalDork = useMemo(() => {
    let result = dork;
    if (targetInput) result = `${dork} site:${targetInput}`;
    if (keywordInput) result = `${result} ${keywordInput}`;
    return result;
  }, [dork, targetInput, keywordInput]);

  const googleUrl = useMemo(() => 
    `https://www.google.com/search?q=${encodeURIComponent(finalDork)}`,
    [finalDork]
  );

  const handleToggle = useCallback(() => onToggle(index), [onToggle, index]);
  const handleSave = useCallback(() => onSave(finalDork, 'Selected Category'), [onSave, finalDork]);

  return (
    <div className="expander">
      <div className="expander-header" onClick={handleToggle}>
        🔍 Dork #{index + 1}: {dork.substring(0, 50)}...
      </div>
      {isExpanded && (
        <div className="expander-content">
          <div className="code-block">{finalDork}</div>
          <div className="grid-2" style={{ marginTop: '10px' }}>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer">
              <button className="button">🚀 Search on Google</button>
            </a>
            <button className="button" onClick={handleSave}>
              💾 Save to History
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

interface SearchHistoryEntry {
  dork: string;
  category: string;
  timestamp: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('🔐 Admin & Login Panels');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryEntry[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [creditText, setCreditText] = useState('MADE BY WALTER');
  const [isGlitching, setIsGlitching] = useState(false);
  
  const [customSite, setCustomSite] = useState('');
  const [customInurl, setCustomInurl] = useState('');
  const [customIntitle, setCustomIntitle] = useState('');
  const [customIntext, setCustomIntext] = useState('');
  const [customFiletype, setCustomFiletype] = useState('');
  const [excludeTerms, setExcludeTerms] = useState('');
  const [includeTerms, setIncludeTerms] = useState('');
  const [exactPhrase, setExactPhrase] = useState('');
  const [useAllinurl, setUseAllinurl] = useState(false);
  const [useAllintitle, setUseAllintitle] = useState(false);
  const [useAllintext, setUseAllintext] = useState(false);

  const [exportFormat, setExportFormat] = useState('TXT');
  const [expandedDorks, setExpandedDorks] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const cycleText = () => {
      setIsGlitching(true);
      timeout = setTimeout(() => {
        setCreditText(prev => 
          prev === 'MADE BY WALTER' ? 'GITHUB.COM/WALTERWHITE-69' : 'MADE BY WALTER'
        );
        setIsGlitching(false);
      }, 600);
    };

    const interval = setInterval(cycleText, 2000);
    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (selectedCategory !== '🎯 Custom Dorks') {
      const subcategories = Object.keys(DORK_CATEGORIES[selectedCategory] || {});
      if (subcategories.length > 0) {
        setSelectedSubcategory(subcategories[0]);
      }
    }
  }, [selectedCategory]);

  const deferredTarget = useDeferredValue(targetInput);
  const deferredKeyword = useDeferredValue(keywordInput);

  const handleTargetChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTargetInput(e.target.value);
  }, []);

  const handleKeywordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  }, []);

  const saveDork = useCallback((dork: string, category: string) => {
    const newEntry = {
      dork,
      category,
      timestamp: new Date().toLocaleString()
    };
    setSearchHistory(prev => [...prev, newEntry]);
  }, []);

  const buildCustomDork = useMemo(() => {
    const parts = [];
    
    if (customSite) parts.push(`site:${customSite}`);
    if (customInurl) parts.push(useAllinurl ? `allinurl:${customInurl}` : `inurl:${customInurl}`);
    if (customIntitle) parts.push(useAllintitle ? `allintitle:${customIntitle}` : `intitle:${customIntitle}`);
    if (customIntext) parts.push(useAllintext ? `allintext:${customIntext}` : `intext:${customIntext}`);
    if (customFiletype) parts.push(`filetype:${customFiletype}`);
    if (exactPhrase) parts.push(exactPhrase);
    if (includeTerms) {
      includeTerms.split(',').forEach(term => parts.push(`+${term.trim()}`));
    }
    if (excludeTerms) {
      excludeTerms.split(',').forEach(term => parts.push(`-${term.trim()}`));
    }
    
    return parts.join(' ');
  }, [customSite, customInurl, useAllinurl, customIntitle, useAllintitle, customIntext, useAllintext, customFiletype, exactPhrase, includeTerms, excludeTerms]);

  const exportData = useCallback(() => {
    if (searchHistory.length === 0) return;

    let content = '';
    let filename = '';
    let mimeType = '';

    if (exportFormat === 'TXT') {
      content = 'GOOGLE DORKING SEARCH HISTORY\n';
      content += '='.repeat(50) + '\n\n';
      searchHistory.forEach(entry => {
        content += `Timestamp: ${entry.timestamp}\n`;
        content += `Category: ${entry.category}\n`;
        content += `Dork: ${entry.dork}\n`;
        content += '-'.repeat(50) + '\n\n';
      });
      filename = `dork_history_${Date.now()}.txt`;
      mimeType = 'text/plain';
    } else if (exportFormat === 'CSV') {
      content = 'timestamp,category,dork\n';
      searchHistory.forEach(entry => {
        content += `"${entry.timestamp}","${entry.category}","${entry.dork}"\n`;
      });
      filename = `dork_history_${Date.now()}.csv`;
      mimeType = 'text/csv';
    } else if (exportFormat === 'JSON') {
      content = JSON.stringify(searchHistory, null, 2);
      filename = `dork_history_${Date.now()}.json`;
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [searchHistory, exportFormat]);

  const dorks = useMemo(() => 
    selectedCategory !== '🎯 Custom Dorks' && selectedSubcategory
      ? DORK_CATEGORIES[selectedCategory]?.[selectedSubcategory] || []
      : [],
    [selectedCategory, selectedSubcategory]
  );

  const toggleExpander = useCallback((index: number) => {
    setExpandedDorks(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      return newExpanded;
    });
  }, []);

  const memoizedDorks = useMemo(() => 
    dorks.map((dork, index) => {
      const isExpanded = expandedDorks.has(index);
      return {
        dork,
        index,
        isExpanded,
        targetInput: isExpanded ? targetInput : deferredTarget,
        keywordInput: isExpanded ? keywordInput : deferredKeyword,
      };
    }),
    [dorks, expandedDorks, targetInput, keywordInput, deferredTarget, deferredKeyword]
  );

  const categories = useMemo(() => Object.keys(DORK_CATEGORIES), []);
  const subcategories = useMemo(() => 
    selectedCategory !== '🎯 Custom Dorks' 
      ? Object.keys(DORK_CATEGORIES[selectedCategory] || {})
      : [],
    [selectedCategory]
  );

  const customDork = buildCustomDork;

  return (
    <div className="main-container">
      <h1 className="title">🔍 DorkEngine</h1>
      
      <div className="hero-section">
        <p style={{ color: '#ff6b6b', fontSize: '1.3rem', fontWeight: 700, margin: '0 0 15px 0', letterSpacing: '0.5px' }}>
          ⚡ Professional Google Dorking Platform for Security Research & OSINT
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
          <span className="feature-badge">✨ 1000+ Pre-Built Dorks</span>
          <span className="feature-badge">🔧 Advanced Builder</span>
          <span className="feature-badge">🎯 36 Categories</span>
          <span className="feature-badge">💾 Export Ready</span>
        </div>
      </div>

      <div className="tab-container">
        <button className={`tab-button ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
          🎯 Quick Dorks
        </button>
        <button className={`tab-button ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
          🔧 Custom Builder
        </button>
        <button className={`tab-button ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
          📚 Operators Guide
        </button>
        <button className={`tab-button ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>
          📊 History
        </button>
        <button className={`tab-button ${activeTab === 4 ? 'active' : ''}`} onClick={() => setActiveTab(4)}>
          💾 Export
        </button>
      </div>

      {activeTab === 0 && (
        <div>
          <h2 style={{ color: '#ff6b6b', fontWeight: 700, marginTop: '2rem', fontSize: '2rem' }}>🎯 Pre-Built Dork Templates</h2>
          <p style={{ color: '#ffd5d5', marginBottom: '20px' }}>Select a category and get instant Google dork queries</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: isClient && window.innerWidth > 768 ? '1fr 2fr' : '1fr', gap: '30px', marginTop: '30px' }}>
            <div>
              <CustomSelect
                label="Select Dork Category"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories}
              />

              {selectedCategory !== '🎯 Custom Dorks' && subcategories.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <CustomSelect
                    label="Select Subcategory"
                    value={selectedSubcategory}
                    onChange={setSelectedSubcategory}
                    options={subcategories}
                  />
                </div>
              )}

              <label className="label" style={{ marginTop: '20px' }}>🎯 Target (optional)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g., example.com"
                value={targetInput}
                onChange={handleTargetChange}
              />

              <label className="label" style={{ marginTop: '20px' }}>🔑 Additional Keywords (optional)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g., admin password"
                value={keywordInput}
                onChange={handleKeywordChange}
              />
            </div>

            <div>
              {selectedCategory !== '🎯 Custom Dorks' && selectedSubcategory && (
                <>
                  <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginBottom: '20px' }}>
                    Available Dorks in {selectedSubcategory}
                  </h3>
                  
                  {memoizedDorks.length > 0 ? (
                    memoizedDorks.map(({ dork, index, isExpanded, targetInput, keywordInput }) => (
                      <DorkItem
                        key={index}
                        dork={dork}
                        index={index}
                        targetInput={targetInput}
                        keywordInput={keywordInput}
                        isExpanded={isExpanded}
                        onToggle={toggleExpander}
                        onSave={saveDork}
                      />
                    ))
                  ) : (
                    <p style={{ color: '#ff8888' }}>No pre-built dorks available. Use the Custom Builder!</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <h2 style={{ color: '#ff6b6b', fontWeight: 700, marginTop: '2rem', fontSize: '2rem' }}>🔧 Custom Dork Builder</h2>
          <p style={{ color: '#ffd5d5', marginBottom: '20px' }}>Build your own advanced Google dork queries</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: isClient && window.innerWidth > 768 ? '1fr 1fr' : '1fr', gap: '30px', marginTop: '30px' }}>
            <div>
              <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginBottom: '20px' }}>Basic Parameters</h3>
              
              <label className="label">🌐 Site/Domain</label>
              <input type="text" className="input-field" placeholder="example.com" value={customSite} onChange={(e) => setCustomSite(e.target.value)} />

              <label className="label" style={{ marginTop: '15px' }}>🔗 In URL</label>
              <input type="text" className="input-field" placeholder="admin" value={customInurl} onChange={(e) => setCustomInurl(e.target.value)} />

              <label className="label" style={{ marginTop: '15px' }}>📋 In Title</label>
              <input type="text" className="input-field" placeholder="login" value={customIntitle} onChange={(e) => setCustomIntitle(e.target.value)} />

              <label className="label" style={{ marginTop: '15px' }}>📄 In Text</label>
              <input type="text" className="input-field" placeholder="password" value={customIntext} onChange={(e) => setCustomIntext(e.target.value)} />

              <label className="label" style={{ marginTop: '15px' }}>📁 File Type</label>
              <input type="text" className="input-field" placeholder="pdf, sql, xls" value={customFiletype} onChange={(e) => setCustomFiletype(e.target.value)} />

              <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginTop: '30px', marginBottom: '20px' }}>Advanced Options</h3>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', color: '#ffd5d5', cursor: 'pointer' }}>
                  <input type="checkbox" className="checkbox-field" checked={useAllinurl} onChange={(e) => setUseAllinurl(e.target.checked)} style={{ marginRight: '10px' }} />
                  Use allinurl instead of inurl
                </label>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', color: '#ffd5d5', cursor: 'pointer' }}>
                  <input type="checkbox" className="checkbox-field" checked={useAllintitle} onChange={(e) => setUseAllintitle(e.target.checked)} style={{ marginRight: '10px' }} />
                  Use allintitle instead of intitle
                </label>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', color: '#ffd5d5', cursor: 'pointer' }}>
                  <input type="checkbox" className="checkbox-field" checked={useAllintext} onChange={(e) => setUseAllintext(e.target.checked)} style={{ marginRight: '10px' }} />
                  Use allintext instead of intext
                </label>
              </div>

              <label className="label">❌ Exclude Terms</label>
              <input type="text" className="input-field" placeholder="wordpress, joomla" value={excludeTerms} onChange={(e) => setExcludeTerms(e.target.value)} />

              <label className="label" style={{ marginTop: '15px' }}>✅ Must Include</label>
              <input type="text" className="input-field" placeholder="database" value={includeTerms} onChange={(e) => setIncludeTerms(e.target.value)} />

              <label className="label" style={{ marginTop: '15px' }}>🎯 Exact Phrase</label>
              <input type="text" className="input-field" placeholder='"error message"' value={exactPhrase} onChange={(e) => setExactPhrase(e.target.value)} />
            </div>

            <div>
              <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginBottom: '20px' }}>🔮 Generated Dork Query</h3>
              
              {customDork ? (
                <>
                  <div className="code-block" style={{ minHeight: '60px', marginBottom: '20px' }}>{customDork}</div>
                  
                  <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginBottom: '20px' }}>🚀 Actions</h3>
                  
                  <div className="grid-3">
                    <a href={`https://www.google.com/search?q=${encodeURIComponent(customDork)}`} target="_blank" rel="noopener noreferrer">
                      <button className="button">🔍 Search Google</button>
                    </a>
                    <button className="button" onClick={() => saveDork(customDork, 'Custom Built')}>💾 Save Dork</button>
                    <button className="button" onClick={() => navigator.clipboard.writeText(customDork)}>📋 Copy</button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ color: '#ff8888', marginBottom: '20px' }}>👆 Fill in the parameters above to build your custom dork</p>
                  
                  <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.3rem', marginTop: '30px', marginBottom: '15px' }}>💡 Quick Start Examples (1000+ Dorks Available)</h3>
                  <div style={{ fontSize: '14px', lineHeight: '2' }}>
                    <p><strong>WordPress admin panels:</strong> <code>site:*.edu inurl:wp-admin intitle:login</code></p>
                    <p><strong>PDF research papers:</strong> <code>site:arxiv.org filetype:pdf machine learning</code></p>
                    <p><strong>Swagger API docs:</strong> <code>inurl:swagger.json OR inurl:api-docs.json</code></p>
                    <p><strong>GitHub config files:</strong> <code>site:github.com filename:.env DB_PASSWORD</code></p>
                    <p><strong>Exposed database backups:</strong> <code>intitle:"Index of" filetype:sql "backup"</code></p>
                    <p><strong>University portals:</strong> <code>site:*.edu inurl:portal intitle:"student login"</code></p>
                    <p><strong>Jenkins servers:</strong> <code>intitle:"Dashboard [Jenkins]" inurl:jenkins</code></p>
                    <p><strong>Apache status pages:</strong> <code>intitle:"Apache Status" "Server Version"</code></p>
                    <p><strong>AWS S3 buckets:</strong> <code>site:s3.amazonaws.com intitle:"Bucket listing"</code></p>
                    <p><strong>phpMyAdmin panels:</strong> <code>intitle:phpMyAdmin "Welcome to phpMyAdmin"</code></p>
                    <p><strong>Elasticsearch nodes:</strong> <code>intitle:"Elasticsearch" "cluster_name" port:9200</code></p>
                    <p><strong>MongoDB databases:</strong> <code>intitle:"MongoDB" "mongod --version"</code></p>
                    <p><strong>Docker registries:</strong> <code>intitle:"Docker Registry" "v2/_catalog"</code></p>
                    <p><strong>GitLab instances:</strong> <code>inurl:gitlab intitle:"Sign in" -demo</code></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <h2 style={{ color: '#ff6b6b', fontWeight: 700, marginTop: '2rem', fontSize: '2rem' }}>📚 Google Operators Reference Guide</h2>
          <p style={{ color: '#ffd5d5', marginBottom: '20px' }}>Complete guide to all Google search operators</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
            {Object.entries(GOOGLE_OPERATORS).map(([operator, description]) => (
              <div key={operator} className="expander">
                <div className="expander-header">
                  <strong>{operator}</strong>
                </div>
                <div className="expander-content">
                  <p style={{ color: '#ffd5d5' }}>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <hr />

          <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginTop: '30px', marginBottom: '15px' }}>💡 Pro Tips (30+ Operators Available)</h3>
          <ul style={{ color: '#ffd5d5', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>Combine operators</strong> for powerful searches (e.g., <code>site:gov filetype:pdf "confidential"</code>)</li>
            <li><strong>Use quotes</strong> for exact matches (e.g., <code>"index of /" +.git</code>)</li>
            <li><strong>Exclude unwanted results</strong> with minus sign (e.g., <code>admin -demo -test</code>)</li>
            <li><strong>Use wildcards</strong> for variations (e.g., <code>admin * panel</code>)</li>
            <li><strong>Group with parentheses</strong> for complex queries (e.g., <code>(admin|root) intitle:login</code>)</li>
            <li><strong>Search cloud storage</strong> for exposed data (e.g., <code>site:s3.amazonaws.com filetype:sql</code>)</li>
            <li><strong>Find version control</strong> exposures (e.g., <code>inurl:/.git/config</code>)</li>
            <li><strong>Use date filters</strong> for recent results (e.g., <code>after:2024-01-01 "data breach"</code>)</li>
            <li><strong>Target specific TLDs</strong> for focused searches (e.g., <code>site:(gov|edu) filetype:xls</code>)</li>
            <li><strong>Be specific</strong> to reduce noise and get better results from 1000+ available dorks</li>
          </ul>
        </div>
      )}

      {activeTab === 3 && (
        <div>
          <h2 style={{ color: '#ff6b6b', fontWeight: 700, marginTop: '2rem', fontSize: '2rem' }}>📊 Search History</h2>
          
          {searchHistory.length > 0 ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <p style={{ color: '#ffd5d5' }}><strong>Total Searches:</strong> {searchHistory.length}</p>
                <button className="button" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => setSearchHistory([])}>
                  🗑️ Clear History
                </button>
              </div>

              {searchHistory.slice().reverse().map((entry, index) => (
                <div key={index} className="expander">
                  <div className="expander-header">
                    🔍 {entry.timestamp} - {entry.category}
                  </div>
                  <div className="expander-content">
                    <div className="code-block">{entry.dork}</div>
                    <div className="grid-2" style={{ marginTop: '10px' }}>
                      <a href={`https://www.google.com/search?q=${encodeURIComponent(entry.dork)}`} target="_blank" rel="noopener noreferrer">
                        <button className="button">🚀 Search Again</button>
                      </a>
                      <button className="button" onClick={() => {
                        const actualIdx = searchHistory.length - 1 - index;
                        setSearchHistory(searchHistory.filter((_, i) => i !== actualIdx));
                      }}>
                        ❌ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p style={{ color: '#ff8888', marginTop: '30px' }}>📭 No search history yet. Start exploring dorks!</p>
          )}
        </div>
      )}

      {activeTab === 4 && (
        <div>
          <h2 style={{ color: '#ff6b6b', fontWeight: 700, marginTop: '2rem', fontSize: '2rem' }}>💾 Export Options</h2>
          
          {searchHistory.length > 0 ? (
            <>
              <h3 style={{ color: '#ff8888', fontWeight: 700, fontSize: '1.4rem', marginTop: '30px', marginBottom: '15px' }}>Export Your Search History</h3>
              
              <label className="label">Select Export Format</label>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <button 
                  className={exportFormat === 'TXT' ? 'button' : 'button'} 
                  style={{ opacity: exportFormat === 'TXT' ? 1 : 0.6 }}
                  onClick={() => setExportFormat('TXT')}
                >
                  📄 TXT
                </button>
                <button 
                  className={exportFormat === 'CSV' ? 'button' : 'button'} 
                  style={{ opacity: exportFormat === 'CSV' ? 1 : 0.6 }}
                  onClick={() => setExportFormat('CSV')}
                >
                  📊 CSV
                </button>
                <button 
                  className={exportFormat === 'JSON' ? 'button' : 'button'} 
                  style={{ opacity: exportFormat === 'JSON' ? 1 : 0.6 }}
                  onClick={() => setExportFormat('JSON')}
                >
                  🗂️ JSON
                </button>
              </div>

              <button className="button" onClick={exportData}>
                📥 Download {exportFormat}
              </button>

              {exportFormat === 'TXT' && (
                <div className="code-block" style={{ marginTop: '20px', maxHeight: '300px', overflow: 'auto' }}>
                  GOOGLE DORKING SEARCH HISTORY<br/>
                  {'='.repeat(50)}<br/><br/>
                  {searchHistory.map(entry => (
                    <div key={entry.timestamp}>
                      Timestamp: {entry.timestamp}<br/>
                      Category: {entry.category}<br/>
                      Dork: {entry.dork}<br/>
                      {'-'.repeat(50)}<br/><br/>
                    </div>
                  ))}
                </div>
              )}

              {exportFormat === 'CSV' && (
                <div className="code-block" style={{ marginTop: '20px', maxHeight: '300px', overflow: 'auto' }}>
                  timestamp,category,dork<br/>
                  {searchHistory.map(entry => (
                    <div key={entry.timestamp}>"{entry.timestamp}","{entry.category}","{entry.dork}"</div>
                  ))}
                </div>
              )}

              {exportFormat === 'JSON' && (
                <div className="code-block" style={{ marginTop: '20px', maxHeight: '300px', overflow: 'auto' }}>
                  <pre>{JSON.stringify(searchHistory, null, 2)}</pre>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: '#ff8888', marginTop: '30px' }}>📭 No search history to export. Start exploring dorks first!</p>
          )}
        </div>
      )}

      <hr />

      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3 className={`cyber-text ${isGlitching ? 'glitching' : ''}`} data-text={creditText}>
          {creditText}
        </h3>
      </div>
    </div>
  );
}
