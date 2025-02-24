/**
 * The function that checks the license key and sets the license variable accordingly. If the license key is valid and the product is active, the start function is called with the license parameter. If the license key is invalid, the plugin is disabled and an error message is logged. If no license key is provided, the plugin runs in trial mode with limited features.
 * @function
 * @returns {void}
 */
const checkLicense = async () => {
  // Declare two variables, `license` and `checkUrl`
  let license;
  let checkUrl = "https://hook.us1.make.com/" + checkCode;

  // If `license_key` is not an empty string, attempt to retrieve the `watmlicense` cookie using the `getCookie` function
  if (license_key !== "") {
    let license = getCookie("watmlicense");
    // If the cookie exists, call the `start` function and pass `license` as an argument
    if (license) {
      start(license);
    } else {
      // Use a try-catch block to handle fetch request errors
      try {
        // Make an HTTP GET request to the `checkUrl` URL
        // Include the `license_key` as a query parameter
        // Race the fetch request against the timeout promise
        const response = await Promise.race([
          fetch(`${checkUrl}/?json=true&key=${license_key}`),
          timeout(3000),
        ]);

        // If the response status is not ok, throw an error
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data as JSON
        const data = await response.json();

        // Check if the response data contains an error or the product is not "watm"
        if (
          data["license-error"] == "no valid key found" ||
          !data.Products.includes("watm")
        ) {
          // Set `license` to "invalid" and log an error message
          license = "invalid";
          storeError(
            `Invalid License Key for EZ Designer - Plugin is now disabled`
          );
          log(
            "Invalid License Key for EZ Designer - Plugin is now disabled",
            "Error"
          );
        } else {
          // Parse the expiration date from the response data
          let expiryDate = Date.parse(data["expiration date"]);

          // Check if the product is "watm", the support level is "support", and the expiration date is in the future
          if (
            data.Products.includes("watm") &&
            data["Support Level"] == "support" &&
            expiryDate >= Date.now()
          ) {
            // Set `license` to "active"
            license = "active";
          }

          // Check if the product is "watm" and the expiration date is in the past
          if (data.Products.includes("watm") && expiryDate < Date.now()) {
            // Set `license` to "expired" and log a notice message
            license = "expired";
            storeError(
              `License Key for EZ Designer expired - Running in trial mode. Please renew your license to unlock all features`
            );
            log(
              "License Key for EZ Designer expired - Running in trial mode. Please renew your license to unlock all features",
              "Notice"
            );
          }
        }

        // Set the `watmlicense` cookie to the value of `license` and call the `start` function, passing `license` as an argument
        setCookie("watmlicense", license);
        start(license);
      } catch (error) {
        // Check if the error message is "Request timed out"
        if (error.message === "Request timed out") {
          // Perform the desired action when the request times out
          storeError("EZ Web Designer License Server took too long to respond");
          log(
            "EZ Web Designer License Server took too long to respond - loading in Trial mode.",
            "Error"
          );
          license = "trial";
          log("EZ Designer running in trial mode", "Notice");
          start(license);
        } else {
          // Handle other fetch request errors
          storeError(`Fetch request error:  ${error}`);
          log(`Fetch request error: ${error}`, "Error");
        }
      }
    }
  } else {
    // If license_key is an empty string, set license to "trial" and log a notice message
    license = "trial";
    log(
      "EZ Designer running in trial mode - Please obtain a valid license key to unlock all features",
      "Notice"
    );
    // Set the `watmlicense` cookie to the value of `license` and call the `start` function, passing `license` as an argument
    setCookie("watmlicense", license);
    start(license);
  }
};

/**
 * Returns a promise that rejects after the specified delay.
 * @param {number} delay - The delay in milliseconds before the promise rejects.
 * @returns {Promise} A promise that rejects with an Error after the specified delay.
 */
function timeout(delay) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), delay)
  );
}

/**
 * Creates a language toggle switcher for a webpage.
 * @param {Array} languages - An array of language objects that contain a label and className property.
 * @param {string} currentLanguage - The current language of the webpage. Should match one of the language objects className property.
 * @param {string} elm - The id of the element where the language toggle switcher should be placed.
 */
