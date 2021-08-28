import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import seedColors from "./seedColors";

function App() {
  const findPalette = (id) => {
    return seedColors.find((sc) => sc.id === id);
  };
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Palette list</h1>} />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[1])} />
    // </div>
  );
}

export default App;
