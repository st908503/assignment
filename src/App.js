
import './App.css';
import NewFile from './NewFile';
import Header from './components/Header';
// import Workfile from './Workfile';
import Timezone from './components/Timezone';
import WorkingDays from './components/WorkingDays';

function App() {
  return (
    <div >
      <Header />
      <Timezone />
      <WorkingDays />
      <NewFile />
    </div>
  );
}

export default App;
