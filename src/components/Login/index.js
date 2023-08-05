/* import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  LoginBgContainer,
  FormContainer,
  InputContainer,
  LoginLogoImage,
  LabelInput,
  UserInput,
  CheckboxContainer,
  CheckboxInput,
  ShowPasswordLabel,
  LoginButton,
  SubmitError,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <LabelInput htmlFor="username">USERNAME</LabelInput>
        <UserInput
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {showPassword, password} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    return (
      <>
        <LabelInput htmlFor="password">PASSWORD</LabelInput>
        <UserInput
          type={passwordType}
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
        <CheckboxContainer>
          <CheckboxInput
            type="checkbox"
            id="checkbox"
            onChange={this.onClickShowPassword}
          />
          <ShowPasswordLabel htmlFor="checkbox">
            Show Password
          </ShowPasswordLabel>
        </CheckboxContainer>
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  OnSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const LoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginBgContainer>
        <FormContainer onSubmit={this.OnSubmitForm}>
          <LoginLogoImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <InputContainer>{this.renderUsernameField()}</InputContainer>
          <InputContainer>{this.renderPasswordField()}</InputContainer>
          <LoginButton type="submit">Login</LoginButton>
          {showSubmitError && <SubmitError>*{errorMsg}</SubmitError>}
        </FormContainer>
      </LoginBgContainer>
    )
  }
}

export default Login
*/
import {Component} from 'react'
import Cookies from 'js-cookie'

import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import {
  LoginBgContainer,
  LoginCardContainer,
  LoginLogo,
  FormElement,
  InputContainer,
  Input,
  InputLabel,
  ShowPasswordContainer,
  Checkbox,
  ShowPasswordLabel,
  LoginButton,
  ErrorMessage,
} from './styledComponents'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    errorMessage: '',
    showErrorMessage: false,
  }

  componentDidMount() {
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({showErrorMessage: false})
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMessage =>
    this.setState({showErrorMessage: true, errorMessage})

  updateUsernameInput = event =>
    this.setState({usernameInput: event.target.value})

  updatePasswordInput = event =>
    this.setState({passwordInput: event.target.value})

  toggleShowPassword = () =>
    this.setState(prevState => ({showPassword: !prevState.showPassword}))

  render() {
    const {
      usernameInput,
      passwordInput,
      showPassword,
      showErrorMessage,
      errorMessage,
    } = this.state
    const checkBoxType = showPassword ? 'text' : 'password'

    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <LoginBgContainer darkTheme={isDarkTheme}>
              <LoginCardContainer darkTheme={isDarkTheme}>
                <LoginLogo
                  alt="website logo"
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                />
                <FormElement onSubmit={this.onSubmitForm}>
                  <InputContainer>
                    <InputLabel htmlFor="username" darkTheme={isDarkTheme}>
                      USERNAME
                    </InputLabel>
                    <Input
                      id="username"
                      type="text"
                      value={usernameInput}
                      placeholder="Username"
                      onChange={this.updateUsernameInput}
                      darkTheme={isDarkTheme}
                    />
                  </InputContainer>
                  <InputContainer>
                    <InputLabel htmlFor="password" darkTheme={isDarkTheme}>
                      PASSWORD
                    </InputLabel>
                    <Input
                      id="password"
                      type={checkBoxType}
                      value={passwordInput}
                      placeholder="Password"
                      onChange={this.updatePasswordInput}
                      darkTheme={isDarkTheme}
                    />
                  </InputContainer>
                  <ShowPasswordContainer>
                    <Checkbox
                      id="showPassword"
                      type="checkbox"
                      onClick={this.toggleShowPassword}
                    />
                    <ShowPasswordLabel
                      htmlFor="showPassword"
                      darkTheme={isDarkTheme}
                    >
                      Show Password
                    </ShowPasswordLabel>
                  </ShowPasswordContainer>
                  <LoginButton type="submit">Login</LoginButton>
                  {showErrorMessage && (
                    <ErrorMessage>*{errorMessage}</ErrorMessage>
                  )}
                </FormElement>
              </LoginCardContainer>
            </LoginBgContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login
