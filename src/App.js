import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import seedColors from "./seedColors";
function App() {
  console.log();
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[1])} />
    </div>
  );
}

export default App;
