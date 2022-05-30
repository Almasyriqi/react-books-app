import Main from './Components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBuku from './Components/AddBuku';
import EditBuku from './Components/EditBuku'
import './App.css';
import './Components/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Main/>}></Route>
        <Route path='/add' element={<AddBuku/>}></Route>
        <Route path='/edit/:id' element={<EditBuku/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
