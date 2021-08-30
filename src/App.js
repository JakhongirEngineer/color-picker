import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";

function App() {
  const findPalette = (id) => {
    return seedColors.find((sc) => sc.id === id);
  };
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <PaletteList palettes={seedColors} />}
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
    //   <Palette palette={generatePalette(seedColors[1])} />
    // </div>
  );
}

export default App;
