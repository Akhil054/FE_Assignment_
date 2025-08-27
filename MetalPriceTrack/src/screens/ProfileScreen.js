// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { InvestmentContext } from '../context/InvestmentContext';

const ProfileScreen = () => {
  const { investments } = useContext(InvestmentContext);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.metalName}>{item.metal}</Text>
        <Text style={styles.amountInvested}>₹{item.investmentAmount}</Text>
      </View>
      <Text style={styles.detail}>Purchased at: ${item.priceAtPurchase} / ounce</Text>
      <Text style={styles.detail}>Investor: {item.name}</Text>
      <Text style={styles.detail}>Date: {new Date(item.purchaseDate).toLocaleDateString()}</Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>My Investments</Text>
        {investments.length > 0 ? (
          <FlatList
            data={investments}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You have no investments yet.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAFC' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#2D3748', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  metalName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  detail: { fontSize: 16, color: '#555', marginTop: 5 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#718096' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  metalName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  amountInvested: { fontSize: 20, fontWeight: 'bold', color: '#2D3748' },
  detail: { fontSize: 15, color: '#555', marginTop: 4 },
});

export default ProfileScreen;