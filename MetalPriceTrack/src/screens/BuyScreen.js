// screens/BuyScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Button, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { InvestmentContext } from '../context/InvestmentContext';

const BuyScreen = ({ route, navigation }) => {
    const USD_TO_INR_RATE = 83.50;
  const { metalData, } = route.params;
  const { addInvestment } = useContext(InvestmentContext);

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

   // --- Helper Functions ---
  const pricePerOunceUSD = parseFloat(metalData.price24k);
  const pricePerGramUSD = pricePerOunceUSD / 28.3495;
  
   const calculateGrams = (inr) => {
    if (!inr || isNaN(inr) || isNaN(pricePerGramUSD)) return 0;
    const amountUSD = parseFloat(inr) / USD_TO_INR_RATE;
    return (amountUSD / pricePerGramUSD).toFixed(4);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email.includes('@')) newErrors.email = 'Enter a valid email';
    if (phone.length !== 10) newErrors.phone = 'Phone number must be 10 digits';
    if (pincode.length !== 6) newErrors.pincode = 'Pincode must be 6 digits';
    if (!agreed) newErrors.agreed = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const investmentDetails = {
        name,
        email,
        phone,
        pincode,
        metal: metalData.name,
        priceAtPurchase: metalData.price24k,
        investmentAmount: parseFloat(amount).toFixed(2), 
        purchaseDate: new Date().toISOString(),
      };
      addInvestment(investmentDetails);
    navigation.replace('Success', {
    title: 'Purchase Successful!',
    message: `You have successfully purchased ${metalData.name}. Your investment is now in your profile.`,
    });
    } else {
      Alert.alert("Validation Error", "Please fill all fields correctly.");
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Buy {metalData.name}</Text>
        <Text style={styles.price}>Current Price: ${metalData.price24k} / ounce</Text>

        <Text style={styles.label}>Investment Amount</Text>
        <View style={styles.amountInputContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
        </View>
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        {amount > 0 && (
            <Text style={styles.estimationText}>
              You will get approx. {calculateGrams(amount)} grams.
            </Text>
        )}

        <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address"/>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput style={styles.input} placeholder="Pincode" value={pincode} onChangeText={setPincode} keyboardType="number-pad" maxLength={6} />
        {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>I agree to the terms and conditions.</Text>
        </TouchableOpacity>
        {errors.agreed && <Text style={styles.errorText}>{errors.agreed}</Text>}

        <Button title="Confirm Purchase" onPress={handleSubmit} color="#FFD700" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7FAFC' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#2D3748', textAlign: 'center', marginBottom: 10 },
  price: { fontSize: 18, color: '#718096', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#EDF2F7' },
  errorText: { color: 'red', marginBottom: 10, marginLeft: 5 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#A0AEC0', marginRight: 10 },
  checkboxChecked: { backgroundColor: '#FFD700', borderColor: '#FFD700' },
  checkboxLabel: { fontSize: 16, color: '#4A5568' },
});

export default BuyScreen;