const createToggle = (languages, currentLanguage, elm) => {
  /**
   * If no element is found with the given id, log a warning message and return false.
   * @returns {boolean} - false if no element with the given id is found.
   */
  if (!document.getElementById(elm)) {
    log(
      'No language switcher content gadget found. Add a content gadget with CSS ID "language_switch" to your page or page template(s) or disable multi-lingual mode.',
      "Warning"
    );
    return false;
  }
  let toggleText = "Select language";
  if (currentLanguage !== "") {
    /**
     * Sets the toggleText to the label of the currentLanguage object if it matches the className property of a language object.
     */
    languages.forEach((language, index) => {
      if (language.className == currentLanguage) {
        toggleText = language.label;
      }
    });
  }

  const toggleElementID = document.getElementById(elm);

  // Build switcher
  const languageToggle = document.createElement("div");
  languageToggle.classList.add("watm-dropdown", "watm-dropdown-closed");
  const languageToggleIcon = document.createElement("h2");
  languageToggleIcon.classList.add("watm-dropdown-icon");
  languageToggleIcon.innerHTML = `${toggleText} <span>∆</span>`;
  const languageToggleMenu = document.createElement("ul");
  languageToggleMenu.classList.add("watm-dropdown-menu");

  // Add languages
  /**
   * Creates a list item for each language in the languages array and attaches a click event listener that sets the URL to include the language className.
   */
  languages.forEach((language) => {
    let lang_li = document.createElement("li");
    lang_li.textContent = language.label;
    lang_li.addEventListener("click", (e) => {
      location.href = `?watm-${language.className}`;
    });
    languageToggleMenu.appendChild(lang_li);
  });

  // Add languages to switcher
  languageToggle.appendChild(languageToggleIcon);
  languageToggle.appendChild(languageToggleMenu);

  // Attach switcher to page
  toggleElementID.parentNode.replaceChild(languageToggle, toggleElementID);

  // Toggle dropdown on click
  /**
   * Toggles the watm-dropdown-closed class on the languageToggle element when clicked.
   */
  languageToggle.addEventListener("click", (e) => {
    if (languageToggle.classList.contains("watm-dropdown-closed")) {
      languageToggle.classList.remove("watm-dropdown-closed");
    } else {
      languageToggle.classList.add("watm-dropdown-closed");
    }
  });
};

/**
 * Sets a cookie for the selected language and reloads the page without the language keyword.
 * @param {string} language - The language to be set.
 */
const setLanguage = (language) => {
  // Set cookie for selected language
  setCookie("currentLanguage", language);
  // Reload page without language keyword
  window.location.href = window.location.href.replace(`?watm-${language}`, "");
};

/**
 * Reads the selected language from a cookie. If no language is found, sets the currentLanguage to "Default".
 * @param {Array} languages - An array of language objects that contain a label and className property.
 * @returns {string} - The current language of the webpage.
 */
const getCurrentLanguage = (languages) => {
  // Read selected language from cookie
  let currentLanguage = getCookie("currentLanguage");
  if (!currentLanguage) {
    const browserLanguage = getBrowserLanguage(navigator.language);
    if (
      languages.some((language) => {
        return language.className.includes(browserLanguage);
      })
    ) {
      currentLanguage = browserLanguage;
    } else {
      currentLanguage = "Default";
    }
  }
  return currentLanguage;
};

/**
 * Processes a row of data and executes the specified function on selected webpage elements.
 * @param {Object} row - An object representing a row of data, with properties "Default Text", "Function", "Query", "Replacement Text", and "Style".
 */
