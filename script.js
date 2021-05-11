function script() {
  let setupRunning = false;

  document.addEventListener("keydown", (e) => {
    if (setupRunning) {
      e.preventDefault();

      return;
    }

    if (e.code.includes("Numpad")) {
      e.preventDefault();
    }

    switch (e.code) {
      case "Numpad7":
        document.getElementById("ap_name").value = "";
        document.getElementById("ap_name").focus();

        break;

      case "Numpad8":
        // cantitate
        document.getElementById("ap_quantity").value = "";
        document.getElementById("ap_quantity").focus();

        break;
      case "Numpad9":
        // pret1
        document.getElementById("ap_price").value = "";
        document.getElementById("ap_price").focus();

        break;
      case "Numpad4":
        // pret2
        document.getElementById("ap_price_2").value = "";
        document.getElementById("ap_price_2").focus();

        break;
      case "NumpadSubtract":
        setup();

        break;
      case "NumpadAdd":
        add_product();

        break;
    }
  });

  function setup() {
    setupRunning = true;

    // marfa
    expandCategories("catDropdown");
    document.querySelectorAll('[data-name="Marfa"]')[0].click();

    // gestiune
    document.getElementById("ap_gestiune").click();

    setTimeout(waitForGestiune, 100);
  }

  function waitForGestiune() {
    const els = document.querySelectorAll("li.ui-menu-item[id]");

    for (let i = 0; i < els.length; i++) {
      const el = els[i];

      if (el.innerText === "Moto Velo Sport") {
        el.click();
        document.getElementById("ap_gestiune").blur();

        // tva
        document.getElementById("ap_tva_inclus_2").value = 1;

        // um
        document.getElementById("ap_um").click();

        setTimeout(waitForUm, 100);
        return;
      }
    }

    setTimeout(waitForGestiune, 100);
  }

  function waitForUm() {
    const els = document.querySelectorAll("li.ui-menu-item[id]");

    for (let i = 0; i < els.length; i++) {
      const el = els[i];

      if (el.innerText === "BUC") {
        el.click();
        document.getElementById("ap_um").blur();

        setupRunning = false;
        return;
      }
    }

    setTimeout(waitForUm, 100);
  }
}

module.exports = script;
