import CardContainer from "./components/card/container";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <CardContainer />
      </div>
    </CartProvider>
  );
}

export default App;
