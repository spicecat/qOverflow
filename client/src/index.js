import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { createRoot } from 'react-dom/client';
import App from './App';

TimeAgo.addDefaultLocale(en);

createRoot(document.getElementById('root')).render(<App />);