const process = (row, lineNumber, csvFileName) => {
  let columnNameError = false;
  if ("Default Text" in row) {
    defaultText = row["Default Text"].trim();
  } else {
    storeError(
      "Cannot find column labelled 'Default Text'<br />Ensure your CSV has the correct column labels"
    );
    log(
      "Cannot find column labelled 'Default Text'\nEnsure your CSV has the correct column labels",
      "Error"
    );
    columnNameError = true;
  }

  if ("Function" in row) {
    watmFunction = row["Function"].trim().toLowerCase();
  } else {
    storeError(
      "Cannot find column labelled 'Function'<br />Ensure your CSV has the correct column labels"
    );
    log(
      "Cannot find column labelled 'Function'\nEnsure your CSV has the correct column labels",
      "Error"
    );
    columnNameError = true;
  }

  if ("Query" in row) {
    watmQuery = row["Query"].trim();
  } else {
    storeError(
      "Cannot find column labelled 'Query'<br />Ensure your CSV have the correct column labels"
    );
    log(
      "Cannot find column labelled 'Query'\nEnsure your CSV have the correct column labels",
      "Error"
    );
    columnNameError = true;
  }

  if ("Replacement Text" in row) {
    replacementText = row["Replacement Text"].trim();
  } else {
    storeError(
      "Cannot find column labelled 'Replacement Text'<br />Ensure your CSV have the correct column labels"
    );
    log(
      "Cannot find column labelled 'Replacement Text'\nEnsure your CSV have the correct column labels",
      "Error"
    );
    columnNameError = true;
  }

  if ("Style" in row) {
    watmStyle = row["Style"].trim();
  } else {
    storeError(
      "Cannot find column labelled 'Style'<br />Ensure your CSV have the correct column labels"
    );
    log(
      "Cannot find column labelled 'Style'\nEnsure your CSV have the correct column labels",
      "Error"
    );
    columnNameError = true;
  }

  if (columnNameError) {
    return false;
  }

  let elements = [];
  if (
    watmFunction !== "googlefont" &&
    watmFunction !== "inactive" &&
    watmFunction !== ""
  ) {
    elements = safeQuerySelectorAll(watmQuery, lineNumber, csvFileName);
  }

  if (watmFunction == "googlefont") {
    let fontUrl = `https://fonts.googleapis.com/css2?family=${replacementText.trim()}:wght@200;300;400;600;700;800;900&display=swap`;
    let fontLink = document.createElement("link");
    fontLink.href = fontUrl;
    fontLink.setAttribute("rel", "stylesheet");
    document.head.appendChild(fontLink);
  } else if (watmQuery !== "") {
    switch (watmFunction) {
      case "hide":
        if (elements) {
          elements.forEach((el) => {
            el.style.display = "none";
          });
        }
        break;
      case "text":
        if (elements) {
          elements.forEach((el) => {
            el.innerText = replacementText;
          });
        }
        break;
      case "button":
        if (elements) {
          elements.forEach((el) => {
            el.value = replacementText;
          });
        }
        break;
      case "buttondelay":
        setTimeout(function () {
          if (elements) {
            elements.forEach((el) => {
              el.value = replacementText;
            });
          }
        }, 1000);
        break;
      case "placeholder":
        if (elements) {
          elements.forEach((el) => {
            el.setAttribute("placeholder", replacementText);
          });
        }
        break;
      case "delay":
        setTimeout(function () {
          if (defaultText.length <= 0) {
            if (elements) {
              elements.forEach((el) => {
                el.innerText = replacementText;
              });
            }
          } else replace_link_delay(watmQuery, "replace", defaultText, replacementText, lineNumber, csvFileName);
        }, 1000);
        break;
      case "shortdelay":
        setTimeout(function () {
          if (defaultText.length <= 0) {
            if (elements) {
              elements.forEach((el) => {
                el.innerText = replacementText;
              });
            }
          } else replace_link_delay(watmQuery, "replace", defaultText, replacementText, lineNumber, csvFileName);
        }, short_delay * 1000);
        break;
      case "longdelay":
        setTimeout(function () {
          if (defaultText.length <= 0) {
            if (elements) {
              elements.forEach((el) => {
                el.innerText = replacementText;
              });
            }
          } else replace_link_delay(watmQuery, "replace", defaultText, replacementText, lineNumber, csvFileName);
        }, long_delay * 1000);
        break;
      case "replace":
      case "replace_element":
      case "createlink":
        replace_link_delay(
          watmQuery,
          watmFunction,
          defaultText,
          replacementText,
          lineNumber,
          csvFileName
        );
        break;
      case "attribute":
        if (elements) {
          if (defaultText !== "") {
            elements.forEach((el) => {
              el.setAttribute(defaultText, replacementText);
            });
          } else {
            storeError(
              `Attribute name (defaultText) is missing for "attribute" function on line ${lineNumber} of ${csvFileName}`
            );
          }
        }
        break;
      case "link":
        if (elements) {
          elements.forEach((el) => {
            if (el.hasAttribute("href"))
              el.setAttribute("href", replacementText);
          });
        }
        break;
      case "source":
        if (elements) {
          elements.forEach((el) => {
            if (el.hasAttribute("src")) el.setAttribute("src", replacementText);
          });
        }
        break;
      case "tooltip":
        if (elements) {
          elements.forEach((el) => {
            tippy(el, {
              content: replacementText,
            });
          });
        }
        break;
      case "inactive":
      case "":
        break;
      default:
        storeError(
          `"${watmFunction}" is not a valid EZ function on line ${lineNumber} of ${csvFileName}`
        );
    }
  }

  if (watmFunction !== "inactive" && watmStyle !== null && watmStyle !== "") {
    let mediaQuery = "";
    if (watmFunction == "@media") mediaQuery = replacementText;
    processCSS(watmQuery, watmStyle, mediaQuery);
  }
};

