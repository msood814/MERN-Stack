import React, { Component } from "react";
import axios from "axios";
import "../App.css";

const url = "http://localhost:2040/findService/";

class GetDistributors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distributorData: [],
      form: {
        customerLocation: ""
      },
      formErrorMessage: {
        customerLocation: ""
      },
      formValid: {
        customerLocation: false,
        buttonActive: false
      },
      errorMessage: "",
      successMessage: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchDistributorByLocation(); 
  }

  handleChange = (event) => {
  var form=this.state.form;
   form[event.target.name]=event.target.value;
   console.log(form);
   this.setState({form:form})
   this.validateField(event.target.name,event.target.value);
  }

  validateField = (fieldName, value) => {
    var formValid=this.state.formValid;
    var formErr=this.state.formErrorMessage;
    if(value.match(/^[A-Za-z][A-Za-z\s]{2,}$/)){
      formValid.customerLocation=true;
      formErr.customerLocation=""
    }
    else if(value.length===0){
      formValid.customerLocation=false;
      formErr.customerLocation="field required"
    }else{
      formValid.customerLocation=false;
      formErr.customerLocation="Please enter Valid Location"
    }
    formValid.buttonActive= formValid.customerLocation;
    this.setState({formValid:formValid , formErrorMessage:formErr})
  }

  fetchDistributorByLocation = () => {
    
    axios.get(url+this.state.form.customerLocation).then(response=>{
      console.log(response.data,response.statusText);
      this.setState({distributorData:response.data,errorMessage:""})
     }).catch(error=>{
       if(error.status===404){
         this.setState({errorMessage:error.message});
         console.log(this.state.errorMessage)
       }else{
         this.setState({errorMessage:"Please Start your express server"})
       }
     })
  }

  render() {
    var {distributorData} = this.state

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom text-center">
                <h4>View Distributors</h4>
              </div>
              <div className="card-body view">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="customerLocation" >Customer Location</label>
                    <input type="text" name="customerLocation" className="form-control" placeholder="Enter Customer Location" onChange={this.handleChange}/>
                    <span classname="text-danger" name="customerLocationError">{this.state.formErrorMessage.customerLocation}</span>
                  </div>
                  <div className="form-group">
                    <button type="submit" disabled={!this.state.formValid.buttonActive} name="getDistributors" className="btn btn-primary">getDistributors</button>
                  </div>
                  <span className="text-success">
                 {this.state.distributorData.length>0?<div><h5>the distributors available in {this.state.form.customerLocation} are:</h5><ul>{this.state.distributorData.map((item=><li>{item}</li>))}</ul></div>:null}
                 </span>
                          <span className="text-danger" name="errorMessage">{this.state.errorMessage}</span>
                </form>   
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GetDistributors;