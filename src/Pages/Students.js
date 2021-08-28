import axios from "axios";
import { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class Student extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      student: [],
    };
  }
  async componentDidMount() {
    const res = await axios.get("http://127.0.0.1:8000/api/student");
    if (res.data.status === 200) {
      this.setState({
        loading: false,
        student: res.data.student,
      });
    }
  }
  deletestudent = async (e,id) => {
    e.preventDefault();
    const thisclicked = e.currentTarget;
    thisclicked.innerText = "Deleting";
    const res = await axios.delete(`http://127.0.0.1:8000/api/deletestudent/${id}`);
    if(res.data.status === 200){
      thisclicked.closest("tr").remove();
      swal("Success", "Deleted Successfully", "success");
    }
  }
  render() {
    var html = "";
    if (this.state.loading) {
      html = (
        <tr>
          <td colSpan="5">
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
      );
    } else {
      html = this.state.student.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
              <Link className="btn btn-primary" to={`/editstudent/${item.id}`}>
                Edit
              </Link>
            </td>
            <td>
              <button className="btn btn-danger" onClick={(e) => this.deletestudent(e,item.id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    return (
      <div className="container text-center">
        <br></br>
        <h1 className="text-center">Student Lists</h1>
        <br></br>
        <Link className="btn btn-info mb-3" to="/addstudent">
          Add Student
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{html}</tbody>
        </Table>
      </div>
    );
  }
}

export default Student;
