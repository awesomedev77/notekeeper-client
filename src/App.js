import { Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import TodoList from './TodoList/TodoList';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/home" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
