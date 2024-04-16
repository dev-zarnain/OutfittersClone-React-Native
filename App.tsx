import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './navigation/StackNavigation/StackNavigator';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    const URl = 'https://fakestoreapi.com/products';
    fetch(URl)
      .then(res => {
        if (!res.ok) {
          throw new Error('something went wrong !');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setIsLoading(false);
        console.log(data);
      })
      .catch(error => {
        setError(error.message);
        console.log(error.message);
      });
  };
  return (
    // <NavigationContainer>
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator color="black" size={'large'} />
      ) : error ? (
        <Text style={{fontSize: 20, color: 'red'}}>{error}</Text>
      ) : (
        <FlatList
        showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 20,
                margin: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 9,
                },
                shadowOpacity: 0.5,
                shadowRadius: 12.35,

                elevation: 19,
              }}>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: item.image}}
              />
              <Text
                style={{fontSize: 20, color: '#000000', textAlign: 'center'}}>
                {item.title}
              </Text>
              <Text
                style={{fontSize: 16, color: '#000000', textAlign: 'center'}}>
                {item.price}
              </Text>
            </View>
          )}
        />
      )}
    </View>
    // </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
