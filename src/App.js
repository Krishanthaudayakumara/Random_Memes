import './App.css';
import Topbar from './components/Navbar';
import Meme from './components/Meme';
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Topbar />
      <Meme />
      <Footer />
    </div>
  );
}

export default App;
