import React, { useState } from 'react';
import { View, StyleSheet , Text, FlatList} from 'react-native';
import LoginScreen from './components/LoginScreen'; // Ruta correcta
import FlowerShopScreen from './components/FlowerShopScreen'; // Ruta correcta
import FlowerAdminScreen from './components/FlowerAdminScreen';
console.log('LoginScreen:', LoginScreen);
console.log('FlowerShopScreen:', FlowerShopScreen);
console.log('FlowerAdminScreen:', FlowerAdminScreen);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');

  const navigateTo = (screen) => setCurrentScreen(screen);

  return (
    <View style={styles.container}>
      {currentScreen === 'Login' ? (
        <LoginScreen navigateTo={navigateTo} />
      ) : currentScreen === 'FlowerShop' ? (
        <FlowerShopScreen navigateTo={navigateTo} />
      ) : (
        <FlowerAdminScreen navigateBack={() => navigateTo('FlowerShop')} />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


