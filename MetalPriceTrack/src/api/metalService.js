// // metalService.js

// // Make sure this API key is correct and active.
// const API_KEY = 'goldapi-27rdvsmesrjwyo-io'; 
// const BASE_URL = 'https://www.goldapi.io/api';

// // Mapping our app's metal names to their standard API symbols.
// const METAL_SYMBOLS = {
//   gold: 'XAU',
//   silver: 'XAG',
//   platinum: 'XPT',
//   palladium: 'XPD',
// };

// // This function fetches the latest prices for a single specified metal.
// export const fetchMetalDetails = async (metal) => {
//   const symbol = METAL_SYMBOLS[metal];
//   if (!symbol) {
//     throw new Error(`Invalid metal specified: ${metal}`);
//   }

//   // Construct the correct API URL without the key.
//   const url = `${BASE_URL}/${symbol}/USD`;

//   console.log(`Fetching real-time data for ${metal} from ${url}`);

//   try {
//     // --- FIX IS HERE ---
//     // The API key is now sent in the 'headers' object, which is the correct method.
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'x-access-token': API_KEY,
//         'Content-Type': 'application/json',
//       },
//     });

//     // --- IMPROVED ERROR HANDLING ---
//     // Check if the network request itself was successful.
//     if (!response.ok) {
//       // We now include the status code (e.g., 401, 403, 500) for better debugging.
//       throw new Error(`Network response was not ok. Status: ${response.status}`);
//     }

//     // Parse the JSON data from the response.
//     const data = await response.json();

//     // The Gold API might not have a 'success' flag, so we check for price data directly.
//     if (data.price === undefined) {
//       // The API sometimes returns error messages in a 'message' property.
//       throw new Error(`API Error: ${data.message || 'No price data returned'}`);
//     }

//     // On success, resolve with the structured data our app expects.
//     return {
//       name: metal.charAt(0).toUpperCase() + metal.slice(1),
//       price24k: data.price.toFixed(2), // Price per ounce from the API
//       lastUpdated: new Date(data.timestamp * 1000).toLocaleTimeString(),
//       // Mocking previous day's data as it's not available in the free API tier
//       previousClose: (data.price * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2),
//       previousOpen: (data.price * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2),
//       todayDate: new Date(data.timestamp * 1000).toLocaleDateString(),
//     };
//   } catch (error) {
//     // This will now log the more detailed error message we created above.
//     console.error(`Failed to fetch details for ${metal}:`, error);
//     // Re-throw the error so the component can handle it and show "Try Again".
//     throw error;
//   }
// };

// API Key for metalpriceapi.com
const API_KEY = '26c2345b74656afb012c056eac1e38a6';
// Base URL without any parameters. We will build them dynamically.
const BASE_URL = 'https://api.metalpriceapi.com/v1/latest';

// Mapping our app's metal names to their standard API symbols.
const METAL_SYMBOLS = {
  gold: 'XAU',
  silver: 'XAG',
  platinum: 'XPT',
  palladium: 'XPD',
};

// This function fetches the latest prices for a *single* specified metal.
export const fetchMetalDetails = async (metal) => {
  const symbol = METAL_SYMBOLS[metal];
  if (!symbol) {
    throw new Error(`Invalid metal specified: ${metal}`);
  }

  // --- FIX 1: Correct URL Construction ---
  // Parameters are added to the URL, not appended as a path.
  // We specify the base currency (USD) and the target metal symbol.
  const url = `${BASE_URL}?api_key=${API_KEY}&base=USD&currencies=${symbol}`;

  console.log(`Fetching real-time data for ${metal} from ${url}`);

  try {
    // --- FIX 2: Correct Fetch Request ---
    // This API does not use headers for authentication, so we remove the headers object.
    const response = await fetch(url);

    // Check if the network request itself was successful.
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    // Parse the JSON data from the response.
    const data = await response.json();

    // The API returns a 'success' flag. Check if the API call was successful.
    if (!data.success) {
      throw new Error('API request failed. Please check your API key and plan.');
    }
    
    // --- FIX 3: Correct Data Extraction ---
    // The price is inside the 'rates' object and needs to be inverted.
    const rate = data.rates[symbol];
    if (!rate) {
        throw new Error(`API Error: Rate for ${symbol} not found in the response.`);
    }
    // The API returns how much of the metal 1 USD can buy.
    // To get the price of 1 ounce in USD, we calculate the inverse.
    const pricePerOunce = 1 / rate;

    // On success, resolve with the structured data our app expects.
    return {
      name: metal.charAt(0).toUpperCase() + metal.slice(1),
      price24k: pricePerOunce.toFixed(2), // Price per ounce
      lastUpdated: new Date(data.timestamp * 1000).toLocaleTimeString(),
      // Mocking previous day's data as it's not available from this API endpoint.
      previousClose: (pricePerOunce * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2),
      previousOpen: (pricePerOunce * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2),
      todayDate: new Date(data.timestamp * 1000).toLocaleDateString(),
    };
  } catch (error) {
    console.error(`Failed to fetch details for ${metal}:`, error);
    // Re-throw the error so the component that called this can handle it.
    throw error;
  }
};