import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  route: any;
  navigation: any;
}

const ProductScreen = ({route, navigation}: Props) => {
  const {product} = route.params;
  const goTo = useNavigation();
  return (
    <View style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{product.product}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: product.image}} style={styles.productImage} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.productDetails}>Detalles del producto:</Text>

        <Text style={styles.createdAtText}>
          Comprado el {product.createdAt}
        </Text>
        <Text style={styles.productDetails}>Con esta compra acumulaste:</Text>

        <Text style={styles.pointsText}>{product.points} puntos</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => goTo.navigate('Main')}
          style={[styles.todosFilterButton]}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    color: '#EBECF0',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    height: '13%',
    backgroundColor: '#CFD6FF',
  },
  headerText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    bottom: 15,
    left: 15,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    height: '40%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  productImage: {
    width: '70%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  createdAtText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productDetails: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  pointsText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    width: '90%',
    bottom: 50,
    alignSelf: 'center',
  },
  todosFilterButton: {
    backgroundColor: '#334FFA',
    borderRadius: 10,
    paddingVertical: 18,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default ProductScreen;
