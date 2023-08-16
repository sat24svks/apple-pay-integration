import logo from "./logo.svg";
import "./App.css";
import ApplePayButton from "./ApplePay";

function App() {
  return (
    <div>
      <h1>Checkout Page</h1>
      <ApplePayButton amount={25.99} />
    </div>
  );
}

export default App;
