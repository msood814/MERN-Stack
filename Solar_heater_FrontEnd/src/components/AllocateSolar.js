import React, { Component } from "react";
import axios from "axios";
import "../App";

const url = "http://localhost:2040/allocate/";

class AllocateSolar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        distributorName: "",
        purchaseDate: "",
        installationDate: "",
        customerName: "",
        customerLocation: ""
      },
      formErrorMessage: {
        distributorName: "",
        purchaseDate: "",
        installationDate: "",
        customerName: "",
        customerLocation: ""
      },
      formValid: {
        distributorName: false,
        purchaseDate: false,
        installationDate: false,
        customerName: false,
        customerLocation: false,
        buttonActive: false
      },
      successMessage: "",
      errorMessage: ""
    }
  }

  submitAllocation = () => {
    /* 
      Make aN axios PUT request to http://localhost:2040/allocate/:distributorName with form data 
      and handle success and error cases 
    */
    axios.put(url+this.state.formValue.distributorName, this.state.formValue).then(response => {
      this.setState({ successMessage: response.data.message, errorMessage: "" })
    }).catch((error) => {
      if (error.response) {
        this.setState({ errorMessage: error.response.data.message, successMessage: "" })
      } else {
        this.setState({ errorMessage: "Server error", successMessage: "" })
      }
    })
  }

  handleSubmit = (event) => {
    /* prevent page reload and invoke submitAllocation() method */
    event.preventDefault();
    this.submitAllocation();

  }

  handleChange = (event) => {
    /* 
      invoke whenever any change happens in any of the input fields
      and update form state with the value. Also, Inoke validateField() method to validate the entered value
    */
    var form = this.state.formValue;
    form[event.target.name] = event.target.value;
    console.log(form);
    this.setState({ formValue: form })
    this.validateField(event.target.name, event.target.value);
  }

  validateField = (fieldName, value) => {
    /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
    var formValid = this.state.formValid;
    var formErr = this.state.formErrorMessage;
      if (fieldName === "distributorName") {
      if (value === 'select') {
        formValid.distributorName = false;
        formErr.distributorName = "Please select distributor Name"
      }
      else {
        formValid.distributorName = true;
        formErr.distributorName = ""
      }
    }
     else if (fieldName === 'customerName') {
       //console.log(value)
      if (value.match(/^[A-Za-z][A-Za-z\s]{3,}$/)) {
        formValid.customerName = true;
        formErr.customerName = ""
      }
      else if (value.length === 0) {
        formValid.customerName = false;
        formErr.customerName = "field required"
      } else {
        formValid.customerName = false;
        formErr.customerName = "Please enter Valid Name"
      }
    }
    else if (fieldName === 'customerLocation') {
      if (value.match(/^[A-Za-z][A-Za-z\s]{2,}$/)) {
        formValid.customerLocation = true;
        formErr.customerLocation = ""
      }
      else if (value.length === 0) {
        formValid.customerLocation = false;
        formErr.customerLocation = "field required"
      } 
      else {
        formValid.customerLocation = false;
        formErr.customerLocation = "Please enter Valid Location"
      }
      
     }
      else if (fieldName === 'purchaseDate') {
      var date = new Date();
      var pdate = new Date(value);
      if (date.toLocaleDateString()===pdate.toLocaleDateString()) {
        formValid.purchaseDate = true;
        formErr.purchaseDate = ""
      } else if (value.length === 0) {
        formValid.purchaseDate = false;
        formErr.purchaseDate = "field required"
      } else if(pdate<date){
        formValid.purchaseDate = false;
        formErr.purchaseDate = "Purchase date should be today or greater than today's date"
      }
      else{
        formValid.purchaseDate=true;
        formErr.purchaseDate=""
      }
      
    }
     else {
      var pdate1 = new Date(this.state.formValue.purchaseDate);
      var date1=new Date(pdate1.setDate(pdate1.getDate()+7))
      pdate1 = new Date(this.state.formValue.purchaseDate);
      var idate=new Date(value)
      if (value.length === 0) {
        formValid.installationDate = false;
        formErr.installationDate = "field required"
      }else if (idate > pdate1 && idate <date1) {
        formValid.installationDate = true;
        formErr.installationDate = ""
      }else {
        formValid.installationDate = false;
        formErr.installationDate = "Installation Date should be greater than purchase Date and within 7 days from purchase Date"
      }
      
    }
    formValid.buttonActive = formValid.distributorName && formValid.customerName && formValid.customerLocation && formValid.purchaseDate && formValid.installationDate;
      this.setState({ formValid: formValid,successMessage:"" })
  }


  render() {
    return (
      <React.Fragment>
        <div className="CreateBooking ">
          <div className="container-fluid row">
            <div className="col-md-6 offset-md-3">
              <br />
              <div className="card">
                <div className="card-header bg-custom">
                  <h4>Allocation Form</h4>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="distributorName" >Distributor Name </label>
                      <select name="distributorName" className="form-control" onChange={this.handleChange} value={this.state.formValue.distributorName}>
                        <option key="select" value="select">--Select--</option>
                        <option key="Suntek" value="Suntek">Suntek</option>
                        <option key="A4solar" value="A4solar">A4solar</option>
                        <option key="SupremeSolar" value="SupremeSolar">SupremeSolar</option>
                      </select><br />
                      <span className="text-danger" name="distributorNameError">{this.state.formErrorMessage.distributorName}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerName" >Customer Name</label>
                      <input type="text" name="customerName" className="form-control" placeholder="Enter Customer Name" value={this.state.formValue.customerName} onChange={this.handleChange} />
                      <span className="text-danger" name="customerNameError">{this.state.formErrorMessage.customerName}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerLocation" >Customer Location</label>
                      <input type="text" name="customerLocation" className="form-control" placeholder="Enter Customer Location" value={this.state.formValue.customerLocation} onChange={this.handleChange} />
                      <span className="text-danger" name="customerLocationError">{this.state.formErrorMessage.customerLocation}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="purchaseDate" >Purchase Date</label>
                      <input type="date" name="purchaseDate" className="form-control" value={this.state.formValue.purchaseDate} onChange={this.handleChange} />
                      <span className="text-danger" name="purchaseDateError">{this.state.formErrorMessage.purchaseDate}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="installationDate" >Installation Date</label>
                      <input type="date" name="installationDate" className="form-control" value={this.state.formValue.installationDate} onChange={this.handleChange} />
                      <span className="text-danger" name="installationDateError">{this.state.formErrorMessage.installationDate}</span>
                    </div>
                    <div className="form-group">
                      <button type="button" disabled={!this.state.formValid.buttonActive} className="btn btn-primary" name="allocateSolar" onClick={this.handleSubmit}>allocateSolar</button>
                    </div>
                  </form>
                  <span className="text-success" name="successMessage">{this.state.successMessage}</span>
                  <span className="text-danger" name="errorMessage">{this.state.errorMessage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default AllocateSolar;