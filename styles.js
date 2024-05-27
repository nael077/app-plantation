import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#132918',
    padding: 20,
  }, 
  inputForm: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 20,
  }, 
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
   title: {
    fontSize: 25,
    color: 'white', 
    marginTop: 30,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#132918',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  sendButton: { 
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerButton: {
    marginTop: 10,
    backgroundColor: '#132918',  
  },
  buttonText: {
    color: 'white',
    fontSize: 18, 
  },
  logo: {
    width: 100,   
    height: 100,  
    marginBottom: 50,
    padding: 150
  },
  profileImage: {
    margin: 10,
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 0, 
  },
  touchProfile: {  
    position: 'absolute',
    top: 0,
    left: 10,
  },
});

export default estilos;