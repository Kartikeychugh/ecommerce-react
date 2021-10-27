import { HomePage, ShopPage } from "./components";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/shop" component={ShopPage} />
    </>
  );
}

export default App;
