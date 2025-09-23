$(function () {
  console.log("here");
  const userDataString = sessionStorage.getItem("currentUser");

  if (!userDataString) {
    window.location.href = "index.html";
    return;
  }

  const datiUtente = JSON.parse(userDataString);

  if (
    !datiUtente.aziende ||
    !Array.isArray(datiUtente.aziende) ||
    datiUtente.aziende.length === 0
  ) {
    console.error("User data missing 'aziende' array or it is empty.");
    return;
  }

  function updateMenuPermissions() {
    const activeAzienda = datiUtente.aziende.find(
      (a) => a.id === datiUtente.activeAziendaId
    );

    if (
      !activeAzienda ||
      !activeAzienda.strutture ||
      !Array.isArray(activeAzienda.strutture) ||
      activeAzienda.strutture.length === 0
    ) {
      console.error(
        "Active azienda or its 'strutture' array is missing or empty."
      );
      return;
    }

    const activeStruttura = activeAzienda.strutture.find(
      (s) => s.id === datiUtente.activeStrutturaId
    );
    const userRoles = activeStruttura ? activeStruttura.ruoli || [] : [];

    $(".ui.vertical.menu [data-permission]").hide();

    const rolePermissions = {
      direttore: [
        "anagrafica",
        "ricerca-ospite",
        "nuovo-inserimento",
        "pianificazione",
        "cruscotto-pai",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "piani-lavoro",
        "piano-infermieri",
        "piano-oss",
        "dashboard",
      ],
      responsabile_sanitario: [
        "anagrafica",
        "ricerca-ospite",
        "nuovo-inserimento",
        "pianificazione",
        "cruscotto-pai",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      coordinatore_infermieristico: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "cruscotto-pai",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "piani-lavoro",
        "piano-infermieri",
        "dashboard",
      ],
      coordinatore_oss: [
        "anagrafica",
        "ricerca-ospite",
        "piani-lavoro",
        "piano-oss",
        "dashboard",
      ],
      medico_struttura: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      infermiere: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "cruscotto-pai",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "piani-lavoro",
        "piano-infermieri",
        "dashboard",
      ],
      fisioterapista: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      terapista_occupazionale: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      logopedista: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      educatore_professionale: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "dashboard",
      ],
      psicologo: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      animatore: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "dashboard",
      ],
      oss: [
        "anagrafica",
        "ricerca-ospite",
        "piani-lavoro",
        "piano-oss",
        "dashboard",
      ],
      assistente_sociale: [
        "anagrafica",
        "ricerca-ospite",
        "nuovo-inserimento",
        "dashboard",
      ],
      dietista: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "dashboard",
      ],
      podologo: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "dashboard",
      ],
      terapista_riabilitazione: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "dashboard",
      ],
      personale_amministrativo: [
        "anagrafica",
        "ricerca-ospite",
        "nuovo-inserimento",
        "dashboard",
      ],
      coordinatore_comunita: [
        "anagrafica",
        "ricerca-ospite",
        "nuovo-inserimento",
        "pianificazione",
        "cruscotto-pai",
        "redazione-pai",
        "area-clinica",
        "cartella-infermieristica",
        "piani-lavoro",
        "piano-infermieri",
        "piano-oss",
        "dashboard",
      ],
      responsabile_it: ["dashboard"],
      responsabile_qualita: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "cruscotto-pai",
        "area-clinica",
        "cartella-infermieristica",
        "piani-lavoro",
        "piano-infermieri",
        "piano-oss",
        "dashboard",
      ],
      responsabile_formazione: [
        "anagrafica",
        "ricerca-ospite",
        "pianificazione",
        "cruscotto-pai",
        "dashboard",
      ],
      responsabile_acquisti: ["dashboard"],
    };

    const permissionsToShow = new Set();

    userRoles.forEach((role) => {
      if (rolePermissions[role]) {
        rolePermissions[role].forEach((permission) =>
          permissionsToShow.add(permission)
        );
      }
    });

    permissionsToShow.forEach((permission) => {
      $(`.ui.vertical.menu [data-permission='${permission}']`).show();
    });

    const rolesText = (userRoles || [])
      .map((r) => r.replace(/_/g, " "))
      .join(", ");
    if (rolesText) {
      $("#logged-user").text(`${datiUtente.nome} (${rolesText})`);
    } else {
      $("#logged-user").text(`Ciao ${datiUtente.nome}`);
    }
  }

  updateMenuPermissions();

  const savedSidebarPage = sessionStorage.getItem("activeSidebarPage");
  if (savedSidebarPage) {
    const $targetItem = $(`.ui.sidebar .item[data-page='${savedSidebarPage}']`);
    if ($targetItem.length) {
      $targetItem.siblings(".item").removeClass("active");
      $targetItem.addClass("active");
      $("#content-pusher").load(`components/${savedSidebarPage}`);
    }
  } else {
    const initialPage = $(".ui.sidebar .item.active").data("page");
    if (initialPage) {
      $("#content-pusher").load(`components/${initialPage}`);
    }
  }

  $(".ui.sidebar .item").on("click", function () {
    $(this).siblings(".item").removeClass("active");
    $(this).addClass("active");
    const pagePath = $(this).data("page");
    sessionStorage.setItem("activeSidebarPage", pagePath);
    $("#content-pusher").load(`components/${pagePath}`);
  });

  $(document).on("click", "a[data-page]", function (e) {
    e.preventDefault();
    const pagePath = $(this).data("page");
    if (pagePath) {
      const $sidebarItem = $(`.ui.sidebar .item[data-page='${pagePath}']`);
      if ($sidebarItem.length) {
        $sidebarItem.siblings(".item").removeClass("active");
        $sidebarItem.addClass("active");
        sessionStorage.setItem("activeSidebarPage", pagePath);
      }
      $("#content-pusher").load(`components/${pagePath}`);
    }
  });

  $(".ui.top.attached.demo.menu .right.menu a.item:last-child").on(
    "click",
    function () {
      sessionStorage.clear();
      window.location.href = "index.html";
    }
  );

  $(".ui.sidebar")
    .sidebar({
      context: $(".bottom.segment"),
      defaultTransition: {
        computer: {
          left: "overlay",
          right: "overlay",
        },
        mobile: {
          left: "push",
          right: "push",
        },
      },
    })
    .sidebar("attach events", ".ui.top.attached.demo.menu .item");
});
