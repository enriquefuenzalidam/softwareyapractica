// lib/transbank.js

import { Environment, WebpayPlus } from 'transbank-sdk';

const configureTransbank = () => {
  // Use this for production:
  // WebpayPlus.configureForProduction('YOUR_COMMERCE_CODE', 'YOUR_API_KEY');

  // For testing environment, you might want to use:
  WebpayPlus.configureForTesting();
  
  // Alternatively, if you need to test specific scenarios with certain credentials,
  // you can use WebpayPlus.configureForTestingWithSpecificCredentials('YOUR_COMMERCE_CODE', 'YOUR_API_KEY');
};

export default configureTransbank;
