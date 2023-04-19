import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const getApi = await fetch(URL);
    const response = await getApi.json();
    this.saveToken(response.token);
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

        <button
          onClick={ () => {
            const { history } = this.props;
            history.push('/settings');
          } }
          type="button"
          data-testid="btn-settings"
        >
          Settings
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