/**
 * Replace text / create link with delay
 * @param {string} watmQuery - The CSS selector for the target element(s) to be modified.
 * @param {string} watmFunction - The function to be performed. Must be either "replace" or "createlink".
 * @param {string} defaultText - The default text to be replaced. Can be a plain string or a regex.
 * @param {string} replacementText - The text or URL to replace the defaultText with.
 * @param {number} lineNumber - The line number where the function is called.
 * @param {string} csvFileName - The name of the CSV file where the function is called.
 * @returns {undefined} - This function does not return anything.
 */
const replace_link_delay = (
  watmQuery = "body",
  watmFunction,
  defaultText,
  replacementText,
  lineNumber,
  csvFileName
) => {
  let regex = new RegExp(
    (defaultText.match(/[.\-!?:]/) ? "" : "\\b") +
      escapeRegExp(defaultText) +
      (defaultText.match(/[.\-!?:]/) ? "" : "\\b"),
    "gi"
  );

  if (defaultText === "" && watmFunction !== "createlink") {
    storeError(
      `defaultText is missing for "${watmFunction}" function on line ${lineNumber} of ${csvFileName}`
    );
    return;
  }
  if (
    (!replacementText.toLowerCase().includes(defaultText.toLowerCase()) ||
      defaultText.toLowerCase() !== replacementText.toLowerCase()) &&
    watmFunction === "replace"
  ) {
    document.querySelectorAll(watmQuery).forEach(function (el) {
      walkText(el, regex, watmFunction, function (node, match, offset) {
        let newText = document.createTextNode(replacementText);
        return newText;
      });
    });
  } else if (
    (replacementText.toLowerCase().includes(defaultText.toLowerCase()) ||
      defaultText.toLowerCase() === replacementText.toLowerCase()) &&
    watmFunction === "replace"
  ) {
    storeError(
      `Recursion error possible for "${watmFunction}" function on line ${lineNumber} of ${csvFileName} - skipped`
    );
  }
  if (
    !replacementText.toLowerCase().includes(defaultText.toLowerCase()) &&
    watmFunction === "replace_element"
  ) {
    document.querySelectorAll(watmQuery).forEach(function (el) {
      regex = new RegExp(defaultText, "gi");
      walkText(el, regex, watmFunction, function (node, match, offset) {
        return replacementText;
      });
    });
  }

  if (watmFunction === "createlink") {
    document.querySelectorAll(watmQuery).forEach(function (el) {
      walkText(el, regex, watmFunction, function (node, match, offset) {
        let alink = document.createElement("a");
        alink.href = replacementText;
        alink.textContent = match;
        return alink;
      });
    });
  }
};

/**
 * Checks whether the current page is in edit mode.
 *
 * @returns {boolean} Whether the current page is in edit mode.
 */
