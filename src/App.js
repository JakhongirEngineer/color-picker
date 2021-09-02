import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  useEffect(async () => {
    const palettesFromLocalStorage = await JSON.parse(
      window.localStorage.getItem("palettes")
    );
    if (palettesFromLocalStorage.length !== 0) {
      setPalettes(palettesFromLocalStorage);
    } else {
      setPalettes(seedColors);
    }
    console.log("palettesFromLocalStorage: ", palettesFromLocalStorage);
  }, []);

  const findPalette = (id) => {
    return palettes.find((sc) => sc.id === id);
  };
  const addPalette = (newPalette) => {
    const newPalettes = [...palettes, newPalette];
    setPalettes(newPalettes);
    window.localStorage.setItem("palettes", JSON.stringify(newPalettes));
  };

  const deletePalette = async (id) => {
    const palettesAfterDeletion = palettes.filter(
      (palette) => palette.id !== id
    );
    setPalettes(palettesAfterDeletion);
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(palettesAfterDeletion)
    );
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={() => (
          <NewPaletteForm addPalette={addPalette} palettes={palettes} />
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <PaletteList palettes={palettes} deletePalette={deletePalette} />
        )}
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
  );
}

export default App;
