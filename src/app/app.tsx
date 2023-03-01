import { Route, Routes } from 'react-router-dom';
import TransactionsPage from './modules/transactions/TransactionsPage';


export function App() {
  return (
    <Routes>
      <Route path="/" element={<TransactionsPage />}></Route >
    </Routes>
  );
}

export default App;
