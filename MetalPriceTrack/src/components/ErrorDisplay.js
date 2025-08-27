import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ErrorDisplay = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
    <Button title="Try Again" onPress={onRetry} color="#FFD700" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  text: {
    marginBottom: 15,
    fontSize: 16,
    color: '#C53030',
    textAlign: 'center',
  },
});

export default ErrorDisplay;