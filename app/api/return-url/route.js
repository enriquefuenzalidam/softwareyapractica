import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';

configureTransbank();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token_ws = searchParams.get('token_ws');

  try {
    // Instantiate the Transaction object
    const transaction = new WebpayPlus.Transaction();

    // Commit the transaction
    const commitResponse = await transaction.commit(token_ws);

    return new Response(JSON.stringify(commitResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error during transaction commit:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
