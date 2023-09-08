import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
import { LayoutProvider } from "./context";

function App() {
  return(
    <BrowserRouter>
      <LayoutProvider>
        <AppRoutes />
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default App;