const isInEditMode = () => {
  // Check if in admin view
  const bodyTag = document.querySelector("body");
  return bodyTag.classList.contains("adminContentView");
};

/**
 * Logs a message to the console.
 *
 * @param {string} text - The text to log.
 * @param {string} [logType=''] - An optional log type to prepend to the message.
 */
const log = (text, logType = "") => {
  // Function for logging actions to console
  if (logType) logType = " " + logType;
  console.log(`[watm${logType}]`, text);
};

/**
 * Sets a cookie with the given key and value.
 *
 * @param {string} key - The key of the cookie.
 * @param {string} value - The value to set the cookie to.
 */
const setCookie = (key, value) => {
  var expires = new Date();
  expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
  document.cookie =
    key +
    "=" +
    value +
    ";path=/;expires=" +
    expires.toUTCString() +
    "; SameSite=None; Secure";
};

/**
 * Gets the value of the cookie with the given key.
 *
 * @param {string} key - The key of the cookie to retrieve.
 * @returns {(string|number|boolean|null)} The value of the cookie, or null if it does not exist.
 */
const getCookie = (key) => {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  if (keyValue && keyValue.length > 0) {
    keyValue = keyValue[2];

    if (!isNaN(keyValue)) {
      keyValue = Number(keyValue);
    } else if (keyValue.toLowerCase() == "true") {
      keyValue = true;
    } else if (keyValue.toLowerCase() == "false") {
      keyValue = false;
    }
  }
  return keyValue;
};

/**
 * Walks through the DOM tree and replaces the text node content based on a regex pattern match with a replacement string.
 * @param {Node} node - The current node being processed.
 * @param {RegExp} regex - The regular expression pattern used to match text.
 * @param {string} watmFunction - The watmFunction type.
 * @param {Function} callback - The callback function that replaces text with new text or HTML element.
 * @returns {Node} - Returns the updated node.
 */
const walkText = function (node, regex, watmFunction, callback) {
  const excludeElements = [
    "script",
    "style",
    "iframe",
    "canvas",
    "script",
    watmFunction === "createlink" ? "a" : "",
  ];

  switch (node.nodeType) {
    case 1:
      // If node is an element and not in the list of excluded tags, call walkText on its children nodes.
      if (excludeElements.indexOf(node.tagName.toLowerCase()) > -1) break;
      for (let i = 0; i < node.childNodes.length; i++) {
        walkText(node.childNodes[i], regex, watmFunction, callback);
      }
      break;
    case 3:
      // If node is a text node, replace the matched text content with the returned callback value.
      if (watmFunction === "replace_element" && regex.test(node.data)) {
        node.parentNode.innerText = callback(node);
        regex.lastIndex = 0;
      } else {
        var bk = 0;
        node.data.replace(regex, function (all) {
          var args = [].slice.call(arguments),
            offset = args[args.length - 2],
            newTextNode = node.splitText(offset + bk),
            tag;
          bk -= node.data.length + all.length;

          newTextNode.data = newTextNode.data.substr(all.length);
          tag = callback.apply(window, [node].concat(args));
          node.parentNode.insertBefore(tag, newTextNode);
          node = newTextNode;
        });
      }
      regex.lastIndex = 0;
      break;
  }

  return node;
};

/**
 * Processes CSS styles and creates a new style node in the head of the document.
 * @param {string} watmQuery - CSS selector for the element(s) to apply styles to.
 * @param {string} watmStyle - CSS styles to apply to the selected element(s).
 * @param {string} mediaQuery - CSS media query to apply the styles to.
 */
const processCSS = (watmQuery, watmStyle, mediaQuery) => {
  // SCSS
  if (watmStyle.includes("$")) {
    let regex = /\$[a-zA-Z0-9_-]+/g;
    let keys = watmStyle.match(regex);
    for (c = 0; c < keys.length; c++) {
      let key = keys[c];
      let value = scss_dict[key];
      watmStyle = watmStyle.replace(key, value);
    }
  }

  let cssNode = document.createElement("style");
  cssNode.innerHTML = `${
    mediaQuery !== "" ? "@media " + mediaQuery + " { " : ""
  }${watmQuery} { ${watmStyle} }${mediaQuery !== "" ? " }" : ""}`;
  document.head.appendChild(cssNode);
};

