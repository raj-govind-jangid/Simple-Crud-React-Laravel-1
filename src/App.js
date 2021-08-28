import { Container, Nav, Navbar } from "react-bootstrap";
import {Link, Route, Switch} from "react-router-dom";
import Student from "./Pages/Students";
import Addstudent from "./Pages/Addstudent";
import Editstudent from "./Pages/Editstudent";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Link className="navbar-brand" to="/">Navbar</Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/addstudent">Add Student</Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/" exact component={Student}></Route>
        <Route path="/addstudent" component={Addstudent}></Route>
        <Route path="/editstudent/:id" component={Editstudent}></Route>
      </Switch>
    </div>
  );
}

export default App;
