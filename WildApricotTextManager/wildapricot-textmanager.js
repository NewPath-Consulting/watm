/**
 * The URL of the current script.
 * @constant {string}
 */
const watm_location = document.currentScript.src.substring(
  0,
  document.currentScript.src.lastIndexOf("/")
);

/**
 * The version number of the WATM script.
 * @constant {string}
 */
const watm_version = "2.1.4";

/**
 * The URL of the WATM information page.
 * @constant {string}
 */
const watm_info_url =
  "https://newpathconsulting.com/ez-wildapricot-web-designer-2/";

/**
 * The default style for the WATM script.
 * @constant {string}
 */
const watm_styles = "default";

/**
 * Event listener for errors.
 * @function
 * @param {ErrorEvent} e - The error event object.
 * @returns {boolean} - Returns false.
 */
window.addEventListener("error", (e) => {
  // When an error occurs, make the body visible
  document.body.style.visibility = "visible";
  // Log error
  storeError(e);
  log(e, "Error");
  return false;
});

/**
 * Event listener for unhandled rejections.
 * @function
 * @param {PromiseRejectionEvent} e - The promise rejection event object.
 * @returns {void}
 */
window.addEventListener("unhandledrejection", (e) => {
  // When an unhandled rejection occurs, make the body visible
  document.body.style.visibility = "visible";
  // Log error
  storeError(e);
  log(e, "Error");
});

/**
 * Whether to step through CSV
 * @type {boolean}
 */
let stepThrough = false;

/**
 * Whether to step through config.csv
 * @type {boolean}
 */
let stepThroughConfig = false;

/**
 * Step through starting point
 * @type {number}
 */
let stepThroughFrom = 0;

/**
 * config.csv step through starting point
 * @type {number}
 */
let stepThroughConfigFrom = 0;

/**
 * Step through speed
 * @type {boolean}
 */
let stepThroughSpeed = 5;

/**
 * Whether site is multilngual
 * @type {boolean}
 */
let isMultilingual = false;

/**
 * An array of language names.
 * @type {string[]}
 */
let watm_language_name = [];

/**
 * An array of language class names.
 * @type {string[]}
 */
let watm_language_className = [];

/**
 * An array of language CSV filenames.
 * @type {string[]}
 */
let watm_language_csv_file = [];

/**
 * An array of EZ addons to load.
 * @type {string[]}
 */
let ez_addons = [];

/**
 * The default license checker code.
 * type {string}
 */
let checkCode = "8euj9o9frkj3wz2nqm6xmcp4y1mdy5tp";

/**
 * An array of language being used
 * @type {Object[]}
 */
let languages = [];

/**
 * The current CSV file being processed.
 * @type {string}
 */
let currentCSV = "";

/**
 * The current language being used.
 * @type {string}
 */
let currentLanguage = "";

/**
 * The license key.
 * @type {string}
 */
let license_key = "";

/**
 * Whether to hide the WATM icon.
 * @type {boolean}
 */
let hideWATMIcon = false;

/**
 * Whether to show the WATM overlay.
 * @type {boolean}
 */
let show_watm_overlay = true;

/**
 * Whether to enable the public editor.
 * @type {boolean}
 */
let enable_public_editor = false;

/**
 * Whether to disable caching.
 * @type {boolean}
 */
let do_not_cache = false;

/**
 * Whether to toggle show the language name.
 * @type {boolean}
 */
let toggleShowLangName = true;

/**
 * The short delay.
 * @type {number}
 */
let short_delay = 1;

/**
 * The long delay.
 * @type {number}
 */
let long_delay = 3;

/**
 * The number of scripts that have been loaded.
 * @type {number}
 */
let loadedScripts = 0;

/**
 * Backup on save number
 * @type {number}
 */
let watm_saves_before_backup = 20;

/**
 * An array of required scripts.
 * @constant {string[]}
 */
const requiredScripts = [
  "jspreadsheet.js",
  "jsuites.js",
  "functions.js",
  "inspector.js",
  "csv-parser.js",
  "color-thief.js",
  "popper.js",
  "tippy.js",
];

/**
 * An array of required stylesheets.
 * @constant {string[]}
 */
const requiredStyles = [
  `${watm_location}/css/${watm_styles}.css`,
  `${watm_location}/css/jspreadsheet.css`,
  `${watm_location}/css/jsuites.css`,
];

/**
 * Waits for the DOM to be ready before loading scripts.
 * @function
 * @param {Event} event - The DOMContentLoaded event object.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", (event) => {
  loadScripts();
});

/**
 * Loads the required scripts.
 * @function
 * @returns {void}
 */
