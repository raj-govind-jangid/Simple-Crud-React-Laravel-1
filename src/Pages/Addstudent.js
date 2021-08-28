import axios from "axios";
import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class Addstudent extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            phone: "",
            error: []
        }
    }
    handleinput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    savestudent = async (e) =>{
        e.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/addstudent',this.state);
        if(res.data.status === 200){
           this.setState({
               "name":"",
               "email":"",
               "phone":"",
           });
           swal("Success", "Added Successfully", "success"); 
        }
        else{
          this.setState({
            error: res.data.validerror
          });
        }
    }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 mx-auto mt-3">
            <h1 className="mb-3">Add student</h1>
            <Link to="/" className="btn btn-success my-3"> Back</Link>
            <Form onSubmit={this.savestudent}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleinput}/>
                <Form.Text className="text-danger"><strong>{this.state.error.name}</strong></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleinput}/>
                <Form.Text className="text-danger"><strong>{this.state.error.email}</strong></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone </Form.Label>
                <Form.Control type="number" placeholder="Enter phone" name="phone" value={this.state.phone} onChange={this.handleinput}/>
                <Form.Text className="text-danger"><strong>{this.state.error.phone}</strong></Form.Text>
              </Form.Group>
              <Button variant="info" type="submit">
                Add Student
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Addstudent;