/**
 * Appends a WATM button to the document.
 * @param {string} license - The WATM license type to use for the button.
 * @param {boolean} isAdmin - Whether the current user is an admin or not.
 */
const appendWATMBtn = (license = "default", isAdmin) => {
  const btn = document.createElement("div");
  btn.classList.add("watm-icon", "watm-icon-left", `watm-${license}`);

  if (isAdmin && license !== "invalid") {
    btn.addEventListener("click", () => {
      window.location.href = window.location.href + "?dev";
    });
    btn.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (btn.classList.contains("watm-icon-left")) {
        btn.classList.remove("watm-icon-left");
        btn.classList.add("watm-icon-right");
      } else {
        btn.classList.remove("watm-icon-right");
        btn.classList.add("watm-icon-left");
      }
      return false;
    });
  }

  /**
   * Creates and displays a tooltip using the Tippy.js library, containing information about the WATM extension.
   *
   * @param {HTMLElement} btn - The button element to attach the tooltip to.
   * @param {string} watm_info_url - The URL to the WATM information page.
   * @param {string} watm_version - The version of the WATM extension.
   * @param {string} license - The license type of the WATM extension.
   * @param {boolean} isAdmin - Flag indicating if the user is an admin or not.
   */
  tippy(btn, {
    content:
      `<strong><a href="${watm_info_url}" target="_blank">EZ WildApricot Web Designer</a></strong><br/>` +
      `Version: ${watm_version} | License: <span class="${license}">${license.toUpperCase()}</span>` +
      `${
        isAdmin && license !== "invalid"
          ? "<br/><br/>Click icon to launch inspector"
          : !isAdmin
          ? "<br/><br/>You must login with a full Administrative account to use EZ WildApricot Designer."
          : ""
      }`,
    interactiveBorder: 30,
    interactiveDebounce: 75,
    placement: "right",
    interactive: true,
    allowHTML: true,
  });

  document.body.appendChild(btn);
};

/**
 * Loads the specified CSS files into the document head.
 *
 * @param {Array} cssFiles - An array of CSS file paths to load.
 */
const loadCSS = (cssFiles) => {
  let head = document.head;
  cssFiles.forEach((cssFile) => {
    let link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = cssFile;

    head.appendChild(link);
  });
};

/**
 * Escapes any special regular expression characters in the given string.
 *
 * @param {string} string - The string to escape.
 * @returns {string} - The escaped string.
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
};

/**
 * Returns the full English name of a language given its language code.
 *
 * @param {string} languageCode - The language code, in the format "xx"
 * @returns {string} The full English name of the language, or "Unknown" if the language code is not recognized.
 */
const getBrowserLanguage = (languageCode) => {
  // An object that maps language codes to their full English names
  const languageNames = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    hi: "Hindi",
    bn: "Bengali",
    id: "Indonesian",
    ms: "Malay",
    fil: "Filipino",
    th: "Thai",
    vi: "Vietnamese",
    tr: "Turkish",
    pl: "Polish",
    uk: "Ukrainian",
    ro: "Romanian",
    nl: "Dutch",
    sv: "Swedish",
    no: "Norwegian",
    fi: "Finnish",
    da: "Danish",
    he: "Hebrew",
    fa: "Persian",
    cs: "Czech",
    sk: "Slovak",
    hu: "Hungarian",
    hr: "Croatian",
    sr: "Serbian",
    sl: "Slovenian",
    bg: "Bulgarian",
    mk: "Macedonian",
    et: "Estonian",
    lv: "Latvian",
    lt: "Lithuanian",
  };
  // Look up the full English name of the language based on its language code
  let browserLanguage = languageNames[languageCode.split("-")[0]] || "";

  // Return the full English name of the language
  return browserLanguage.toLowerCase();
};

