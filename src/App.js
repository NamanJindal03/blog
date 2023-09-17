import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import CreateEditPost from './pages/CreateEditPost';
import ViewPost from './pages/ViewPost';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/create" element={<CreateEditPost />} />
        <Route path="/edit/:id" element={<CreateEditPost />} />
        <Route path="/view/:id" element={<ViewPost />} />
        <Route path='*' element={<div>Not Found</div>}></Route>
      </Routes>
    </>
  );
}

export default App;