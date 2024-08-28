import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import CreateGroupModal from './components/CreateGroupModal';
import Header from './components/Header';
import ListGroups from './components/ListGroups';
import GroupTransaction from './components/GroupTransaction';
import LoginComponent from './components/LoginComponent';
import { useAuth } from './components/AuthContext';
import { RedirectComponent } from './components/RedirectComponent';

function AuthenticatedRoute({ children }) {
  const {isAuthenticated,loading} = useAuth();

  if(loading) {
    return <>Loading...</>
  }

  if(isAuthenticated) {
      return children
  } else {
      return <Navigate to="/login" />
  }
}


function App() {
  return ( 
    <div className="App flex flex-col justify-center items-center">
    <Header/>
    <Routes>
    <Route path='/login' element={<LoginComponent />} />
    <Route path='/redirectURI' element={<RedirectComponent />} />
    <Route path='/groups' element={<AuthenticatedRoute>
                            <ListGroups />
                        </AuthenticatedRoute>} /> 
    <Route path='/groups/:groupCode' element={ <GroupTransaction  />} /> 
    </Routes>
   </div>
 )};
    


export default App;
