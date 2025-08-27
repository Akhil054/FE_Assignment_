// // screens/SuccessScreen.js
// import React from 'react';
// import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

// const SuccessScreen = ({ route, navigation }) => {
//   const { metalName } = route.params;

//   // Get title and message from route params, with default fallbacks
//   const { 
//     title = 'Success!', 
//     message = 'Your operation was completed successfully.' 
//   } = route.params;

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <Text style={styles.icon}>✅</Text>
//         <Text style={styles.header}>Purchase Successful!</Text>
//         <Text style={styles.message}>
//           You have successfully purchased {metalName}. Your investment has been added to your profile.
//         </Text>
//         <View style={styles.buttonContainer}>
//           <Button title="View My Investments" onPress={() => navigation.navigate('Profile')} color="#FFD700" />
//           <View style={{ margin: 10 }} />
//           <Button title="Go Home" onPress={() => navigation.navigate('Landing')} color="#333" />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#F7FAFC' },
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   icon: { fontSize: 80, marginBottom: 20 },
//   header: { fontSize: 28, fontWeight: 'bold', color: '#2D3748', marginBottom: 15 },
//   message: { fontSize: 16, color: '#718096', textAlign: 'center', marginBottom: 30 },
//   buttonContainer: { width: '80%' },
// });

// export default SuccessScreen;


import React from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';

const SuccessScreen = ({ route, navigation }) => {
  // Destructure title and message from the navigation parameters.
  // Provide sensible defaults in case they are not passed.
  const { 
    title = 'Operation Successful!', 
    message = 'Your request has been completed.' 
  } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.icon}>✅</Text>
        
        {/* Use the dynamic title from the route params */}
        <Text style={styles.header}>{title}</Text>
        
        {/* Use the dynamic message from the route params */}
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="View My Investments" 
            onPress={() => navigation.navigate('Profile')} 
            color="#FFD700" 
          />
          <View style={{ margin: 10 }} />
          <Button 
            title="Go Home" 
            onPress={() => navigation.navigate('Landing')} 
            color="#333" 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F7FAFC' 
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  icon: { 
    fontSize: 80, 
    marginBottom: 20 
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#2D3748', 
    marginBottom: 15,
    textAlign: 'center',
  },
  message: { 
    fontSize: 16, 
    color: '#718096', 
    textAlign: 'center', 
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: { 
    width: '80%' 
  },
});

export default SuccessScreen;