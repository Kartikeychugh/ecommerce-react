import { HomePage } from "./components";
import { HatsPage } from "./components/hats-page";
import { Route } from "react-router-dom";
function App() {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/shop/hats" component={HatsPage} />
    </>
  );
}

export default App;
