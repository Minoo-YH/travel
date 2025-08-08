import Stripe from "stripe";



const stripe = new Stripe("sk_test_51QFvkhLAzYW8YRzj0TEpJ9Y1OOQJCYy7K7JvOaplWmDZpI1UcUX3V5mxA37NOrTpXHk96gT6VkaYR91HHBKfnHYZ002HzPfgrG");

export const handlePayment = async (req, res) => {
  try {
   
    console.log("Request body:", req.body);
    
    const { amount, email, token } = req.body;

   
    if (!amount || !email || !token) {
      console.log("Missing required parameters: amount, email, or token.");
      return res.status(400).send({
        success: false,
        message: "Missing required parameters: amount, email, or token.",
      });
    }

   
    console.log("Amount:", amount);
    console.log("Email:", email);
    console.log("Token:", token);

  
    console.log("Creating customer...");
    const customer = await stripe.customers.create({
      email: email,
      source: token.id,
      name: token.card.name,
    });
    console.log("Customer created:", customer);


    if (!customer || !customer.id) {
      console.log("Failed to create customer.");
      return res.status(500).send({
        success: false,
        message: "Failed to create customer.",
      });
    }

   
    console.log("Charging customer...");
    const charge = await stripe.charges.create({
      amount: Math.round(parseFloat(amount) * 100), 
      description: `Payment for USD ${amount}`,
      currency: "USD",
      customer: customer.id,
    });
    console.log("Charge created:", charge);

   
    res.status(200).send({
      success: true,
      message: "Payment successful",
      charge,
    });
  } catch (error) {
    
    console.error("Error during payment:", error.message);
    console.error("Full error details:", error);

    res.status(500).send({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};

export default handlePayment;

