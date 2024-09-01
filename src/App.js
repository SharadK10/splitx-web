import { Navigate, Route, Routes , useLocation} from 'react-router-dom';
import './App.css';
// import CreateGroupModal from './components/CreateGroupModal';
import Header from './components/Header';
import ListGroups from './components/ListGroups';
import GroupTransaction from './components/GroupTransaction';
import LoginComponent from './components/LoginComponent';
import JoinGroup from './components/joinGroup';
import { useAuth } from './components/AuthContext';
import { RedirectComponent } from './components/RedirectComponent';

function AuthenticatedRoute({ children }) {
  const {isAuthenticated,loading} = useAuth();
  const location = useLocation();
  if(loading) {
    return <>Loading...</>
  }
  localStorage.setItem('redirectAfterLogin', location.pathname + location.search);

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
    <Route path='/groups' element={<AuthenticatedRoute> <ListGroups />  </AuthenticatedRoute>} /> 
    <Route path='/groups/:groupCode' element={ <AuthenticatedRoute> <GroupTransaction /> </AuthenticatedRoute>} /> 
    <Route path='/join-group/:groupCode' element={<AuthenticatedRoute> <JoinGroup /> </AuthenticatedRoute> }/>
    </Routes>
   </div>
 )};
    


export default App;
