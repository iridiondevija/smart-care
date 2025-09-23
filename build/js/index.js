$(function () {
  const mockUsers = {
    "direttore@smartcare.it": {
      password: "test",
      nome: "Mario Rossi",
      aziende: [
        {
          id: "azienda1",
          nome: "Smart Care Italia",
          strutture: [
            {
              id: "struttura1",
              nome: "Casa di Riposo Fiori d'Autunno",
              ruoli: ["direttore", "fisioterapista"],
            },
            {
              id: "struttura2",
              nome: "Clinica San Paolo",
              ruoli: ["direttore"],
            },
          ],
        },
      ],
    },
    "sanitario@smartcare.it": {
      password: "password123",
      nome: "Giulia Bianchi",
      aziende: [
        {
          id: "azienda1",
          nome: "Smart Care Italia",
          strutture: [
            {
              id: "struttura1",
              nome: "Casa di Riposo Fiori d'Autunno",
              ruoli: ["responsabile_sanitario"],
            },
          ],
        },
      ],
    },
    "infermiere@smartcare.it": {
      password: "password123",
      nome: "Luca Verdi",
      aziende: [
        {
          id: "azienda1",
          nome: "Smart Care Italia",
          strutture: [
            {
              id: "struttura1",
              nome: "Casa di Riposo Fiori d'Autunno",
              ruoli: ["infermiere"],
            },
          ],
        },
      ],
    },
    "oss@smartcare.it": {
      password: "password123",
      nome: "Anna Neri",
      aziende: [
        {
          id: "azienda1",
          nome: "Smart Care Italia",
          strutture: [
            {
              id: "struttura1",
              nome: "Casa di Riposo Fiori d'Autunno",
              ruoli: ["oss"],
            },
          ],
        },
      ],
    },
    "fisioterapista@smartcare.it": {
      password: "password123",
      nome: "Marco Gialli",
      aziende: [
        {
          id: "azienda1",
          nome: "Smart Care Italia",
          strutture: [
            {
              id: "struttura2",
              nome: "Clinica San Paolo",
              ruoli: ["fisioterapista"],
            },
          ],
        },
      ],
    },
    "terapistaoccupazionale@smartcare.it": {
      password: "password123",
      nome: "Elisa Bruno",
      aziende: [
        {
          id: "azienda1",
          nome: "Smart Care Italia",
          strutture: [
            {
              id: "struttura2",
              nome: "Clinica San Paolo",
              ruoli: ["terapista_occupazionale"],
            },
          ],
        },
      ],
    },
  };

  $("#login-button").on("click", function (event) {
    event.preventDefault();

    $(".ui.error.message").hide().text("");

    const email = $("#email-input").val();
    const password = $("#password-input").val();

    const user = mockUsers[email];

    if (user && user.password === password) {
      const userData = {
        nome: user.nome,
        aziende: user.aziende,
        activeAziendaId: user.aziende[0].id,
        activeStrutturaId: user.aziende[0].strutture[0].id,
      };
      sessionStorage.setItem("currentUser", JSON.stringify(userData));
      window.location.href = "admin-dashboard.html";
    } else {
      $(".ui.form").addClass("error");
      $(".ui.error.message").text(
        "Credenziali non valide. Per favore, riprova."
      );
      $(".ui.error.message").show();
    }
  });
});
