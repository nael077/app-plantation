import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import estilos  from './css/styles';  
import * as firebase from 'firebase';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null, loading: false};
  
  handleLogin = () => {
    this.setState({ loading: true });
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('Main');
      })
      .catch(error => 
      { 
        this.setState({ loading: false }); 
        this.setState({ errorMessage: error.message})}); 
      };
  
  onButtonPress() {
    this.setState({error: '', loading: true})
    const{ email, password } = this.state;
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(()=> { 
     //do something here
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '', password: '', error: '', loading: false
    })
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View style={estilos.container}> 
      <Image source={require('./assets/green.png')} style={estilos.logo} />

        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )} 

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#B0B0B0"
          autoCapitalize="none"
          style={estilos.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        /> 

        <TextInput
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#B0B0B0"
          autoCapitalize="none"
          style={estilos.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
 
         <TouchableOpacity style={estilos.button} onPress={this.handleLogin}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={estilos.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity> 

        <TouchableOpacity
          style={[estilos.button, estilos.registerButton]}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={estilos.buttonText}>REGISTRAR-SE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
