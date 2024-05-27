import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-paper';
import estilos from './css/styles';

const DetailsScreen = ({ navigation }) => {
  const data = navigation.getParam('data', null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (data) {
      fetchImage(data.nome);
    }
  }, [data]);

  const fetchImage = async (treeName) => {
    const apiKey = 'AIzaSyBRgvJzy_O7fzYHQ54odWhn7YW0ytE69ck';
    const searchEngineId = '77f1de1b99b924848';
    const query = `árvore ${treeName}`;
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${searchEngineId}&searchType=image&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.items && response.data.items.length > 0) {
        setImageUrl(response.data.items[0].link);
        console.log(response)
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={styles.informationTitle}>Sua árvore escolhida é...</Text>
      {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
      {data && (
        <Card style={styles.card}> 
          <Card.Content style={styles.cardContent}>
            <Text style={styles.treeName}>{data.nome}</Text>
            <Text style={styles.detailText}>{data.detalhe}</Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    margin: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5
  },
  cardContent: {
    marginTop: 10, // Add space between image and content
  },
  treeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#000000',
  },
  informationTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
});

export default DetailsScreen;
