import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";

function App() {
  const [palettes, setPalettes] = useState(seedColors);
  const findPalette = (id) => {
    return palettes.find((sc) => sc.id === id);
  };
  const addPalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };
  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={() => <NewPaletteForm addPalette={addPalette} />}
      />
      <Route
        exact
        path="/"
        render={() => <PaletteList palettes={palettes} />}
      />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColorPalette
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
            paletteId={routeProps.match.params.paletteId}
            colorId={routeProps.match.params.colorId}
          />
        )}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(palettes[1])} />
    // </div>
  );
}

export default App;
