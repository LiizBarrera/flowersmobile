import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

const AuthScreen = ({ navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email && password) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigateTo('FlowerShop');
      }, 1000);
    } else {
      setError('Por favor, completa todos los campos.');
    }
  };

  const handleRegister = () => {
    if (firstName && lastName && email && password) {
      alert('Registro exitoso');
      navigateTo('FlowerShop');
    } else {
      setError('Por favor, completa todos los campos.');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/vector-premium/fondo-flor-durazno_753213-200.jpg' }} 
      style={styles.background}
      resizeMode="cover" 
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{isLogin ? 'Bienvenido' : 'Registrarse'}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.togglePassword}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#4caf50" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleRegister}>
            <Text style={styles.buttonText}>{isLogin ? 'Iniciar Sesión' : 'Registrar'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.link}>
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Recuperar contraseña')}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(245, 245, 245, 0.8)', // Fondo semi-transparente
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  togglePassword: {
    marginLeft: 10,
    color: '#4caf50',
  },
  button: {
    width: '90%',
    height: 45,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#4caf50',
    fontSize: 14,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AuthScreen;