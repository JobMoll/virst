export async function sendDiscordMessage(message: string, webhookUrl: string) {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
      }),
    });

    if (response.ok) {
      console.log("Message sent successfully.");
    } else {
      console.error("Failed to send message:", await response.text());
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
