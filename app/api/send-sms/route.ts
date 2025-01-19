import { NextRequest, NextResponse } from "next/server";
import africastalking from "africastalking";
import twilio from "twilio";

// Africa's Talking Client Setup
const africasTalkingClient = africastalking({
  apiKey: process.env.AFRICASTALKING_API_KEY!, // Add to your .env.local
  username: "emino", // Use "sandbox" for testing in Africa's Talking
});

// Twilio Client Setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!, // Add to your .env.local
  process.env.TWILIO_AUTH_TOKEN! // Add to your .env.local
);

// Define the POST method
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, message, to, isWhatsApp } = body;

    if (!provider || !message || !to) {
      return NextResponse.json(
        { error: "Missing required fields: provider, message, to" },
        { status: 400 }
      );
    }
    if (isWhatsApp) {
      // Sending a WhatsApp message via Twilio
      const response = await twilioClient.messages.create({
        from: "whatsapp:+14155238886", // Twilio's official WhatsApp sandbox number
        contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e", // Add to .env.local
        contentVariables: JSON.stringify({ "1": "12/1", "2": "3pm" }), // Customize variables as needed
        to: `whatsapp:${to}`, // Ensure "to" starts with 'whatsapp:'
      });
      return NextResponse.json({ success: true, sid: response.sid });
    }
    if (provider === "africastalking") {
      // Sending SMS via Africa's Talking
      console.log(provider,'this provider')
      const response = await africasTalkingClient.SMS.send({
        to: [to],
        message,
        from: "EMINO", // Your sender ID (optional)
      });
      return NextResponse.json({ success: true, response });
    } else if (provider === "twilio") {
      // Sending SMS via Twilio
      const response = await twilioClient.messages.create({
        body: message,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID!,
        to,
      });
      return NextResponse.json({ success: true, sid: response.sid });
    } else {
      return NextResponse.json(
        { error: "Invalid provider specified" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { error: "Failed to send SMS", details: error },
      { status: 500 }
    );
  }
}
