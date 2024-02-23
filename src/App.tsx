import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Button } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <CssBaseline />
      <Button variant="contained" onClick={handleClick}>
        Click to +1: {count}
      </Button>
    </>
  );
}

export default App;
