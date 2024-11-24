import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
const FlowerShopScreen = ({ navigateTo }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const flowers = [
  {
    id: '1',
    name: 'Rosas',
    description: 'Hermosas rosas rojas perfectas para ocasiones especiales.',
    price: 150,
    image: 'https://i.pinimg.com/originals/7b/49/97/7b4997ff78c7d579ae6d29da7ac50f97.jpg',
  },
  {
    id: '2',
    name: 'Tulipanes',
    description: 'Tulipanes coloridos para alegrar cualquier espacio.',
    price: 120,
    image: 'https://www.okchicas.com/wp-content/uploads/2018/10/42298926_540796143009034_6552497704159674368_n.jpg',
  },
  {
    id: '3',
    name: 'Orquídeas',
    description: 'Elegantes orquídeas blancas ideales para regalos.',
    price: 200,
    image: 'https://i.pinimg.com/736x/2d/b9/ef/2db9ef07ef2ff16b77c415e986f01abc.jpg',
  },
  {
    id: '4',
    name: 'Lirios',
    description: 'Lirios blancos para expresar pureza y tranquilidad.',
    price: 130,
    image: 'https://i.pinimg.com/736x/17/74/92/177492b2ae2c3aa939715620c7c3eb7f.jpg',
  },
  {
    id: '5',
    name: 'Margaritas',
    description: 'Margaritas frescas para decorar tu hogar.',
    price: 100,
    image: 'https://i.pinimg.com/736x/d1/5d/1d/d15d1d0a3ab4dbd23d7dd1c17a8d58fd.jpg',
  },
];



  const addToCart = (flower) => {
    setCart((prevCart) => [...prevCart, flower]);
    alert(`${flower.name} ha sido añadido al carrito.`);
  };

  const renderCart = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    return (
      <>
        {cart.map((item, index) => (
          <Text key={index} style={styles.cartItem}>
            {item.name} - ${item.price}
          </Text>
        ))}
        <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
      </>
    );
  };

  const filteredFlowers = flowers.filter(flower =>
    flower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
       {/* Botón para navegar a la administración */}
    <TouchableOpacity
      style={styles.adminButton}
      onPress={() => navigateTo('FlowerAdmin')}
    >
      <Text style={styles.adminButtonText}>Administrar Flores</Text>
    </TouchableOpacity>

      
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar flores..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.content}>
        <FlatList
          data={filteredFlowers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>Precio: ${item.price}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addButtonText}>Añadir al Carrito</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.toggleCartButton}
        onPress={() => setShowCart(!showCart)}
      >
        <Text style={styles.toggleCartText}>
          {showCart ? 'Ocultar Carrito' : 'Mostrar Carrito'}
        </Text>
      </TouchableOpacity>
      {showCart && (
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>Carrito de Compras</Text>
          <ScrollView>
            {cart.length > 0 ? (
              renderCart()
            ) : (
              <Text style={styles.emptyCart}>El carrito está vacío</Text>
            )}
          </ScrollView>
        </View>
      )}
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => alert('Compartir en redes sociales')}
      >
        <Text style={styles.shareButtonText}>Compartir en Redes Sociales</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  content: {
    flex: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: '#4caf50',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#ff4081',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  adminButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
    marginTop: 10,
  },
  emptyCart: {
    fontSize: 16,
    color: '#777',
  },
  toggleCartButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  toggleCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#ff4081',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FlowerShopScreen;
