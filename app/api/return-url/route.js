import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';

configureTransbank();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token_ws = searchParams.get('token_ws');;
  const name = searchParams.get('name');
  const email = searchParams.get('email');


  let success = false;
  let transactionData = {};

  try {
    const transaction = new WebpayPlus.Transaction();
    const commitResponse = await transaction.commit(token_ws);

    console.log('Transaction Status:', commitResponse.status);
    success = commitResponse.status === 'AUTHORIZED';
//  transactionData = commitResponse;

//  return new Response(JSON.stringify(commitResponse), {
//    status: 200,
//    headers: { 'Content-Type': 'application/json' },
//  });

  } catch (error) {
    console.error('Error during transaction commit:', error);

//  return new Response(JSON.stringify({ error: error.message }), {
//    status: 500,
//    headers: { 'Content-Type': 'application/json' },
//  });

  }

  // Build the redirection URL
  const redirectUrl = new URL('/compraresultado', req.url);
  redirectUrl.searchParams.set('compraExito', success.toString());
  redirectUrl.searchParams.set('name', name);
  redirectUrl.searchParams.set('email', email);

  console.log('Redirecting to:', redirectUrl.toString());

  // Redirect to the success/failure page
  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl.toString(),
    },
  });

}
