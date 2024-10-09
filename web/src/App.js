import { observer } from "mobx-react-lite";
import { Routers } from './components/Routers';
import NavBar from "./components/NavBar";




function App() {
  
  return (
    <>
      <Routers />
    </>
  );
}

export default observer(App);
