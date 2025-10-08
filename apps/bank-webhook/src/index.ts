import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

   
  try {
    // Log the payment information for debugging purposes
    console.log('Received payment information:', paymentInformation);

      const userId = Number(paymentInformation.userId); // or BigInt if your schema uses bigint
      const amount = Number(paymentInformation.amount);

      await db.$transaction([
        db.balance.updateMany({
          where: { userId },
          data: { amount: { increment: amount } },
        }),
        db.onRampTransaction.updateMany({
          where: { token: paymentInformation.token },
          data: { status: "Success" },
        }),
      ]);


    res.json({
      message: 'Captured',
    });
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error while processing webhook:', e);

    res.status(500).json({
      message: 'Error while processing webhook',
    });
  }



})

app.listen(3002);