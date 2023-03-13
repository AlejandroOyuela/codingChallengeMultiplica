import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';

export interface Props {
  navigation: StackNavigationProp<any>;
}

interface Product {
  id: string;
  createdAt: string;
  product: string;
  points: number;
  is_redemption: boolean;
  image: string;
}

const MainScreen = ({navigation}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isRedemption, setIsRedemption] = useState(null);

  useEffect(() => {
    axios
      .get<Product[]>(
        'https://6222994f666291106a29f999.mockapi.io/api/v1/products',
      )
      .then(response => {
        setProducts(response.data);
        setTotalPoints(
          response.data
            .filter(product => !product.is_redemption)
            .reduce((acc, product) => acc + product.points, 0),
        );
      })
      .catch(error => console.log(error));
  }, []);

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', {product: item})}
      style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title}>{item.product}</Text>
          <Text style={styles.createdAt}>{item.createdAt}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text
            style={[
              styles.pointsLabel,
              {color: item.is_redemption ? 'red' : 'green'},
            ]}>
            {item.is_redemption ? '-' : '+'}
          </Text>
          <Text style={styles.points}>{item.points}</Text>
          <Text style={styles.points}>></Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleFilter = (filter: boolean) => {
    setIsRedemption(filter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topTextContainer}>
        <Text style={styles.greetingText}>Bienvenido de vuelta!</Text>
        <Text>Ruben Rodríguez</Text>
        <Text style={styles.pointsTitle}>TUS PUNTOS</Text>
      </View>
      <View style={styles.pointsContainerArea}>
        <Text style={styles.areaText}>Diciembre</Text>
        <Text style={styles.totalPoints}>{totalPoints} pts</Text>
      </View>
      <Text style={styles.flatListTitle}>TUS MOVIMIENTOS</Text>
  
      <FlatList
data={
  isRedemption === null
    ? products
    : isRedemption
    ? products.filter((item) => item.is_redemption)
    : products.filter((item) => !item.is_redemption)
}        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonContainer}>
       
          <TouchableOpacity
            onPress={() => handleFilter(false)}
            style={[
              styles.filterButton,
              { backgroundColor: "#334FFA", display: isRedemption !== null ? "none" : "flex" },
            ]}
          >
            <Text style={styles.buttonText}>Ganados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilter(true)}
            style={[
              styles.filterButton,
              { backgroundColor: "#334FFA", display: isRedemption !== null ? "none" : "flex" },
            ]}
          >
            <Text style={styles.buttonText}>Canjeados</Text>
          </TouchableOpacity>
        
      </View>
      {isRedemption !== null && (
  <TouchableOpacity
    onPress={() => handleFilter(null)}
    style={[
      styles.todosFilterButton,
      isRedemption === null && { backgroundColor: '#334FFA' },
    ]}
  >
    <Text style={styles.buttonText}>Todos</Text>
  </TouchableOpacity>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  topTextContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pointsTitle: {
    fontWeight: 'bold',
    marginTop: 30,
    color: '#9B9898',
  },
  pointsContainerArea: {
    backgroundColor: '#334FFA',
    padding: 34,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 16,
    width: '80%',
    height: '18%',
    shadowOffset_: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  areaText: {
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  totalPoints: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  flatListTitle: {
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#9B9898',
  },
  filterButton: {
    backgroundColor: '#334FFA',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 45,
    marginHorizontal: 5,
  },
  todosFilterButton:{
    backgroundColor: '#334FFA',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 45,
    marginHorizontal: 5,
    marginBottom:10
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    alignContent:'center',
    alignSelf:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom:15
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  createdAt: {
    color: '#666',
    marginTop: 8,
    fontSize: 10,
  },
  pointsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 5,
    top: 0,
    bottom: 0,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
