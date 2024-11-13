type DiscordMessagePriority = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_CONFIG: Record<
  DiscordMessagePriority,
  { roleId: string; color: number }
> = {
  LOW: {
    roleId: "1306310062091796552",
    color: 0xffeb3b,
  },
  MEDIUM: {
    roleId: "1306310344498610328",
    color: 0xff9100,
  },
  HIGH: {
    roleId: "1306310381605617677",
    color: 0xf41921,
  },
};

export async function sendDiscordMessage(
  title: string,
  description: string,
  webhookUrl: string,
  priority: DiscordMessagePriority = "LOW"
) {
  const config = PRIORITY_CONFIG[priority];

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `<@&${config.roleId}>`,
        embeds: [
          {
            title,
            description,
            color: config.color,
            footer: {
              text: `Priority: ${priority}`,
            },
            timestamp: new Date().toISOString(),
          },
        ],
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
