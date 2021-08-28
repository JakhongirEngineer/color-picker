import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import seedColors from "./seedColors";
function App() {
  console.log();
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Palette list</h1>} />
      <Route exact path="/palette/:id" render={() => <h1>Palette</h1>} />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[1])} />
    // </div>
  );
}

export default App;
