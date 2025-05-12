const postData = async () => {
    const url = "https://672e1217229a881691eed80f.mockapi.io/scores";
  
    const data = {
      createdAt: new Date().toISOString(),
      username: document.getElementById("player-name").value.trim(),
      avatar:
      "https://i.imgur.com/Vg3FDfA.jpeg",
      score: document.getElementById("score").value,
      website_url: "https://marcnoteuil.github.io/ClickFast",
    };
  
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

  console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  
  postData();

const getData = async () => {
    const url = "https://672e1217229a881691eed80f.mockapi.io/scores";
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Data retrieved successfully:", data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
};
  
getData();

const usernameToDelete = document.getElementById("player-name").value.trim();

const deleteUserByUsername = async (username) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    // Étape 1 : Récupérer les utilisateurs avec le même username
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const usersToDelete = users.filter(
      (user) => user.username === username
    );

    // Étape 2 : Supprimer chaque utilisateur trouvé
    for (const user of usersToDelete) {
      const deleteResponse = await fetch(`${url}/${user.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        console.error(
          `Error deleting user with ID ${user.id}:`,
          deleteResponse.statusText
        );
      } else {
        console.log(`User with ID ${user.id} deleted successfully.`);
      }
    }

    // Étape 3 : Ajouter un nouvel utilisateur
    const newUserData = {
      createdAt: new Date().toISOString(),
      username: document.getElementById("player-name").value.trim(), // Vous pouvez changer le nom d'utilisateur si nécessaire
      avatar:
      "https://www.google.fr/imgres?q=noco%20clair%20obscur&imgurl=https%3A%2F%2Fexpedition33.wiki.fextralife.com%2Ffile%2FExpedition-33%2Fnoco-merchant-clair-obscur-expedition-33-wiki-guide-300px.png&imgrefurl=https%3A%2F%2Fexpedition33.wiki.fextralife.com%2FNoco&docid=lS4rOpKJ_VbQyM&tbnid=h1gQ_F0cQOqLUM&vet=12ahUKEwjF2dql-p2NAxW0VKQEHVzXIosQM3oECBcQAA..i&w=300&h=169&hcb=2&ved=2ahUKEwjF2dql-p2NAxW0VKQEHVzXIosQM3oECBcQAA",
      score: document.getElementById("score").value.trim(),
      website_url: "onyj.github.io/ClickFast",
    };

    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!postResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const newUserResult = await postResponse.json();
    console.log("New user posted successfully:", newUserResult);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Appel de la fonction pour supprimer et ajouter un utilisateur
deleteUserByUsername(usernameToDelete);