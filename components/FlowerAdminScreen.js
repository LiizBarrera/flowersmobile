import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import api from './api'; // Cliente Axios configurado

const FlowerAdminScreen = ({ navigateBack }) => {
  const [flores, setFlores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [id, setId] = useState('');

  // Obtener flores (GET)
  const fetchFlores = async () => {
    try {
      const response = await api.get('/'); // Asegúrate que esta sea la ruta correcta
      console.log('Respuesta del servidor:', response.data);

      // Asumiendo que el formato de la respuesta es data -> array de flores
      if (response.data && Array.isArray(response.data)) {
        setFlores(response.data);
      } else if (response.data?.data) {
        setFlores(response.data.data); // Para Strapi
      } else {
        console.error('Estructura de datos no válida');
      }
    } catch (error) {
      console.error('Error al obtener flores:', error);
    }
  };

  // Agregar flor (POST)
  const agregarFlor = async () => {
    if (!nombre || !tipo) {
      console.error('Faltan datos para agregar la flor');
      return;
    }

    try {
      const nuevaFlor = {
        data: { nombre, tipo },
      };
      await api.post('/', nuevaFlor); // Asegúrate que esta sea la ruta correcta
      fetchFlores();
    } catch (error) {
      console.error('Error al crear flor:', error);
    }
  };

  // Actualizar flor (PUT)
  const actualizarFlor = async () => {
    if (!id || !nombre || !tipo) {
      console.error('Faltan datos para actualizar la flor');
      return;
    }

    try {
      const datosActualizados = { data: { nombre, tipo } };
      //await api.put(`/flors/${id}`, datosActualizados); // Ajusta la ruta si es necesario
      await api.put(`/flors/${documentId}`, { data: { nombre, tipo } });
      fetchFlores();
    } catch (error) {
      console.error('Error al actualizar flor:', error);
    }
  };

  // Eliminar flor (DELETE)
  const eliminarFlor = async (id) => {
    try {
      await api.delete(`/api/flors/${id}`);
      console.log('Flor eliminada correctamente');
      fetchFlores(); // Actualiza la lista
    } catch (error) {
      console.error('Error al eliminar flor:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  // Efecto para obtener flores al cargar
  useEffect(() => {
    fetchFlores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administración de Flores</Text>
      <FlatList
        data={flores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.flowerText}>
              {item.nombre} - {item.tipo}
            </Text>
            <Button
              title="Eliminar"
              color="#d9534f"
              onPress={() => eliminarFlor(item.id)}
            />
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de la flor"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de flor"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="ID (para actualizar)"
        value={id}
        onChangeText={setId}
      />

      <Button title="Agregar Flor" color="#5cb85c" onPress={agregarFlor} />
      <Button title="Actualizar Flor" color="#f0ad4e" onPress={actualizarFlor} />
      <Button title="Volver" color="#0275d8" onPress={() => navigateTo('FlowerShopScreen')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  flowerText: { fontSize: 16 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default FlowerAdminScreen;
