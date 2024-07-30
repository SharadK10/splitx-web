import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateGroupModal from './components/CreateGroupModal';
import Header from './components/Header';
import ListGroups from './components/ListGroups';
import GroupTransaction from './components/GroupTransaction';

function App() {
  return (
    <div className="App flex flex-col justify-center items-center">
      <Header/>
      <Routes>
      <Route path='/groups' element={<ListGroups />} /> 
      <Route path='/groups/:groupCode' element={ <GroupTransaction  />} /> 
      </Routes>
    </div>
  );
}

export default App;
