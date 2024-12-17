import { useAtom } from 'jotai';
import './App.css';
import FooterSection from './components/footerSection/FooterSection';
import Home from './components/home/Home';
import LeftSection from './components/leftSection/LeftSection';
import RightSection from './components/rightSection/RightSection';
import TopSection from './components/TopSection/TopSection';
import { headerData } from './store/globalStates';
import DbToolBar from "./components/TopSection/DbToolBar";

function App() {
    const [allHeaderData] = useAtom(headerData);
    return (
      <div className="AppMainCon">
        <TopSection />
        {allHeaderData.currentInstance === null ?
        <Home />
        :
        <>
          <DbToolBar />
          <div className='AppMiddleCon'>
            <LeftSection />
            <RightSection />
          </div>
          <FooterSection/>
        </>
        }
      </div>
  );
}

export default App;
