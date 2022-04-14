import logo from './logo.svg';
import './App.css';
import { Footer } from './page/Footer/Footer';
import { NavBar } from './page/NavBar/NavBar';
import { HomePage } from './page/HomePage/HomePage';
import { Register } from './page/Register/Register';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <HomePage/>
      {/* <Register/> */}
      <Footer/>
    </div>
    

  );
}

export default App;
