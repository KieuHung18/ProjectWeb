import logo from './logo.svg';
import './App.css';
import { Footer } from './page/Footer/Footer';
import { NavBar } from './page/NavBar/NavBar';
import { HomePage } from './page/HomePage/HomePage';
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
function App() {
  return (
    <div className="App">
      <NavBar/>
      <HomePage/>

      <div className="reveal">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          eius molestiae perferendis eos provident vitae iste.
        </p>
      </div>

      <Footer/>
    </div>
    

  );
}

export default App;
