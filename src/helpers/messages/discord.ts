type DiscordMessagePriority = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_CONFIG: Record<
  DiscordMessagePriority,
  { webhook: string; color: number }
> = {
  LOW: {
    webhook:
      "https://discord.com/api/webhooks/1306295786220425267/RijlaC32peEhgngB6D7fk66HAoZh0vGS-kDXriAptv8sfd8laaOT77BkraXCgBMFas8E",
    color: 0xffeb3b,
  },
  MEDIUM: {
    webhook:
      "https://discord.com/api/webhooks/1306322238353440839/qcxn9jmaR6lrn_pIEmJHXVYUW-fSN_19aaUVhcgXK54WnSJlOa1m96jnzqLvsC_j18IB",
    color: 0xff9100,
  },
  HIGH: {
    webhook:
      "https://discord.com/api/webhooks/1306322322042519562/oEVE8IekgYUKHr3XgQAEvb29ljjyZEssdqj88y3zYK-TtHD_jCs60AuS_23tCyLy_xv7",
    color: 0xf41921,
  },
};

export async function sendDiscordMessage(
  title: string,
  description: string,
  priority: DiscordMessagePriority = "LOW"
) {
  const config = PRIORITY_CONFIG[priority];

  try {
    const response = await fetch(config.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
