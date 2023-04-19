import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';

export default class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
  };

  isDisabled = () => {
    const { userEmail, userName } = this.state;
    const enableBtn = userEmail.length > 0 && userName.length > 0;
    return !enableBtn;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  getToken = async () => {
    const { history } = this.props;
    const token = await fetchToken();
    this.saveToken(token);
    history.push('/game');
  };

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <label htmlFor="userName">
          <input
            value={ userName }
            type="text"
            name="userName"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="userEmail">
          <input
            value={ userEmail }
            type="email"
            name="userEmail"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ this.isDisabled() }
          data-testid="btn-play"
          onClick={ this.getToken }
        >
          Play

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
