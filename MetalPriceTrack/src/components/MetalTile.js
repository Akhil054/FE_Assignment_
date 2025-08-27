

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchMetalDetails } from '../api/metalService'; 
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';

// This custom hook fetches and manages the state for a single metal.
const useFetchMetal = (metal) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchMetalDetails(metal);
      setData(response);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [metal]);

  return { data, loading, error, retry: fetchData };
};

// A small, reusable component for the secondary action buttons.
const ActionButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionButtonText}>{title}</Text>
  </TouchableOpacity>
);

const MetalTile = ({ metal }) => {
  const { data, loading, error, retry } = useFetchMetal(metal);
  const navigation = useNavigation(); // Hook to get navigation object

  // --- Handlers for Navigation ---
  const handleInvestPress = () => {
    if (data) {
      navigation.navigate('Buy', { metalData: data });
    }
  };
  
  const handleDetailsPress = () => {
    if (data) {
      navigation.navigate('Details', { metalData: data });
    }
  };

  const handleSellPress = () => {
    if (data) {
      // Navigate to the Sell screen, passing the metal's name
      navigation.navigate('Sell', { metalName: data.name });
    }
  };

  // --- Render Logic ---
  const renderContent = () => {
    if (loading) {
      return <Loader text={`Fetching ${metal}...`} />;
    }
    if (error) {
      return <ErrorDisplay message={error} onRetry={retry} />;
    }
    if (data) {
      return (
        <>
          {/* Main content area, pressable to see details */}
          <TouchableOpacity onPress={handleDetailsPress} style={styles.detailsLink}>
            <Text style={styles.metalName}>{data.name}</Text>
            <Text style={styles.price}>${data.price24k}</Text>
            <Text style={styles.purity}>Price Per Ounce</Text>
            <Text style={styles.time}>Updated: {data.lastUpdated}</Text>
          </TouchableOpacity>

          {/* Row for secondary actions */}
          <View style={styles.buttonRow}>
            <ActionButton title="Sell" onPress={() => {handleSellPress }} />
            <ActionButton title="SIP" onPress={() => { /* Placeholder */ }} />
            <ActionButton title="Gift" onPress={() => { /* Placeholder */ }} />
          </View>

          {/* Main action button */}
          <View style={styles.investButtonContainer}>
            <Button title="Invest Now" onPress={handleInvestPress} color="#FFD700" />
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: '2%',
    width: '46%', // Each tile takes up 46% width, allowing for margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'space-between', // Distributes content vertically
    padding: 12,
    minHeight: 220, // Ensures tiles have a consistent height
  },
  detailsLink: {
    alignItems: 'center', // Center price, name, etc.
  },
  metalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3748',
    marginVertical: 4,
  },
  purity: {
    fontSize: 14,
    color: '#718096',
  },
  time: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 8,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#EDF2F7',
  },
  actionButtonText: {
    color: '#4A5568',
    fontWeight: '600',
    fontSize: 12,
  },
  investButtonContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden', // Ensures the button corners are rounded on Android
  },
});

export default MetalTile;