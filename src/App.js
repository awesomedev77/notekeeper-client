import { Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import TodoList from './TodoList/TodoList';
import './App.css'
import NotFound from './NotFound/NotFound';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/notes" element={<TodoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
