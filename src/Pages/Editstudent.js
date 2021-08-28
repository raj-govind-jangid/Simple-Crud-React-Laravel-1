import axios from "axios";
import React from "react";
import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class Editstudent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      error: [],
    };
  }
  async componentDidMount() {
    const studid = this.props.match.params.id;
    const res = await axios.get(
      `http://127.0.0.1:8000/api/editstudent/${studid}`
    );
    if (res.data.status === 200) {
      this.setState({
        name: res.data.student.name,
        email: res.data.student.email,
        phone: res.data.student.phone,
      });
    }
  }

  handleinput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updatestudent = async (e) => {
    e.preventDefault();
    document.getElementById("updatebtn").disabled = true;
    document.getElementById("updatebtn").innerText = "Updating";
    const studid = this.props.match.params.id;
    const res = await axios.put(
      `http://127.0.0.1:8000/api/updatestudent/${studid}`,
      this.state
    );
    if (res.data.status === 200) {
      this.setState({
        name: res.data.student.name,
        email: res.data.student.email,
        phone: res.data.student.phone,
      });
      document.getElementById("updatebtn").disabled = false;
      document.getElementById("updatebtn").innerText = "Update";
      swal("Success", "Updated Successfully", "success");
    } else {
      this.setState({
        error: res.data.validerror,
      });
      document.getElementById("updatebtn").disabled = false;
      document.getElementById("updatebtn").innerText = "Update";
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-4 mx-auto mt-3">
              <h1 className="mb-3">Edit student</h1>
              <Link to="/" className="btn btn-success my-3">
                {" "}
                Back
              </Link>
              <Form onSubmit={this.updatestudent}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleinput}
                  />
                  <Form.Text className="text-danger">
                    <strong>{this.state.error.name}</strong>
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleinput}
                  />
                  <Form.Text className="text-danger">
                    <strong>{this.state.error.email}</strong>
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter phone"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleinput}
                  />
                  <Form.Text className="text-danger">
                    <strong>{this.state.error.phone}</strong>
                  </Form.Text>
                </Form.Group>
                <Button variant="info" type="submit" id="updatebtn">
                  Update Student
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editstudent;
