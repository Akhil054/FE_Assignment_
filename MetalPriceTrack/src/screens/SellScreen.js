// screens/SellScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button, Alert } from 'react-native';
import { InvestmentContext } from '../context/InvestmentContext';

const SellScreen = ({ route, navigation }) => {
  const { metalName } = route.params;
  const { investments, removeInvestment } = useContext(InvestmentContext);

  // Filter the investments to show only the ones for the selected metal
  const relevantInvestments = investments.filter(
    inv => inv.metal.toLowerCase() === metalName.toLowerCase()
  );

  const handleSellPress = (investment) => {
    Alert.alert(
      "Confirm Sale",
      `Are you sure you want to sell your investment of ₹${investment.investmentAmount} in ${investment.metal}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Sell",
          onPress: () => {
            removeInvestment(investment.id);
            navigation.replace('Success', {
              title: 'Sale Successful!',
              message: `Your investment in ${metalName} was successfully sold.`,
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.amountInvested}>₹{item.investmentAmount}</Text>
        <Text style={styles.date}>
          {new Date(item.purchaseDate).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.detail}>
        Purchased at: ${item.priceAtPurchase} / ounce
      </Text>
      <View style={styles.sellButtonContainer}>
        <Button
          title="Sell This Investment"
          onPress={() => handleSellPress(item)}
          color="#C53030" // A red color for a sell action
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Sell {metalName}</Text>
        {relevantInvestments.length > 0 ? (
          <FlatList
            data={relevantInvestments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You have no investments in {metalName} to sell.
            </Text>
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
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    amountInvested: { fontSize: 22, fontWeight: 'bold', color: '#2D3748' },
    date: { fontSize: 14, color: '#718096' },
    detail: { fontSize: 15, color: '#4A5568', marginBottom: 15 },
    sellButtonContainer: { marginTop: 10 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: '#718096', textAlign: 'center' },
});


export default SellScreen;