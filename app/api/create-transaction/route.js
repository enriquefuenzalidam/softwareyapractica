import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';

configureTransbank();

export async function POST(req) {
  try {
    const { amount, sessionId, buyOrder, returnUrl } = await req.json();
    const transaction = new WebpayPlus.Transaction();
    const createResponse = await transaction.create(buyOrder, sessionId, amount, returnUrl);

    return new Response(JSON.stringify(createResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
