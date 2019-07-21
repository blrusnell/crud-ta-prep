import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      text: '',
      messages: ['placeholder']
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getId = this.getId.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    axios.post('/chats', this.state)
      .then(response => {
        this.setState({
          messages: response.data
        });
      })
      .catch(error => console.log(error))

  }


  getId(event, id) {
    console.log(id);
    axios.delete('/chats', {data : {id: id}})
    .then(response => {
      this.setState({
        messages: response.data
      });
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    axios.get('/chats')
    .then((response) => {
      this.setState({
        messages: response.data
      });
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <>
      <input placeholder='Username' name='username' onChange={this.handleChange}></input>
      <input placeholder='Message' name='text' onChange={this.handleChange}></input>
      <button type="button" onClick={this.handleSubmit}>Submit</button>
      <ul>
        {this.state.messages.map(message => <li>{message.Username}, {message.Text}, {message.ID} <button onClick={(event) => this.getId(event, message.ID)}>#delete</button> </li>)}
      </ul>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));