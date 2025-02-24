let ez_language_addon_version = "1.0";
log(`EZ-Language Addon Version ${ez_language_addon_version} enabled.`);

let ez_language = () => {
  const classesToProcessSystem = [
    "pageTitleOuterContainer",
    "WaGadgetBreadcrumbs",
    "eventDetailsLink",
    "pastEventLink",
    "eventDivItem",
    "OnlineStoreCatalog_list_item_link",
    "OnlineStoreProduct_title_container",
    "storeCartTable_tdTitle",
    "storeCartTable_itemTitle",
    "title",
  ];
  const classesToProcessUser = [
    "gadgetEventEditableArea",
    "OnlineStoreProduct_description",
  ];

  const classesToProcess = [...classesToProcessSystem, ...classesToProcessUser];

  const processHtml = (html, className) => {
    const regex = /\[ez\s+(\w+)\](.*?)\[\/ez\]/gs;

    return html.replace(regex, (match, p1, p2) => {
      const displayStyle = `style="display: ${
        p1 === currentLanguage ? "inline" : "none"
      };"`;
      const classAddedContent = p2.replace(
        /(<\w+)([^>]*>)/g,
        `$1 class="${p1}" ${displayStyle} $2`
      );
      return `<div class="${p1}" ${displayStyle}>${classAddedContent}</div>`;
    });
  };

  classesToProcess.forEach((className) => {
    const containers = document.querySelectorAll(`.${className}`);
    containers.forEach((container) => {
      container.innerHTML = processHtml(container.innerHTML, className);
    });
  });
};
