// SignUp.js
import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import * as firebase from 'firebase';
import estilos  from '../css/styles'; 

export default class Signup extends React.Component {
  state = { email: '', password: '', errorMessage: null, loading: false, nome: ''};
  handleSignUp = () => {
    this.setState({ loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => { 
      const user = userCredential.user;
      console.log(user);
      return user.updateProfile({
        displayName: this.state.nome // Set the display name to the provided name
      });
      })
      .then(() =>
      { 
        this.setState({ loading: false });
        this.props.navigation.navigate('Main')})  
      .catch(error => 
       { 
         this.setState({ loading: false });
         this.setState({ errorMessage: error.message})}
      );   
  };

  render() {
    return (
      <View style={estilos.container}> 
      <Image source={require('../assets/green.png')} style={estilos.logo} />
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Nome"
          placeholderTextColor="#B0B0B0"
          autoCapitalize="none"
          style={estilos.input}
          onChangeText={nome => this.setState({ nome })}
          value={this.state.nome}
        /> 

        <TextInput
          placeholder="Email"
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

        <TouchableOpacity style={estilos.button} onPress={this.handleSignUp}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={estilos.buttonText}>SIGN UP</Text>
          )}
        </TouchableOpacity> 
        
        <TouchableOpacity 
          style={[estilos.button, estilos.registerButton]}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={estilos.buttonText}>JÁ TENHO CONTA</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}
