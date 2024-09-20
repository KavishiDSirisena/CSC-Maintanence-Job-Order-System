import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminHome from './pages/AdminHome';
import AddOrder from "./pages/AddOrder";
import AdminOrderList from "./pages/AdminOrderList";
import EditOrder from "./pages/EditOrder";
import AddMaintainer from "./pages/AddMaintainer";
import AdminReport from "./pages/AdminReport";
import StatusApproval from "./pages/StatusApproval";
import AcceptOrder from "./pages/AcceptOrder";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
      
      <Routes>
        <Route path="/"  element={<Login/>} exact />
        <Route path="/home"  element={<AdminHome/>} exact />
        <Route path="/maintainanceOrder"  element={<AddOrder/>} />
        <Route path="/orderList"  element={<AdminOrderList/>} />
        <Route path="/orderList/edit/:id" element={<EditOrder/>}/>
        <Route path="/maintainanceStaff"  element={<AddMaintainer/>} />
        <Route path="/adminReport"  element={<AdminReport/>} />
        <Route path="/StatusApproval"  element={<StatusApproval/>} />
        <Route path="/StatusApproval/accept/:id" element={<AcceptOrder/>}/>







      </Routes>
      
    </Router>

    </div>
  );
}

export default App;
