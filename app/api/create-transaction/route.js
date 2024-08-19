import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';

configureTransbank();

export async function POST(req) {
  try {
    console.log('Received POST request at /api/create-transaction');

    const { amount, sessionId, buyOrder, returnUrl } = await req.json();
    console.log('Received data:', { amount, sessionId, buyOrder, returnUrl });

    // Instantiate the Transaction object
    const transaction = new WebpayPlus.Transaction();

    // Create the transaction
    const createResponse = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    console.log('Transbank createResponse:', createResponse);

    return new Response(JSON.stringify(createResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during transaction creation:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
