import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#374151',
              border: '2px dashed #e5e7eb',
              borderRadius: '2px',
              padding: '12px 20px',
              fontFamily: '"Patrick Hand", cursive',
              fontSize: '18px',
              boxShadow: '2px 3px 0px 0px rgba(55, 65, 81, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#fef08a', // Marker Yellow
                secondary: '#374151', // Pencil
              },
            },
            error: {
              iconTheme: {
                primary: '#f87171',
                secondary: '#ffffff',
              },
              style: {
                border: '2px dashed #f87171',
              }
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
