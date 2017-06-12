import React, { Component } from 'react';


class SignupForm extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      companyType: 'Please Select'

    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    e.target.classList.add('active');
    
    this.setState({
      [e.target.name]: e.target.value
    });
    
    this.showInputError(e.target.name);
  }
  
  handleSubmit(e) {    
    e.preventDefault();
    
    console.log('component state', JSON.stringify(this.state));
    
    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit'); // Remove after dev
    } else {
      alert ("Information sucessfully submitted");
    }
  }
  
  //Input
  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {
      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.name);
      
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  }

  //Select Dropdown
  showFormErrorsSelect() {
    const select = document.querySelectorAll('select');
    let isFormSelectValid = true;
    
    select.forEach(select => {
      select.classList.add('active');
      
      const isInputSelectValid = this.showInputError(select.name);
      
      if (!isInputSelectValid) {
        isFormSelectValid = false;
      }
    });
    
    return isFormSelectValid
  }
  
  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';
    
    if (isPasswordConfirm) {
      if (this.refs.password.value !== this.refs.passwordConfirm.value) {
        this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
      } else {
        this.refs.passwordConfirm.setCustomValidity('');
      }
    }
        
    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`; 
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} Must contain at least one number, lower case letter and upper case `; 
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      }
      return false;
    }
    
    error.textContent = '';
    return true;
  }

  render() {
    return (
      <form noValidate>
        <div className="form-group">
          <label id="usernameLabel">Username</label>
          <input className="form-control"
            placeholder="your@email"
            type="email"
            name="username"
            ref="username"
            value={ this.state.username } 
            onChange={ this.handleChange }
            required />
          <div className="error" id="usernameError" />
        </div>
        
        <div className="form-group">
          <label id="passwordLabel">Password</label>
          <input className="form-control"
            placeholder="Password"
            type="password" 
            name="password"
            ref="password"
            value={ this.state.password } 
            onChange={ this.handleChange }
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            required />
          <div className="error" id="passwordError" />
        </div>

        <div className="form-group">
          <label id="passwordConfirmLabel">Confirm Password</label>
          <input className="form-control"
            placeholder="Confirm Password"
            type="password" 
            name="passwordConfirm"
            ref="passwordConfirm"
            value={ this.state.passwordConfirm } 
            onChange={ this.handleChange }
            required />
          <div className="error" id="passwordConfirmError" />
        </div>

        <div className="form-group">
          <label id="companyTypeLabel">Select Company Type:  </label>
            <select className="form-control"
                placeholder="Selection an option"
                type="text"
                name="companyType"
                refs="companyType"
                value={ this.state.companyType } 
                onChange={ this.handleChange } 
                required >    
                <option value={ this.state.saas }>SAAS</option>
                <option value={ this.state.bam }>Box-a-Month</option>
                <option value={ this.state.pG }>Physical Goods</option>
            </select>
            <div className="error" id="companyTypeError" />
        </div>

        <button className="btn btn-primary" onClick={ this.handleSubmit }>submit</button>

      </form>
    );
  }
}


export default SignupForm;
