let ez_terms_addon_version = "1.0";
log(`EZ-Terms Addon Version ${ez_terms_addon_version} enabled.`);

let ez_terms = () => {
  const termsModal = document.createElement("div");
  termsModal.id = "termsModal";
  termsModal.className = "termsModal";

  const termsModalContent = document.createElement("div");
  termsModalContent.className = "termsModal-content";

  const termsModalTitle = document.createElement("h2");
  termsModalTitle.id = "termsModalTitle";

  const termsScrollableContent = document.createElement("div");
  termsScrollableContent.id = "termsScrollableContent";
  termsScrollableContent.className = "termsModal-scrollable-content";
  termsScrollableContent.textContent = "Loading...";

  const termsModalButtons = document.createElement("div");
  termsModalButtons.className = "termsModal-buttons";

  const termsCancelBtn = document.createElement("button");
  termsCancelBtn.id = "termsCancelBtn";
  termsCancelBtn.textContent = "Cancel";

  const termsTooltip = document.createElement("div");
  termsTooltip.className = "terms-tooltip";

  const termsAgreeBtn = document.createElement("button");
  termsAgreeBtn.id = "termsAgreeBtn";
  termsAgreeBtn.textContent = "Agree";
  termsAgreeBtn.disabled = true;

  const termsTooltipText = document.createElement("span");
  termsTooltipText.className = "terms-tooltiptext";
  termsTooltipText.textContent = "Scroll to the bottom to agree";

  termsTooltip.appendChild(termsAgreeBtn);
  termsTooltip.appendChild(termsTooltipText);
  termsModalButtons.appendChild(termsCancelBtn);
  termsModalButtons.appendChild(termsTooltip);
  termsModalContent.appendChild(termsModalTitle);
  termsModalContent.appendChild(termsScrollableContent);
  termsModalContent.appendChild(termsModalButtons);
  termsModal.appendChild(termsModalContent);

  document.body.appendChild(termsModal);

  const modal = document.querySelector(".termsModal");
  const modalTitleElement = document.getElementById("termsModalTitle");
  const agreeBtn = document.getElementById("termsAgreeBtn");
  const scrollableContent = document.getElementById("termsScrollableContent");
  const body = document.body;

  let currentCheckbox = null;
  let currentTermsLink = null;

  function openModal(title, buttonText, checkbox, termsLink) {
    modal.style.display = "flex";
    body.style.overflow = "hidden";
    modalTitleElement.textContent = title;
    agreeBtn.textContent = buttonText;
    currentCheckbox = checkbox;
    currentTermsLink = termsLink;
    loadTermsContent();
  }

  function closeModal() {
    modal.style.display = "none";
    body.style.overflow = "";
    currentCheckbox = null;
    currentTermsLink = null;
  }

  function checkScroll() {
    const contentHeight = scrollableContent.scrollHeight;
    const visibleHeight = scrollableContent.clientHeight;
    const scrollPosition = scrollableContent.scrollTop + visibleHeight;

    const tooltipText = document.querySelector(".terms-tooltiptext");
    if (contentHeight > visibleHeight && scrollPosition < contentHeight - 10) {
      agreeBtn.disabled = true;
      tooltipText.classList.add("show");
    } else {
      agreeBtn.disabled = false;
      tooltipText.classList.remove("show");
    }
  }

  function loadTermsContent() {
    if (currentTermsLink) {
      fetch(currentTermsLink.href)
        .then((response) => response.text())
        .then((html) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = html;
          const termsContent = tempDiv.querySelector(
            `.terms.${currentLanguage}`
          );

          scrollableContent.innerHTML = "";
          if (termsContent) {
            scrollableContent.appendChild(termsContent);
          } else {
            scrollableContent.innerHTML = "<p>No terms content found.</p>";
          }
          checkScroll();
        })
        .catch((error) => {
          console.error("Error loading terms content:", error);
          scrollableContent.innerHTML = "<p>Error loading terms content.</p>";
          checkScroll();
        });
    }
  }

  document
    .querySelectorAll('div.fieldBody div[id*="termsOfUse"]')
    .forEach((div) => {
      const termsCheckbox = div.querySelector('input[type="checkbox"]');
      const termsLink = div.querySelector("a");

      if (termsCheckbox && termsLink) {
        termsCheckbox.style.pointerEvents = "none";

        termsCheckbox.addEventListener("click", (event) => {
          event.preventDefault();
        });

        const row = div.closest("tr");
        const titleLabelSpan = row.querySelector('span[id*="titleLabel"]');
        const termsTitle = titleLabelSpan.textContent.trim();

        termsLink.addEventListener("click", (event) => {
          console.log("clicked");
          event.preventDefault();
          openModal(
            termsTitle,
            termsLink.textContent.trim(),
            termsCheckbox,
            termsLink
          );
        });
      }
    });

  document
    .getElementById("termsCancelBtn")
    .addEventListener("click", closeModal);

  agreeBtn.addEventListener("click", () => {
    if (currentCheckbox) {
      currentCheckbox.checked = true;
    }
    closeModal();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  scrollableContent.addEventListener("scroll", checkScroll);
};
