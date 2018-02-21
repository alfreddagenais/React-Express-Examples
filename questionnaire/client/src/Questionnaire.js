import React, { Component } from "react";
import api from "./api";

class Questionnaire extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    if (!this.name.value.trim() || !this.email.value.trim()) {
      return;
    }
    const { colors } = this.form;
    const checkboxArray = Array.prototype.slice.call(colors);
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);
    const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
    const payLoad = {
      name: this.name.value,
      email: this.email.value,
      gender: this.gender.value,
      colors: checkedCheckboxesValues,
      comments: this.comments.value
    };
    this.clearForm();
  };

  clearForm = () => {
    this.name.value = "";
    this.email.value = "";
    this.gender.value = "";
    this.comments.value = "";
    const ele = document.getElementsByName("colors");
    for (let i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  render() {
    const gender_chocies = ["male", "female", "other"];
    const color_choices = ["red", "green", "blue"];

    const allGenderChoices = gender_chocies.map(g_choice => (
      <option key={g_choice} value={g_choice}>
        {g_choice}
      </option>
    ));

    const allColorChoices = color_choices.map(c_choice => (
      <label key={c_choice} style={{ margin: 15 }}>
        <input type="checkbox" name="colors" value={c_choice} />
        {c_choice}
      </label>
    ));

    return (
      <div style={{ margin: "auto", width: 400 }}>
        <form onSubmit={this.handleFormSubmit} ref={form => (this.form = form)}>
          <h2 style={{ textAlign: "center" }}>Questionnaire</h2>
          <hr />

          <div style={{}}>
            <label>Full Name</label>
            <input
              type="text"
              style={{ margin: 10 }}
              ref={node => {
                this.name = node;
              }}
            />
            <span style={{ color: "red" }}>*</span>
            <br />

            <label>Email Address</label>
            <input
              type="text"
              style={{ margin: 10 }}
              ref={node => {
                this.email = node;
              }}
            />
            <span style={{ color: "red" }}>*</span>
            <br />

            <select
              ref={node => {
                this.gender = node;
              }}
            >
              <option value="">What is your gender?</option>
              {allGenderChoices}
            </select>
            <span style={{ color: "red" }}> *</span>
            <br />

            <label style={{ display: "inline-block", marginTop: 10 }}>
              What colors do you like? <span style={{ color: "red" }}> *</span>
            </label>
            <br />
            {allColorChoices}
            <br />

            <label style={{ display: "inline-block", marginTop: 10 }}>
              Any other comments?
            </label>
            <textarea
              style={{ width: "100%", marginBottom: 10 }}
              rows="4"
              ref={node => {
                this.comments = node;
              }}
            />

            <input
              type="submit"
              value="Submit!"
              style={{ display: "block", margin: "auto" }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Questionnaire;