/**
 * Returns a NodeList of elements that match the specified CSS selector. If the selector
 * is invalid, logs an error to the console and returns null.
 *
 * @param {string} selector - The CSS selector to search for.
 * @returns {NodeList|null} A NodeList of matching elements, or null if the selector is invalid.
 */
function safeQuerySelectorAll(selector, lineNumber, csvFileName) {
  try {
    const elements = document.querySelectorAll(selector);
    return elements;
  } catch (error) {
    storeError(
      selector !== ""
        ? `Invalid query selector on line ${
            lineNumber + 1
          } of ${csvFileName}: ${selector}`
        : `Query selector missing on line ${lineNumber + 1} of ${csvFileName}`
    );
    log(error.message, "Error");
    return null;
  }
}

/**
 * Stores an error message into the localStorage.
 * @param {string} error - The error message to store.
 */
const storeError = (errorMessage, url = window.location.href) => {
  const storedErrors = JSON.parse(localStorage.getItem("WATM")) || [];
  let errorExists = false;

  storedErrors.forEach((errorObj) => {
    if (errorObj.error === errorMessage) {
      errorExists = true;
      if (!errorObj.urls.includes(url)) {
        errorObj.urls.push(url);
        errorObj.timestamp = new Date().toISOString();
      }
    }
  });

  if (!errorExists) {
    const errorObj = {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      urls: [url],
    };
    storedErrors.push(errorObj);
  }
  localStorage.setItem("WATM", JSON.stringify(storedErrors));
};

/**
 * Executes the provided function, catching any errors and storing them using the storeError function.
 * @param {Function} func - The function to execute.
 */
const safeExecute = (func, ...args) => {
  if (typeof func !== "function") {
    console.error("safeExecute: Provided argument is not a function");
    return;
  }

  try {
    return func(...args);
  } catch (error) {
    storeError(error.message);
    console.error(error);
  }
};

/**
 * Retrieves stored errors from localStorage.
 * @returns {Array} An array of stored error objects.
 */
const getStoredErrors = () => {
  return JSON.parse(localStorage.getItem("WATM")) || [];
};

/**
 * Deletes a specific error from localStorage by index and updates the table.
 * @param {number} index - The index of the error to delete.
 */
const deleteError = (index) => {
  const storedErrors = getStoredErrors();
  storedErrors.splice(index, 1);
  localStorage.setItem("WATM", JSON.stringify(storedErrors));
  displayErrors(); // Update the table
};

/**
 * Creates an HTML table and displays the stored errors.
 */
const displayErrors = () => {
  const errors = JSON.parse(localStorage.getItem("WATM")) || [];
  let tableHTML =
    "<table><tr><th>Error Message</th><th>Timestamp</th><th>Action</th><th></th></tr>";

  errors.forEach((errorObj, index) => {
    const date = new Date(errorObj.timestamp);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const formattedTimestamp = formatter.format(date);

    tableHTML += `
      <tr class="error-row">
        <td>${errorObj.error}</td>
        <td>${formattedTimestamp}</td>
        <td><button onclick="deleteError(${index})">Delete</button></td>
        <td><button class="expand-collapse-btn" onclick="toggleErrorPageURL(${index})">+</button></td>
      </tr>
      <tr id="urlRow${index}" class="hidden-row">
        <td colspan="4">
          ${errorObj.urls
            .map(
              (url) => `<div><a href="${url}" target="_blank">${url}</a></div>`
            )
            .join("")}
        </td>
      </tr>
    `;
  });

  tableHTML += "</table>";
  document.getElementById("errorTableContainer").innerHTML = tableHTML;
};

const toggleErrorPageURL = (index) => {
  const urlRow = document.getElementById(`urlRow${index}`);
  urlRow.classList.toggle("hidden-row");

  const expandCollapseBtn = urlRow.previousElementSibling.querySelector(
    ".expand-collapse-btn"
  );
  expandCollapseBtn.textContent =
    expandCollapseBtn.textContent === "+" ? "-" : "+";
};

/**
 * Clears all stored errors from localStorage and updates the table.
 */
const clearAllErrors = () => {
  localStorage.removeItem("WATM");
  displayErrors();
};
