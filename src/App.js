import './App.css';
import "./pages/style.css"
import { BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Router from './router';
function App() {

  return (
    <>
 <BrowserRouter>
    <div className="App">
  
      <Router />
        <NotificationContainer />
    </div>
     </BrowserRouter>
</>
  );
}

export default App;
