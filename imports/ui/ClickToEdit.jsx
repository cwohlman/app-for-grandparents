import React, { Component } from 'react';

export default class ClickToEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.value,
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }
  updateValue(event) {
    this.setState({ value: event.target.value })
  }
  startEditing() {
    this.setState({ editing: true })
  }
  stopEditing() {
    this.props.onChange(this.state.value);
    this.setState({ editing: false });
  }
  render() {
    if (this.state.editing == true) {
      return (<input
        type="text"
        value={this.state.value || ""}
        onChange={this.updateValue.bind(this)}
        onBlur={this.stopEditing.bind(this)}
        autoFocus
        onFocus={(e) => e.target.select()}
        ref={(input) => { this.input = input; }}  />)
    }
    return (<span onClick={this.startEditing.bind(this)}>{this.props.value || "Click to Edit"}</span>);
  }
};
