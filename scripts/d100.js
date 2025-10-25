Hooks.on("diceSoNiceReady", () => {
  console.log("D100 0-99 Roller aktiv");
});

// Hook in die Würfel-Auswertung
Hooks.on("preCreateChatMessage", (msg, data, options, userId) => {
  const roll = msg.rolls?.[0];
  if (!roll) return;

  // Prüfe ob d100 gewürfelt wurde
  if (roll.terms.some(t => t.faces === 100)) {
    // Ergebnis neu würfeln in 0-99
    let newTotal = Math.floor(Math.random() * 100);
    msg.updateSource({
      content: msg.content.replace(/(\d+)/, newTotal),
      flavor: `${msg.flavor || ""} (0-99 angepasst)`
    });
  }
});
