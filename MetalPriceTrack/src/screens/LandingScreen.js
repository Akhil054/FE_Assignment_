import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import MetalTile from '../components/MetalTile';

// The list of metals to be displayed.
const METALS = ['gold', 'silver', 'platinum', 'palladium'];

const LandingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Live Metal Prices</Text>
          <Text style={styles.subHeader}>
            Select a metal below to see more details or to start investing.
          </Text>
        </View>
        
        <View style={styles.gridContainer}>
          {METALS.map((metal) => (
            <MetalTile
              key={metal}
              metal={metal}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row', // Arrange children side-by-side
    flexWrap: 'wrap',     // Allow items to wrap to the next line
    justifyContent: 'center', // Center the items horizontally
    paddingHorizontal: '2%',
  },
});

export default LandingScreen;