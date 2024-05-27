// ProfileScreen.js
import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import estilos from '../css/styles'

export default class ProfileScreen extends React.Component {
  handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login');
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const currentUser = firebase.auth().currentUser;
    return ( 
      <View style={estilos.container}>
      {currentUser && (
        <View style={styles.profileContainer}>
          {currentUser.photoURL ? (
            <Image source={{ uri: currentUser.photoURL }} style={styles.profileImage} />
          ) : (
            <Image source={require('../assets/profile.webp')} style={styles.profileImage} />
          )}
          <Text style={styles.displayName}>{currentUser.displayName || currentUser.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.signOutButton} onPress={this.handleSignOut}>
        <Text style={styles.signOutButtonText}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({ 
  profileImage: {
    width: 150, // Increased width to make the profile image larger
    height: 150, // Increased height to match the new width
    borderRadius: 75, // Half of the new width/height to maintain the circle shape
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 400,
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  }, 
});
