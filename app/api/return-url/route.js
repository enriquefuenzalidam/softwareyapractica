import { WebpayPlus } from 'transbank-sdk';
import configureTransbank from '../../../lib/transbank';
import nodemailer from 'nodemailer';

configureTransbank();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token_ws = searchParams.get('token_ws');
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  // const token_tbk = searchParams.get('TBK_TOKEN');
  // const token_tbk_id_sesion = searchParams.get('TBK_ID_SESION');
  // const token_tbk_orden_compra = searchParams.get('TBK_ORDEN_COMRA');

  let success = false;
  let transactionData = {};

  try {
    const transaction = new WebpayPlus.Transaction();
    const commitResponse = await transaction.commit(token_ws);

    // console.log(token_ws);

    // console.log(token_tbk);
    // console.log(token_tbk_id_sesion);
    // console.log(token_tbk_orden_compra);

    // console.log('Transaction Status:', commitResponse.status);

    success = commitResponse.status === 'AUTHORIZED';
    transactionData = {
      buyOrder: commitResponse.buy_order,  // Assuming this is returned
      transactionDate: commitResponse.transaction_date || new Date().toISOString(),
    };

    // Send email only if the transaction was successful
    if (success) {
      await sendConfirmationEmail(name, email, transactionData);

      // Send notification email to admin
      await sendConfirmationEmail(
        'Admin', // Name of the admin (optional)
        'latasoftchile@gmail.com', // Admin email address
        transactionData,
        true // Flag indicating this is for the admin
      );
    }

  } catch (error) {
    // console.log(token_tbk);
    // console.log(token_tbk_id_sesion);
    // console.log(token_tbk_orden_compra);

    console.error('Error during transaction commit:', error);

  }

  // Build the redirection URL

  // redirection local
  // const redirectUrl = new URL('/compraresultado', req.url);

  // redirection at hosting
  const redirectUrl = new URL('https://softwareya.cl/compraresultado');

  redirectUrl.searchParams.set('compraExito', success.toString());
  redirectUrl.searchParams.set('name', name);
  redirectUrl.searchParams.set('email', email);
  redirectUrl.searchParams.set('buyOrder', transactionData.buyOrder);
  redirectUrl.searchParams.set('transactionDate', transactionData.transactionDate);

  // console.log('Redirecting to:', redirectUrl.toString());

  // Redirect to the success/failure page
  return new Response(null, {
    status: 302,
    headers: {
      'Location': redirectUrl.toString(),
    },
  });

}

async function sendConfirmationEmail(name, email, transactionData, isAdmin = false) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.softwareya.cl', // Replace with your SMTP server details
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sofwareyacompra@softwareya.cl', // Replace with your email
      pass: 'JDG35TuZU52rrBNFy7Td'     // Replace with your email password
    }
  });

  // Setup email data
  let mailOptions = {
    from: '"SoftwareYa" <sofwareyacompra@softwareya.cl>', // Sender address
    to: email, // List of receivers
  };

  if (isAdmin) {
    mailOptions.subject = `New Transaction Notification for Order ${transactionData.buyOrder}`;
    mailOptions.text = `Admin,\n\nA new transaction has been completed successfully.\n\nOrder Number: ${transactionData.buyOrder}\nTransaction Date: ${transactionData.transactionDate}\n\nThis is a notification to inform you of the transaction.\nSoftwareYa`;
  }
  else {
    mailOptions.subject = 'Confirmación de compra en SoftwareYa';
    mailOptions.text = `Hola, ${name},\n\nGracias por tu compra. Estos son los detalles de tu orden:\n\nNúmero: ${transactionData.buyOrder}\nFecha de la compra: ${transactionData.transactionDate}\n\nDetalles de los productos:\n${items.map(item => `Nombre: ${item.softNombr}\nCantidad: ${item.quantity}\nTipo: ${item.quantity > 0 ? 'Compra' : 'Suscripción'}\n\n`).join('')}\n\nQue tengas un buen día.\nSoftwareYa`;
  }

  // Send mail with defined transport object
  await transporter.sendMail(mailOptions);
}

// Error en formulario de pago
// Cuando estés en producción, si ocurre un error en el formulario de pago, y haces click en el link de "intentar nuevamente" en la pantalla de error llegará token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMRA.
// Esto es replicable solo en producción si inicias una transacción, abres el formulario de pago, cierras el tab de tu navegador y luego lo recuperas.

// Timeout: Cuando un usuario abre el formulario de pago pero no hace nada por más de 5 minutos, es devuelto automáticamente al comercio.
// Llegará solamente TBK_ID_SESION que contiene el session_id enviado al crear la transacción, TBK_ORDEN_COMRA que representa el buy_order enviado. No llegará token.