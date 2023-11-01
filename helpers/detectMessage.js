export function detectMessage(message) {
  const targetChannelId = "1164665912952094904";
  if (message.channel.id !== targetChannelId) {
    return;
  }

  const requiredFields = [
    "Nom:",
    "Prénom:",
    "Age:",
    "Travail du personnage:",
    "Origine:",
    "Caractère:",
    "Histoire:",
    "Compétence:",
    "Arme:",
  ];

  const content = message.content.toLowerCase(); // Convertir le contenu en minuscules pour éviter la sensibilité à la casse

  // Vérifie si tous les champs requis sont présents dans le message
  const allFieldsPresent = requiredFields.every((field) =>
    content.includes(field.toLowerCase() + " ")
  );

  if (allFieldsPresent) {
    // Si tous les champs sont présents, ajoutez le rôle ici
    console.log("tout les champs sont la");
  } else {
    console.log("Ce message ne contient pas tous les champs requis.");
  }
}