const loadScripts = () => {
  const scriptList = requiredScripts.concat(ez_addons);

  /**
   * Defines a callback function that loads the next script or checks the license.
   * @function
   * @returns {void}
   */
  const callback =
    loadedScripts < scriptList.length - 1 ? loadScripts : checkLicense;

  const head = document.head;
  const script = document.createElement("script");
  script.type = "text/javascript";

  // Check if the script is an addon or a regular script
  if (scriptList[loadedScripts].indexOf(".js") === -1) {
    // Load the script as an addon
    script.src = `${watm_location}/ez-addons/${scriptList[loadedScripts]}.js`;
  } else {
    // Load the script as a regular script
    script.src = `${
      scriptList[loadedScripts].includes("http")
        ? ""
        : watm_location + "/scripts/"
    }${scriptList[loadedScripts]}`;
  }

  // Call the callback when the script is loaded
  script.onreadystatechange = callback;
  script.onload = callback;

  // Increment the counter for loaded scripts
  loadedScripts++;

  // Add the script to the head of the document
  head.appendChild(script);
};

/**
 * Starts the WATM script with the provided license key.
 * @function
 * @param {string} license - The license key.
 * @returns {void}
 */
const start = (license) => {
  // Check if we're in production mode
  const textManagerProductionMode = !isInEditMode();

  // Creates and adds preconnect links for Google Fonts to the head of the document, then loads the required stylesheets
  const googlePreconnect1 = document.createElement("link");
  const googlePreconnect2 = document.createElement("link");
  googlePreconnect1.href = "https://fonts.googleapis.com";
  googlePreconnect2.href = "https://fonts.gstatic.com";
  googlePreconnect1.setAttribute("rel", "preconnect");
  googlePreconnect2.setAttribute("rel", "preconnect");
  googlePreconnect2.setAttribute("crossorigin", "true");
  document.head.appendChild(googlePreconnect1);
  document.head.appendChild(googlePreconnect2);

  // Load the required stylesheets
  loadCSS(requiredStyles);

  // Log a message indicating whether we're in production or development mode
  if (textManagerProductionMode) {
    console.log(
      `Wild Apricot Text Manager ${watm_version} loaded in production mode`
    );
    document.body.style.visibility = "hidden";
  } else {
    console.log(
      `Wild Apricot Text Manager ${watm_version} loaded in development mode`
    );
  }

  // Check the license
  if (license !== "invalid") {
    // Check if the site is multilingual
    if (
      typeof watm_language_name !== "undefined" &&
      watm_language_name.length > 0
    ) {
      // Set the site as multilingual
      isMultilingual = true;
      // Loop through the language arrays and create an array of language objects
      watm_language_name.forEach((value, index) => {
        // Set the current language label
        const label = value;

        // Set the current language class name
        const className = watm_language_className[index]
          ? watm_language_className[index]
          : value.toLowerCase();

        // Set the current language CSV filename
        const filename = watm_language_csv_file[index]
          ? watm_language_csv_file[index]
          : `${className}.csv`;

        // Push the values to the languages array
        languages.push({ label, className, filename });
      });

      // Get the current language
      currentLanguage = getCurrentLanguage(languages);

      // Set the default language if no language is selected
      currentLanguage =
        currentLanguage === "Default" ||
        currentLanguage === null ||
        currentLanguage === ""
          ? languages[0].className
          : currentLanguage;

      // Create the language toggle
      const elmId =
        typeof languageSwitcherId !== "undefined"
          ? languageSwitcherId
          : "language_switch";

      // Show the language toggle if not disabled and we're in production mode
      if (
        (typeof showLanguageSwitch === "undefined" ||
          showLanguageSwitch !== false) &&
        textManagerProductionMode
      ) {
        createToggle(
          languages,
          toggleShowLangName ? currentLanguage : "",
          elmId
        );
      }
    } else {
      // The site is not multilingual
      isMultilingual = false;
    }

    /**
     * The language callback function that loads the selected language CSV file, processes each row in the CSV file, and runs the EZ-Addons.
     * @function
     * @returns {void}
     */
    const languageCallback = () => {
      // Load the selected language CSV
      if (currentCSV) {
        Papa.parse(
          `${watm_location}/translations/${currentCSV}${
            do_not_cache === true
              ? `?time=${Math.round(Date.now() / 1000)}`
              : ""
          }`,
          {
            download: true,
            header: true,
            skipEmptyLines: "greedy",
            complete: async (results) => {
              try {
                // Loop through the rows in the CSV file and process each one
                for (
                  let lineNumber = 0;
                  lineNumber < results.data.length;
                  lineNumber++
                ) {
                  const row = results.data[lineNumber];

                  // Wrap safeExecute in an async function to allow using await with setTimeout
                  await new Promise((resolve) => {
                    setTimeout(
                      () => {
                        if (stepThrough === true) {
                          console.log(
                            `${currentCSV} Line: #${lineNumber} | Function: ${row["Function"]}`
                          );
                        }
                        continueProcess = safeExecute(
                          process,
                          row,
                          lineNumber,
                          currentCSV
                        );
                        resolve();
                      },
                      stepThrough === true && lineNumber >= stepThroughFrom
                        ? stepThroughSpeed * 1000
                        : 0
                    );
                  });

                  if (continueProcess === false) {
                    break;
                  }

                  // Throw an error if we're in trial mode and we've exceeded the line limit
                  if (license == "trial" && lineNumber > 10) {
                    throw "Trial Mode";
                  }
                }
              } catch (e) {
                // Handle the error by logging an appropriate message
                if (e == "Trial Mode") {
                  log(
                    `Trial only permits loading first 10 lines of ${currentCSV}`,
                    "Trial Mode"
                  );
                } else {
                  log(e, "Error");
                }
              }

              // Run the EZ-Addons
              ez_addons.forEach((ezaddon) =>
                eval(`${ezaddon.replace(/-/g, "_")}();`)
              );
            },
            error: () => {
              // Handle the error by logging an appropriate message
              storeError(`"${currentCSV}" not found`);
              log(`"${currentCSV}" not found`, "Error");
            },
          }
        );
      }
    };

    // Load the default config file
    Papa.parse(
      `${watm_location}/config.csv${
        do_not_cache === true ? `?time=${Math.round(Date.now() / 1000)}` : ""
      }`,
      {
        download: true,
        header: true,
        skipEmptyLines: "greedy",
        error: function (err) {
          storeError(`"config.csv" not found`);
          log(`"config.csv" not found`, "Error");
        },
        complete: async (results) => {
          try {
            // Loop through the rows in the CSV file and process each one
            for (
              let lineNumber = 0;
              lineNumber < results.data.length;
              lineNumber++
            ) {
              const row = results.data[lineNumber];

              // Wrap safeExecute in an async function to allow using await with setTimeout
              await new Promise((resolve) => {
                setTimeout(
                  () => {
                    if (stepThrough === true) {
                      console.log(
                        `config.csv Line: #${lineNumber} | Function: ${row["Function"]}`
                      );
                    }
                    continueProcess = safeExecute(
                      process,
                      row,
                      lineNumber,
                      "config.csv"
                    );
                    resolve();
                  },
                  stepThroughConfig === true &&
                    lineNumber >= stepThroughConfigFrom
                    ? stepThroughSpeed * 1000
                    : 0
                );
              });

              if (continueProcess === false) {
                break;
              }

              // Throw an error if we're in trial mode and we've exceeded the line limit
              if (license == "trial" && lineNumber > 10) {
                throw "Trial Mode";
              }
            }
          } catch (e) {
            // Handle the error by logging an appropriate message
            if (e == "Trial Mode") {
              log(
                `Trial only permits loading first 10 lines of config.csv`,
                "Trial Mode"
              );
            } else {
              storeError(e);
              log(e, "Error");
            }
          }

          // Call the language callback
          languageCallback();
        },
      }
    );

    // Routines for multilanguage site
    if (isMultilingual && textManagerProductionMode) {
      // Check for language toggle keyword in URL
      if (window.location.href.indexOf("?watm-") > -1) {
        languages.forEach((language, index) => {
          if (
            window.location.href.indexOf(`?watm-${language.className}`) > -1
          ) {
            // Set language cookie
            setLanguage(language.className);
          }
        });
      }

      // Add the current language class to the body
      document.body.classList.add(`${currentLanguage}-lang`);

      // Log a message indicating which translation we're currently using
      log(`Currently using ${currentLanguage} translation`);

      // Hide the classes for unselected languages
      languages.forEach((language, index) => {
        if (language.className !== currentLanguage) {
          document.querySelectorAll(`.${language.className}`).forEach((el) => {
            el.style.display = "none";
          });
        } else {
          // Set the current language CSV
          currentCSV = language.filename;
        }
      });
    }

    /**
     * Shows the WATM icon if we're not in development mode and if either the admin switcher is present or the public editor is enabled and we're not in edit mode.
     * @function
     * @param {string} license - The license key.
     * @returns {void}
     */
    const showWATMIcon = (license) => {
      if (window.location.href.indexOf("?dev") == -1) {
        // Append the WATM button if we're not in dev mode
        appendWATMBtn(
          license,
          !!document.getElementById("idWaAdminSwitcher") ||
            (enable_public_editor && !isInEditMode())
        );
      }
    };

    // Show the WATM icon if it's not hidden
    if (!hideWATMIcon) {
      showWATMIcon(license);
    }

    // Make the body visible if we're not in the language toggle URL
    if (window.location.href.indexOf("?watm-") == -1) {
      document.body.style.visibility = "visible";
    }

    // Launch the inspector if we're in dev mode
    if (
      window.location.href.indexOf("?dev") > -1 &&
      (!!document.getElementById("idWaAdminSwitcher") ||
        (enable_public_editor && !isInEditMode())) &&
      license !== "invalid"
    ) {
      launchInspector(languages, watm_location);
    }
  }
};
