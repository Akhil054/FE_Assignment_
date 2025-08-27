import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const DetailsScreen = ({ route }) => {
  // Extract the metalData object passed from the LandingScreen.
  const { metalData } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{metalData.name} Details</Text>
        <View style={styles.card}>
          <DetailRow label="Live Price (24 Karat)" value={`$${metalData.price24k}`} />
          <DetailRow label="Last Updated" value={metalData.lastUpdated} />
          <DetailRow label="Today's Date" value={metalData.todayDate} />
          <DetailRow label="Previous Day's Open" value={`$${metalData.previousOpen}`} />
          <DetailRow label="Previous Day's Close" value={`$${metalData.previousClose}`} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  label: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1A202C',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;