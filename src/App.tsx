import { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { MarkdownContent, ThemeProvider } from '@asafarim/simple-md-viewer';
import '@asafarim/simple-md-viewer/dist/style.css';

function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('smv-theme') as 'light' | 'dark' | null;
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('smv-theme', newTheme);
      return newTheme;
    });
  };

  // Apply theme to document root for global styling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Debug: Monitor URL changes to see if routing is working
  useEffect(() => {
    const handleHashChange = () => {
      console.log('🔗 URL changed to:', window.location.hash);
      console.log('📄 Should be loading file:', window.location.hash.substring(2)); // Remove #/ prefix
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <div className={`app ${theme}`}>
        <HashRouter future={{ v7_startTransition: true }}>
          <MarkdownContent 
            apiBaseUrl="http://localhost:3300" 
            showHomePage={true}
            hideFileTree={false}
          />
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
