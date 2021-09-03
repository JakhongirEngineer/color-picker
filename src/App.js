import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from "./NewPaletteForm";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import SingleColorPalette from "./SingleColorPalette";
import Page from "./Page";
import "./styles/Page.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition classNames="page" timeout={500} key={location.key}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={() => (
                  <Page>
                    <NewPaletteForm
                      addPalette={addPalette}
                      palettes={palettes}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/"
                render={() => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                      paletteId={routeProps.match.params.paletteId}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
