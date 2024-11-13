import { sendDiscordMessage } from "@/helpers/messages/discord";

export async function checkKopsPlots() {
  try {
    const results = await getPreferredPlot();

    sendDiscordMessage(
      "IN DE VERKOOP 🎉🥳",
      `NUMMER 15 IS IN DE VERKOOP 🎉🥳!! ${results.extraInfoMessage}`,
      "HIGH"
    );
  } catch (e) {
    if (e instanceof Error) {
      sendDiscordMessage("Nog geen verkoop 😢", e.message, "LOW");
    } else {
      sendDiscordMessage(
        "Oh oh 🫨🫨",
        "Er ging iets mis maar geen idee wat 🫨🫨",
        "MEDIUM"
      );
    }
  }
}

async function getPreferredPlot() {
  let data: any;
  try {
    const response = await fetch(
      "https://woningselector.kopskwartier.nuvastgoed.online/fetch-data/"
    );

    data = await response.json();
  } catch (e) {
    throw Error("Er ging iets mis met het ophalen van de api 🫨🫨");
  }

  const plots = data["kavels"] as [];

  if (!plots) {
    throw Error("Er ging iets mis met het ophalen van de kavels 🫨🫨");
  }

  let saleAmount = 0;
  let optionAmount = 0;
  let soldAmount = 0;

  let preferredPlotId: string | undefined;

  for (const plot of plots) {
    switch (plot["status_id"]) {
      case "1":
        saleAmount++;
        break;
      case "2":
        optionAmount++;
        break;
      case "3":
        soldAmount++;
        break;
    }

    if (plot["kavel_nr"] === "15") {
      preferredPlotId = plot["nbo_uiid"];
    }
  }

  const extraInfoMessage = `Hier is wat extra informatie: van de ${plots.length} kavels zijn er nu ${saleAmount} in de verkoop, ${optionAmount} in optie & ${soldAmount} verkocht.`;

  if (!preferredPlotId) {
    throw Error(
      `Nummer 15 is nog niet in de verkoop 😢😢. ${extraInfoMessage}`
    );
  }

  return {
    id: preferredPlotId,
    extraInfoMessage,
  };
}
