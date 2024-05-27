import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import estilos  from './css/styles';  

const Main = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [idade, setIdade] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [openClima, setOpenClima] = useState(false);
    const [openDensidade, setOpenDensidade] = useState(false);
    const [openSolo, setOpenSolo] = useState(false);
    const [clima, setClimaValue] = useState(null);
    const [densidade, setDensidadeValue] = useState(null);
    const [solo, setSoloValue] = useState(null);
    const [climas, setClimaItems] = useState([
        {label: 'Semiárido', value: 'Semiárido' },
        { label: 'Tropical', value: 'Tropical'},
    ]);
    const [densidades, setDensidadesItems] = useState([
        {label: 'Alta', value: 'Alta' },
          { label: 'Moderada', value: 'Moderada' },
          { label: 'Baixa', value: 'Baixa'},
    ]);
    const [solos, setSolosItems] = useState([
        {label: 'Arenoso', value: 'Arenoso' },
          { label: 'Pedregoso', value: 'Pedregoso' },
          { label: 'Argiloso', value: 'Argiloso'},
    ]);

    const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api-python-ml-8ab7920bc8f0.herokuapp.com/predict_plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Tamanho: parseFloat(tamanho),
          Clima: clima,
          Densidade: densidade,
          TipoDoSolo: solo,
          Idade: parseInt(idade),
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }

      const data = await response.json();
      setIsLoading(false);
      navigation.navigate('Details', { data });
      console.log('handleLogin');
    } catch (error) {
      setIsLoading(false);
      console.error('Erro:', error);
    }
  };

    return (
      <View style={estilos.container}>
      <TouchableOpacity
      style={estilos.touchProfile}
        onPress={() => navigation.navigate('Profile')}>
        <Image  source={require('./assets/profile.webp')} style={estilos.profileImage} /> 
      </TouchableOpacity>
          <Text style={estilos.title}>Escolha as caracteristicas de sua árvore...</Text>
          <Text style={estilos.subTitle}>Tamanho:</Text>
          <TextInput
            style={estilos.inputForm}
            onChangeText={text => setTamanho(text)}
            value={tamanho}
            keyboardType="numeric"/>

            <Text style={estilos.subTitle}>Clima:</Text>
            <DropDownPicker
                   style={estilos.label}
                    open={openClima}
                    value={clima}
                    items={climas}
                    setOpen={setOpenClima}
                    setValue={setClimaValue}
                    setItems={setClimaItems}
                    placeholder={'Selecione um clima'}
                    zIndex={5000}
                />

            <Text style={estilos.subTitle}>Densidade:</Text>
            <DropDownPicker 
                   style={estilos.label}
                   open={openDensidade}
                   setOpen={setOpenDensidade}
                    value={densidade}
                    items={densidades} 
                    setValue={setDensidadeValue}
                    setItems={setDensidadesItems}
                    placeholder={'Selecione a densidade'}
                    zIndex={4000}
                />    

                <Text style={estilos.subTitle}>Tipo do Solo:</Text>
                <DropDownPicker 
                    style={estilos.label}
                    open={openSolo}
                    setOpen={setOpenSolo}
                    value={solo}
                    items={solos} 
                    setValue={setSoloValue}
                    setItems={setSolosItems}
                    placeholder={'Selecione o tipo do solo'}
                    zIndex={3000}
                /> 

                <Text style={estilos.subTitle}>Idade:</Text>
      <TextInput
        style={estilos.inputForm}
        onChangeText={text => setIdade(text)}
        value={idade}
        keyboardType="numeric" />

      {isLoading ? (
        <ActivityIndicator style={estilos.button} />
      ) : (
        <TouchableOpacity
          style={[estilos.button, estilos.registerButton]}
          onPress={() => handleSubmit()}>
          <Text style={estilos.buttonText}>Enviar</Text>
        </TouchableOpacity> 
      )}
       
      </View>
    );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
    marginTop: 10,
  },
  profileIcon: {
    width: 24,
    height: 24,
  },
});

export default Main;