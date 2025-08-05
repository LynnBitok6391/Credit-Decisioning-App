const { testConnection } = require('./services/geminiService');

(async () => {
  const success = await testConnection();
  if (success) {
    console.log('Gemini API connection test passed.');
  } else {
    console.error('Gemini API connection test failed.');
  }
})();
