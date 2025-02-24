- [About the EZ WildApricot Web Designer](#about-the-ez-wildapricot-web-designer)
- [Installation](#installation)
  - [Files Setup](#files-setup)
  - [JavaScript whitelisting](#javascript-whitelisting)
  - [Adding the install script](#adding-the-install-script)
    - [Multilingual Script Setup](#multilingual-script-setup)
    - [Recommended Language Class Names](#recommended-language-class-names)
    - [Extra Install Script Options](#extra-install-script-options)
      - [Enable the Inspector \& Editor without Being Logged in as an Admin](#enable-the-inspector--editor-without-being-logged-in-as-an-admin)
      - [Hiding the EZ WildApricot Web Designer Icon](#hiding-the-ez-wildapricot-web-designer-icon)
      - [Automatic CSV Backups](#automatic-csv-backups)
      - [Installing EZ Add-ons](#installing-ez-add-ons)
- [Switching and Maintaining Languages](#switching-and-maintaining-languages)
  - [Using the Language Toggle](#using-the-language-toggle)
  - [Adding translations to content gadgets](#adding-translations-to-content-gadgets)
  - [Using the Language Switch Hook](#using-the-language-switch-hook)
- [Using the Inspector \& Editor](#using-the-inspector--editor)
  - [Inspector](#inspector)
  - [Editor](#editor)
    - [What's in the Configuration File?](#whats-in-the-configuration-file)
      - [Wild Apricot Reference](#wild-apricot-reference)
      - [Default Text](#default-text)
      - [Replacement Text](#replacement-text)
      - [Function](#function)
      - [Query](#query)
      - [Style](#style)
      - [Notes](#notes)
  - [The Error Log](#the-error-log)
  - [Debugging the configuration or translation files by "stepping through"](#debugging-the-configuration-or-translation-files-by-stepping-through)
- [EZ WildApricot Web Designer Functions](#ez-wildapricot-web-designer-functions)
  - [**text**](#text)
  - [**replace**](#replace)
  - [**replace\_element**](#replace_element)
  - [**shortdelay**](#shortdelay)
  - [**longdelay**](#longdelay)
  - [**button**](#button)
  - [**delaybutton**](#delaybutton)
  - [**inactive**](#inactive)
  - [**hide**](#hide)
  - [**placeholder**](#placeholder)
  - [**attribute**](#attribute)
  - [**@media**](#media)
  - [**link**](#link)
  - [**createlink**](#createlink)
  - [**source**](#source)
  - [**tooltip**](#tooltip)
  - [**googlefont**](#googlefont)
- [Using EZ WildApricot Web Designer with WildApricot iframe Widgets](#using-ez-wildapricot-web-designer-with-wildapricot-iframe-widgets)
- [EZ Add-Ons](#ez-add-ons)
  - [Language Add-On](#language-add-on)
  - [FontAwesome Add-On](#fontawesome-add-on)
  - [EZ-Notice Add-On](#ez-notice-add-on)
  - [EZ-Toggle Add-On](#ez-toggle-add-on)
  - [EZ-Tabs Add-on](#ez-tabs-add-on)
  - [EZ-Library Add-On](#ez-library-add-on)
  - [EZ-Terms Add-On](#ez-terms-add-on)
- [Browser Requirements](#browser-requirements)
- [Third-party open-source modules in use by EZ WildApricot Web Designer](#third-party-open-source-modules-in-use-by-ez-wildapricot-web-designer)

# About the EZ WildApricot Web Designer

[EZ WildApricot Web Designer](https://newpathconsulting.com/watm) \(aka WATM\), has been redesigned from scratch for version 2. The product has been rewritten in JavaScript (ECMAScript 6) and no longer needs jQuery to operate.

EZ WildApricot Web Designer will help any administrator change, replace or translate e nearly every piece of hard-coded and configurable text in WildApricot. It also contains several "add-ons" that can add new content gadgets and content styling features for your WildApricot website.

You can make a variety of single page, whole site, and WildApricot content changes such as:

- search and replace of a particular text string
- modify field labels on forms, button labels
- change hard-coded text, errors, and warnings
- hide text on any user interface items
- enable multi-lingual support on your website so it can be read in an unlimited number of languages

EZ WildApricot Web Designer module can be used to make WildApricot sites available in two or more languages by dynamically replacing content gadgets and hard-coded strings with a translations. The translations are all stored in CSV files in the WildApricot File Manager and can be edited using a visual inspector and editor as well.

---

# Installation

## Files Setup

1. Follow these [instructions to connect to your WildApricot file folder](https://gethelp.wildapricot.com/en/articles/198-uploading-and-downloading-files-using-webdav) or go to the Website -> Files manager.
2. Unzip the downloaded zip file and upload the contents of folder `WildApricotTextManager` into /Theme/WildApricotTextManager. Note you will need to make the necessary subfolders manually in the Files manager in WildApricot as you cannot upload a full folder with subfolders at one time. You can upload multiple files into each subfolder at one time in the Files manager.
3. If you are setting up a multilingual site:

- Add a Content Gadget to your page template in the location you would like the language toggle to appear. Set the ID of this gadget to `language_switch`
- Create a separate CSV for each language you need in the `translations` folder.

The configuration and translation files must be saved as a CSV file format in UTF-8 format.

## JavaScript whitelisting

WildApricot has implemented a [Content Security Policy (CSP)](https://en.wikipedia.org/wiki/Content_Security_Policy) to provide additional protection against data theft, site defacement, malware, and more. CSP works by detecting if custom code is being called from an external URL and then comparing those URLs against a whitelist of verified and approved websites. If the external URL being used is not on the whitelist, the code is then blocked from running. EZ WildApricot Web Designer requires access to certain external URLs in order to function correctly, so these URLs will need to be added to the whitelist. To view and manage your whitelist, navigate to the "Settings" screen from the Website module in the WildApricot administrative system

![domain whitelist menu](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/domain-whitelist-menu.jpg?raw=true)

**Adding EZ WildApricot Web Designer URLs to the JavaScript whitelist**

Under the Wild Apricot Website settings section "JavaScript whitelist", you must add manually URLs used by EZ WildApricot Webs Designer. This is what the custom domain whitelist will look like once you add all core and add-on required domains.

![domain whitelist custom domains](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/domain-whitelist-custom-domains.jpg?raw=true)

The following is a list of all the external URLs currently being implemented by EZ WildApricot Web Designer and can be added manually:

**Core Plugin**

- hook.us1.make.com

**EZ Add-Ons**

- \*.fontawesome.com

## Adding the install script

1. In WildApricot Admin, navigate to Settings -&gt; Site -&gt; Global JavaScript. More details on inserting JavaScript into WildApricot are available in the [WildApricot Documentation](https://gethelp.wildapricot.com/en/articles/212-inserting-and-modifying-html-or-javascript#javascript).
2. Copy and paste the following lines to the Global JavaScript.

NOTE: this code snippet assumes you have uploaded all files into the folder `/resources/Theme/WildApricotTextManager`

```html
<script src="/resources/Theme/WildApricotTextManager/wildapricot-textmanager.js"></script>
<script>
  /*  Add your license key between the "" on the license_key variable.
    To use a trial version that executes first 10 lines
    omit the license key.
*/

  license_key = "";
  watm_saves_before_backup = 20; // number of saves before backup is made, set to 0 to turn off automatic backups
</script>
```

3.  Enter your license key in the quotes `""` to apply your license.

NOTE: to use the development license key database add this to the `<script>` tag:

```html
checkCode = "4suuck1up58qja9qfcqyosyhni63jwsn";
```

### Multilingual Script Setup

If you want to configure multi-lingual support use this install script instead:

```html
<script src="/resources/Theme/WildApricotTextManager/wildapricot-textmanager.js"></script>
<script>
  license_key = "";

  /*
   Array of available languages
   Can omit if site is not multilingual
   Use "watm_language_name" to assign the language name displayed to the user
   Use "watm_language_className" to assign the language slug used on your site
 */

  // Default language
  watm_language_name[0] = "English";
  // watm_language_csv_file[0] will default to english.csv
  watm_language_className[0] = "english";

  watm_language_name[1] = "Français";
  // watm_language_csv_file[1] will default to french.csv
  watm_language_className[1] = "french";

  watm_language_name[2] = "Español";
  // watm_language_csv_file[2] will default to spanish.csv
  watm_language_className[2] = "spanish";

  watm_language_name[3] = "日本語";
  // watm_language_csv_file[3] will default to japanese.csv
  watm_language_className[3] = "japanese";
</script>
```

### Recommended Language Class Names

This is the list of recommended class names for each language. If you use these class names in the watm_language_className assignments in the script above, the browser's default language will automatically switch the website into the language selected by the user.

```
arabic
bengali
bulgarian
chinese
croatian
czech
danish
dutch
english
estonian
filipino
finnish
french
german
hebrew
hindi
hungarian
indonesian
italian
japanese
korean
latvian
lithuanian
macedonian
malay
norwegian
persian
polish
portuguese
romanian
russian
serbian
slovak
slovenian
spanish
swedish
thai
turkish
ukrainian
vietnamese
```

### Extra Install Script Options

#### Enable the Inspector & Editor without Being Logged in as an Admin

By default, the Inspector & Editor can be used only when logged in as an administrator to the WildApricot Admin view. If you'd like to be able to view the Inspector & Editor without being logged in to the Admin view, add this line in the install script

`enable_public_editor = true;`

To save any changes you make while in this mode, you will need to provide an administrative username/password during the first save.

#### Hiding the EZ WildApricot Web Designer Icon

By default the EZ WildApricot Web Designer icon appears in the bottom left corner of all pages even if you are not logged in as an admin. In this mode, clicking on the icon will _not_ bring up the Inspector.

To hide the EZ WildApricot Web Designer icon add this line to the install script:

`hideWATMIcon = true;`

#### Automatic CSV Backups

By default the EZ WildApricot Web Designer will backup the previous version of your CSV file on every 20th save. You will find the configuration file backups in the corresponding folder (`WildApricotTextManager` folder for `config.csv`, and `translations` subfolder for the language specific CSVs). Backup files have the same name as the original CSV file appended with the date and time of the backup.

You can turn off automatic backups or adjust how many saves are made before a backup is created by adding the following to the install script:

```javascript
watm_saves_before_backup = 5; // set to desired number, or to 0 to turn off automatic backups
```

#### Installing EZ Add-ons

To install an EZ add-on, place the add-on file into the `ez-addons` folder. Next, add the following code to the install script:

```javascript
ez_addons = [];
watm_language_name[0] = "English";
```

Within the square brackets, add type the name of the add-ons within quotes. Separate multiple add-ons with a comma, with each add-on name within their own quotation marks. The add-ons should be already installed in the add-ons folder.

---

# Switching and Maintaining Languages

## Using the Language Toggle

EZ WildApricot Web Designer provides an easy to install toggle for switching between the various languages on your site. To add it to your site, simply add a Content Gadget to your page template in the location you would like the toggle to appear. Set the ID of this gadget to `language_switch`. This gadget will now be replaced with the language toggle when viewed from the frontend.

## Adding translations to content gadgets

There are 2 categories of text that can be translated in WildApricot:

- text and images placed on pages or page templates using WildApricot's Content Gadget
- hard coded text that appears in other WildApricot dynamic gadgets such as the name of pages in a menu bar, membership applications and membership directories.

EZ WildApricot Web Designer can translate both types of content.

To translate a content gadget you simple must add the language class name (eg "english" or "french") to the class settings of the gadget. The assigned class(es) are found in the "Advanced" settings on every content gadget added to a page or page template.

![setting class name for for content gadgets](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/advanced-setting-content-gadget.png?raw=true)

Translating the hard coded text in WildApricot dynamic gadgets requires identifying the CSS ID or CSS Path and targeting each element with an appropriate translation. There are hundreds of pieces of hard coded text throughout a WildApricot site. Thankfully NewPath has identified the hard coded elements and offers a translation file for hard coded elements in multiple languages with [WildApricot Translation Support Service & Training](https://newpathconsulting.com/wild-apricot-translation-support/).

## Using the Language Switch Hook

You are not limited to using the EZ WildApricot Web Designer Language Toggle. You can create your own buttons, links, or menu items for switching the language. To switch language, you would link to `?watm-<language>` where `<language>` is the class name for the language you wish to use from the script setup. Note, there is no slash in this link - you are linking to the current page, and appending the language hook to it.

**EXAMPLE:**

```html
<a href="?watm-french">Cette page est également disponible en français</a>
```

---

# Using the Inspector & Editor

Using the Inspector & Editor, you can use to view the styling and targeting information of the various elements on your website, as well as make modifications to your EZ WildApricot Web Designer configuration files. This information is necessary when updating your configuration and translation files.

When logged in as a WildApricot administrator, an icon will appear at the bottom-left of the browser window. You can move the location of the icon by right clicking on it to move it to the bottom-right of the browser window, and right clicking again will move it back to the bottom-left.

To launch the EZ WildApricot inspector and editor click on the icon. While in Editor mode, you will not be able to follow any links on the web page. Instead you will be able to hover over every element on the web page to inspect it for modification.

When you hover over an element a red outline will appear around the element ready for inspection. Click on the element to open the inspector.

Click the `Exit Editor` button in the inspector to return to normal browsing.

## Inspector

The top half of the panel that appears is the Inspector. Clicking on the element will display the element's CSS Class (if a class has been set), as well as the CSS Path to the element.

The `Copy Element Class` (if available), `Copy Parent ID` and `Copy CSS Path` buttons will copy the related information to the clipboard. CSS Path is always more specific and usually the most specific and ideal Query to use to target the element. The CSS Parent ID targets the top level ID of the selected element, and this selector is more generic than the CSS Path but it still targets one element on the page. The CSS Parent ID will not have any descendent sub elements, so if you believe the structure or order of the elements may change in the ID, the CSS Parent ID may be more ideal to target. Using the CSS Element Class can have unintended consequences on other elements that share the same CSS Class, but sometimes using a CSS Class is a good fallback if the CSS Path or CSS Parent ID is not working to alter the targeted element.

The CSS Path, CSS Parent ID or CSS Element Class must be placed into the Query column in the Editor to "target" the element you wish to modify with one of the [functions](#ez-wildapricot-web-designer-functions) available in EZ WildApricot Web Designer.

_COMPATIBILITY NOTE:_ The Copy Element Class, Copy Parent ID and Copy CSS Path buttons only work on secure (https) websites. If your website is running insecurely, we recommend adding a [free SSL certificate to your custom domain](https://gethelp.wildapricot.com/en/articles/555).

The `View Properties` button will display the details about that element, such as the text it contains, styling, and any resource links. If you target an image with the inspector tool, the View Properties tab will show the primary colors of that image and the related hexadecimal color codes.

The `View Error Log` button will open a new window and display any errors that have been encountered in the currently loaded configuration file (config.csv, english.csv or language.csv).

---

## Editor

The bottom half of the panel displays the configuration file Editor. In the editor you can select the file you wish to update from the dropdown. Selecting the file will automatically load the configuration file editor. You can resize the columns as needed by dragging on the divider on the right hand side of the panel. You can also drag the rows to rearrange them. Right clicking on a row will give you the options to create and delete rows, and download the currently saved configuration file

Once you are finished making your changes, save the file back to your website by clicking on `Save changes to site`. You will need to authenticate once with your full administrator WildApricot accounts.

If you choose to download the configuration file and edit it outside of the Inspector, the changes will be applied only when you manually upload the configuration file. The configuration file is a comma-separated file that can be edited in any spreadsheet. If you decide to edit in a spreadsheet, ensure you save in UTF-8 format to preserve any international characters.

When you use the Inspector to save the configuration file, the current page will automatically refresh, and your changes should be immediately visible. If you don't see your changes, you may need to do a hard refresh of your site to see the changes. To do this, exit the inspector/editor and press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> on PC or <kbd>Option</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> on Mac. You may need to do this for each language enabled on your site.

Note: When the EZ WildApricot Designer runs through the configuration files the header (row 1) of each file must match the names in the editor. If there is an inconsistency an error will be recorded in the error console.

### What's in the Configuration File?

The following columns of data are available in the editor:

![ez editor user interface](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-editor.png?raw=true)

#### Wild Apricot Reference

This is an optional field can be used to group various lines together. It is not used by the software in anyway, and any information placed in this column is for user reference only.

#### Default Text

This is an optional field can be used to define a string to search for the in the content when using the `replace`, `replace_element`, `shortdelay`, `longdelay`, `attribute` and `createlink` functions. Not all functions use this field, and this field is ignored for those functions during processing of the configuration file.

#### Replacement Text

This field is used as the replacement text for functions that use this field like `replace` and `replace_element`. In some cases this field is used to specify input into a function like `createlink`.

#### Function

This is an optional field that specifies what function to call when processing a configuration file. If this field is empty, then the Query field and Style field will be used to apply a style to an element of the page.

The [functions are all defined](#ez-wildapricot-web-designer-functions) in this README file.

#### Query

This field is a required field that specifies which CSS ID, CSS Class or CSS Path is to be targeted when processing the current configuration line. It can be obtained a variety of ways, but the easiest is to click on an element while using the Inspector. You can hover over a field, label, button or just about any pixel on a page and retrieve the CSS Path and/or CSS class that has been highlighted.

It is important to understand that a particular element can be targeted using different ways. Based on experience of using this product we recommend the following preference when choosing how to target an element:

- if an ID is available for an element, use the ID directly (eg #ElementID)
- if a CSS Path is available for an element, use the Parent ID of the CSS Path (eg for CSS Path `#ElementID > div > table > nth-child` the Parent ID is `#ElementID`)
- use the CSS Path directly (eg `#ElementID > div > table > nth-child`)
- use the CSS class (eg `.aClassName`)

A CSS class could be used when styling various parts of a site, so use classes as sparingly as possible _unless_ you specifically wish to apply a change on a sitewide basis where ever the CSS class is used.

The Query field also can accept a comma-delimited list of IDs, CSS Paths and CSS classes. This can be useful when translating or modifying a set of values in multiple places on a website. A good example if a list of Month names to be translated into another language can be stored as 12 lines in a file. The query field could then contain a list of IDs, Paths or classes that need to be changed (eg #ElementID, #AnotherElementID, .aCSSClass)

#### Style

This is an optional field that can be used to apply a set of CSS properties and values to a targeted element. You can see a list of existing properties applied to an element by clicking the View Properties button when an element has been selected in the Inspector. CSS Properties are formatted as `property: value`. An example CSS property is `background-color: red;`. Multiple properties can be set by delimiting the property/value pair with a `;` (eg `background-color: red; font-size: 18px;`)

The style column can be used in conjunction with a function, or on its own.

**EXAMPLE:**

```text
Query: h3
Style: color: blue;font-style: italic
```

#### Notes

This is an optional field that is updated automatically when a line is updated with a current date and time. You can put notes into this field, but note that if a configuration row is updated his field is overwritten with the current date and time of the change to help you keep track of which rows have been modified and when.

## The Error Log

As EZ WildApricot Web Designer parses each configuration file it may encounter an error while processing a configuration row. If it does encounter an error, the error will be logged into the Error Log, and EZ WildApricot Web Designer willproceed to process the next configuration row in the configuration line. The configuration row with the error will not be processed until the error has been resolved.

The `View Error Log` button in the inspector opens the error log and displays the error message, timestamp and the ability to delete the error from the log. The error message will contain information about which line created an error and the error message. Currently correctly-formatted CSS Paths or CSS Element IDs that are not found on the page will _not_ be logged as errors, as they will be simply skipped.

Note that blank lines in the configuration files are not counted and may throw off the line counter in the error message. It is recommended that configuration files have no empty lines to ensure any error messages point to the correct line number.

You can clear the error log by clicking `Clear All Errors` button.

## Debugging the configuration or translation files by "stepping through"

You can debug the processing of the config.csv or the language.csv files by enabling a step-though debugger in EZ WildApricot Web Designer.

To enable the debugger add these lines to the EZ WildApricot Web Designer install JavaScript:

```javascript
// Enable step-through debugging of config.csv
stepThroughConfig = true;

//Enable step-though debugging of selected language
stepThrough = true;
```

When step-through debugging is enabled, you can open the development console to view the processing of the config.csv or language.csv files. The console will display what file and line number it is processing, and the EZ WildApricot Web Designer function being processed on that line. It will then pause for 5 seconds and then more to the next line. You can watch the web page to see how the changes are occurring, and see what line in the file may be causing errors.

To change the delay time, add this to the EZ WildApricot Web Designer install JavaScript:

```javascript
// Step-through delay in seconds
stepThroughSpeed = 1;
```

If you want the processing display to start after a certain line in the csv, add this to the EZ WildApricot Web Designer install JavaScript:

```javascript
// Start config.csv step-through at a certain line
stepThroughConfigFrom = 10;

// Start current language step-through at a certain line
stepThroughFrom = 20;
```

---

<<<<<<< HEAD
# Using EZ WildApricot Web Designer with WildApricot iframe Widgets

The EZ WildApricot Web Designer affects any page loaded from a WildApricot website, including the widgets published through the Website Settings. These are implemented as iframes which load the Javascript libary just like any web page. It's best to test the content on a regular WildApricot website before implementing the iframe gadgets to make sure all changes are rendering outside the iframe first.

To reference the widgets in an iframe in a different langauge when mutli-lingual mode is turned on use the ?watm-<language> query parameter on the iframe URL in the `src` parameter of the iframe tag.

Example:

```html
<iframe
  width="800px"
  height="4500px"
  frameborder="no"
  src="https://mysite.wildapricot.org/widget/Sys/Profile/?watm-french"
>
</iframe>
```

The iframe code above Will load the WildApricot profile widget in an iframe and trigger the French version of the profile.

If you omit the ?watm-<language> in the `src` paramater the widget will load in the current language set previously by the language dropdown menu or the previously loaded langauge.

---

=======
>>>>>>> master
# EZ WildApricot Web Designer Functions

When editing the EZ WildApricot Web Designer configuration and translation files, the following functions are available: Each function operates in a specific way to modify, style, hide or translate parts of your website.

## **text**

> Changes the text in targeted element(s), note that any links are eliminated in the targeted element(s). Note that the Default Text is empty (and ignored if filled) when using the text function.

**EXAMPLE:**

```text
Function: text
Replacement Text: Change my password!
Query: .loginBoxChangePassword
```

## **replace**

> Finds and replaces specific text in targeted element(s). Note that the Default Text must match the text that is being replaced. The search is done without case sensitivity.

**EXAMPLE:**

```text
Default Text: Home
Function: replace
Replacement Text: Accueil
Query: .menuInner, .WaGadgetBreadcrumbs > div > ul > li
```

## **replace_element**

> Finds the element(s) containing the specific text and replaces all the text in that element with the Replacement Text. The search is done without case sensitivity.

**EXAMPLE:**

```text
Default Text: Our Address
Function: replace_element
Replacement Text: Our offices are currently closed for renovations purposes.
Query: .menuInner, .WaGadgetBreadcrumbs > div > ul > li
```

## **shortdelay**

> Changes the text in targeted element(s) after **n** second - used for dynamically generated elements, such as a member directory. Note that the Default Text must match the text that is being replaced. The search is done without case sensitivity. Default delay time is one second, and you can customize this by adding the following to the JavaScript configuration:

```html
short_delay = 1;
```

`shortdelay` function will trigger the `replace` function after a **_n_** second delay if "Default Text" is present (otherwise it triggers `text` function).

**EXAMPLE:**

```text
Default Text: Home
Replacement Text: Coordonnées
Function: shortdelay
Query: #membersTable > thead > tr > th:nth-child(1)
```

## **longdelay**

> Changes the text in targeted element(s) after **n** second - used for dynamically generated elements, such as a member directory. Note that the Default Text must match the text that is being replaced. The search is done without case sensitivity. Default delay time is three seconds, and you can customize this by adding the following to the JavaScript configuration:

```html
long_delay = 3;
```

`longdelay` function will trigger the `replace` function after a **_n_** second delay if "Default Text" is present (otherwise it triggers `text` function).

**EXAMPLE:**

```text
Default Text: Home
Replacement Text: Coordonnées
Function: longdelay
Query: #membersTable > thead > tr > th:nth-child(1)
```

## **button**

> Changes the text on targeted button(s). Note that the Default Text is empty (and ignored if filled) when using the button function.

**EXAMPLE:**

```text
Replacement Text:  Click here to login
Function: button
Query: .loginButton
```

## **delaybutton**

> Changes the text on targeted button(s), after a 1 second delay, useful for widgets that have a JavaScript rendering delay. Note that the Default Text is empty (and ignored if filled) when using the delaybutton function.

**EXAMPLE:**

```text
Replacement Text:  Click here to login
Function: delaybutton
Query: .loginButton
```

## **inactive**

> Ignores the configuration row. This is useful when troubleshooting an item or you wish to save details in the configuration file, but not activate it.

## **hide**

> Hides the targeted element(s). This is useful when you wish to hide an element altogether. Neither Default Text or Replacement Text fields are necessary or used.

**EXAMPLE:**

```text
Function: hide
Query: #idFooterPoweredByWA
```

## **placeholder**

> Changes the placeholder text of targeted form element(s)

**EXAMPLE:**

```text
Replacement Text: Enter your search keywords here
Function: placeholder
Query: .searchBoxField
```

## **attribute**

> Sets/changes attribute of targeted element(s). Enter attribute name in "Default Text" column, and the attribute value in "Replacement Text"

**EXAMPLE:**

```text
Default Text: target
Replacement Text: _blank
Function: attribute
Query: #id_Footer1 a
```

## **@media**

> Sets a @media CSS Rule. Enter rule name in "Replacement Text" column

**EXAMPLE:**

```text
Replacement Text: screen and (max-width: 900px)
Function: @media
Query: #id_Header2
Stye: display: none;
```

## **link**

> Changes the target link of an existing link. Specifically it changes the `href` URL of targeted element(s). Note that almost always the query must contain the `a` target after the CSS Element Class or CSS Element Path.

**EXAMPLES:**

```text
Replacement Text: /donate
Function: link
Query: .headerDonateBtn a
```

```text
Replacement Text: https://newpathconsulting.com/watm
Function: link
Query: #idFooterPoweredByWA a
```

## **createlink**

> Adds a link to an existing non-linked piece of text

**EXAMPLE:**

```text
Default Text: Some Text String that Needs a Link
Replacement Text: https://newpathconsuling.com
Function: createlink
Query: #someID
```

## **source**

> Changes the `src` URL of targeted element(s). This is useful when changing the iframe src or img src URL to load an alternative image or iframe.

## **tooltip**

> Creates a text popup when mouse is hovered over element

**EXAMPLE:**

```text
Replacement Text: View/Edit Your Profile
Function: tooltip
Query: .loginBoxProfileLink
```

## **googlefont**

> Installs a Google font that can be used throughout other CSS property declarations. Place the font family name to use in the "Replacement Text" field. The font family name can be obtained from the [Google Fonts](https://fonts.google.com/) website

**EXAMPLE:**

```text
Replacement Text: Lobster
Function: googlefont
```

---

# Using EZ WildApricot Web Designer with WildApricot iframe Widgets

The EZ WildApricot Web Designer affects any page loaded from a WildApricot website, including the widgets published through the Website Settings. These are implemented as iframes which load the JavaScript library just like any web page. It's best to test the content on a regular WildApricot website before implementing the iframe gadgets to make sure all changes are rendering outside the iframe first.

To reference the widgets in an iframe in a different language when multilingual mode is turned on use the ?watm-<language> query parameter on the iframe URL in the `src` parameter of the iframe tag.

Example:

```html
<iframe
  width="800px"
  height="4500px"
  frameborder="no"
  src="https://mysite.wildapricot.org/widget/Sys/Profile/?watm-french"
>
</iframe>
```

The iframe code above Will load the WildApricot profile widget in an iframe and trigger the French version of the profile.

If you omit the ?watm-<language> in the `src` parameter the widget will load in the current language set previously by the language dropdown menu or the previously loaded language.

---

# EZ Add-Ons

EZ WildApricot Web Designer includes a number of add-ons that can be used to extend the capabilities of the WildApricot website module. To install an add-on, place the add-on file into the `ez-addons` folder. Next, add the following code to your JavaScript configuration:

```javascript
ez_addons = [];
watm_language_name[0] = "English";
```

Within the square brackets, add type the name of the add-ons within quotes. Separate multiple add-ons with a comma, with each add-on name within their own quotation marks.

For example this will enable all the add-ons:

```javascript
ez_addons = [
  "fontawesome",
  "ez-notice",
  "ez-toggle",
  "ez-tabs",
  "ez-library",
  "ez-language",
];
watm_language_name[0] = "English";
```

## Language Add-On

This add-on will enable you to create event descriptions and online store product descriptions in multiple languages. When the language add on short code is used, the appropriately labeled section of the event title and event description or online store product title and description will show based on the language selection.

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["ez-language"];
watm_language_name[0] = "English";
```

To add multiple language to your event titles and descriptions you can use the

`[ez <languagename>][/ez]`

short codes to surround the content for a particular language.

For example in an event title you can do the following to support english and french event titles:

`[ez english]May 1 2023 Tickets[/ez][ez french]Billets pour le 1er mai 2023[/ez]`

In an event description we recommend to put the short description that shows in an event listing near the top of the event description and put the full event description in a separate set of tags as follows:

![ez language event description](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-admin-event-config.png?raw=true)

When you switch the language the content in the `[ez english]` tag will render, and when you switch to french, the content in the `[ez french]` tag will render.

English event:

![ez language english event on front end](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-full-event-english.png?raw=true)

French event:

![ez language french event on front end](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-full-event-french.png?raw=true)

For online store products, the product title and description can be configured as follows with the `[ez <language>]` tags:

![ez language product title](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-product-title.png?raw=true)

![ez language product description](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-product-description.png?raw=true)

Here's how the online store product shows in English and French on the website:

![ez language product english](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-product-english.png?raw=true)

![ez language product french](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-language-product-french.png?raw=true)

## FontAwesome Add-On

EZ WildApricot Web Designer comes with a free Add-on for FontAwesome, making it easy to insert FontAwesome icons by using macros. To start, [sign up for FontAwesome](https://fontawesome.com/start) and add the provided JavaScript code snippet to your WildApricot Global JavaScript settings.

Here's an example of the code you may add. Make sure the `YOUR_FONTAWESEOME_KIT_ID` is replaced with the actual ID below.

`<script src="https://kit.fontawesome.com/YOUR_FONTAWESEOME_KIT_ID.js" crossorigin="anonymous"></script>`

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["fontawesome"];
watm_language_name[0] = "English";
```

To insert an icon, first [find the name of the icon you wish to use](https://fontawesome.com/search?o=r&m=free&s=solid). Add

`[ez-fa]icon name[/ez-fa]`

to any WildApricot content or headline gadget.

You can copy the name of icon by clicking on the icon and copying the text above the icon:

![fontawsome image name](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/fontawesome-icon-name.png?raw=true)

**EXAMPLE:**

```text
Macro Text: [ez-fa]home[/[ez-fa]
Result: 🏠
```

By default, the FontAwesome macro uses the "Solid" icon styles. To use any of the other styles, add a "style" parameter to the macro:

```
Macro Text: [ez-fa style="regular"]home[/[ez-fa]
```

These styles are currently available in FontAwesome, and some icon sets require a paid subscription:

- **Regular:** [Free Icons](https://fontawesome.com/search?o=r&m=free&s=regular&f=classic) | [All Icons](https://fontawesome.com/search?o=r&s=regular&f=classic)
- **Solid:** [Free Icons](https://fontawesome.com/search?o=r&m=free&s=solid&f=classic) | [All Icons](https://fontawesome.com/search?o=r&s=solid&f=classic)
- **Light:** [All Icons](https://fontawesome.com/search?o=r&s=light&f=sharp%2Cclassic)
- **Thin:** [All Icons](https://fontawesome.com/search?o=r&s=thin&f=classic)
- **Duotone:** [All Icons](https://fontawesome.com/search?o=r&s=duotone&f=classic)
- **Brands:** [Free Icons](https://fontawesome.com/search?o=r&f=brands)

## EZ-Notice Add-On

The EZ-Notice Add-On enables displaying important, colourful messages on your website. Using this macro, any text is be displayed in a colorful box on a WildApricot web page, spanning the width of the layout that contains the macro. It can be used on any WildApricot content page, page template, or system template.

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["ez-notice"];
watm_language_name[0] = "English";
```

![EZ-Notice Add-On Screenshot](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-notice.png?raw=true)

To use the macro, insert your notice text inside the `[ez-notice][/ez-notice]` tags. An optional `color` parameter can decorate the notice. You can use a [color name](https://www.w3schools.com/colors/colors_names.asp) or [HTML color](https://www.w3schools.com/colors/colors_picker.asp) code. EZ-Notice will use your selected color as the text color for the the notice, and automatically set the notice's border and background color to a matching lighter color.

**EXAMPLES:**

```text
Macro Text: [ez-notice]Guild renewal fees are due by January 15th.[/ez-notice]
Macro Text: [ez-notice color="red"]Saturday's potter classes have been cancelled.[/ez-notice]
```

## EZ-Toggle Add-On

The EZ-Toggle Add-On enables expandable and collapsible content sections (also known as "accordions"). Website visitors can click on the section header to open that section and automatically close the other sections on the page. This macro can be used to shorten long content such as a Frequently Asked Questions section.

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["ez-toggle"];
watm_language_name[0] = "English";
```

![EZ-Toggle Add-On Screenshot](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-toggle.png?raw=true)

The macro has two required components. The first is the `title` parameter - use this to specify what the section title should be. Next, place the content for that section within the `[ez-toggle][/ez-toggle]` macro tags. Add a new macro for each section you wish to have. Each section is not required to be placed next to each other and can be located anywhere on the page.

**EXAMPLE:**

```text
Macro Text: [ez-toggle title="How do I join?"]Visit Membership to find and purchase the membership that’s right for you.[/ez-toggle]
Macro Text: [ez-toggle title="Who can be a member?"]Anyone with an interest in our industry may join.[/ez-toggle]
Macro Text: [ez-toggle title="What are the benefits for students?"]We have scholarships students can qualify for.[/ez-toggle]
```

## EZ-Tabs Add-on

The EZ-Tabs Add-On creates a tabbed content area on a page. Website visitors can click on the tabs to switch between different content sections.

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["ez-tabs"];
watm_language_name[0] = "English";
```

![EZ-Tabs Add-on Screenshot](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-tabs.png?raw=true)

The macro has two required components. The first is the `title` parameter - use this to specify what the label on the tab should be. Next, place the content for that tab within the `[ez-tabs][/ez-tabs]` macro tags. Add a new macro for each tab you wish to include.

**EXAMPLE:**

```text
Macro Text: [ez-tabs title="2022 Scholarship Winners"]Khloe Blanchard, Deacon Chang, Aine Kerr[/ez-tabs]
Macro Text: [ez-tabs title="2021 Scholarship Winners"]Ella-Mai Kramer, Tea Mcfarlane, Kaci Rankin[/ez-tabs]
Macro Text: [ez-tabs title="2020 Scholarship Winners"]Jennie Miranda, Carina Myers, Ruby-May Waters[/ez-tabs]
```

## EZ-Library Add-On

The EZ-Library Addon makes it easy to insert a document library into a WildApricot website. The add-on takes care of formatting the presentation of the selected documents, sorting them by title or date, and makes them available for one-click download.

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["ez-library"];
watm_language_name[0] = "English";
```

![EZ-Library Add-On Screenshot with Toggle, Notice and Tabs](https://github.com/NewPath-Consulting/ez-wildapricot-webdesigner/blob/master/readme-images/ez-library.png?raw=true)

NOTE: You can have one ez-library tag inside one custom html gadget. If you'd like to add multiple document libraries on one page (or one or more for each language) make sure you place each ez-library macro text into a separate custom html gadget on the WildApricot website page.

<<<<<<< HEAD
### **USAGE:**
=======
**Using the EZ-Library Add-on**
>>>>>>> master

This add-on comes with two macros that must be used together. The first macro is `[ez-library][/ez-library]` used to configure the library. This macro has three mandatory parameters:

- `folder`: the path to the WildApricot file manager folder containing all the files to be included in the library. This path is relative to the standard "Resources" folder, and the path should not include "Resources". If your documents are located in the "Documents" folder, set the path to "documents". For example, if they are located in a subfolder called "Minutes" inside of the documents folder, set this to "documents/minutes".

- `sort`: specifies how to sort the files. Set this option to "name" to sort by the display name you assign to the documents in ascending order. Set it to "date" to sort by the date you assign to each document in descending order.

- `view`: specifies the layout of the document library. Currently, only one view is available: "list".

- - The "list" view displays the files in a three-column table. The first column contains an image representing the document type, the second column contains the file's display name, and the third column displays the assigned date. Click on the display name to download the file.

The second macro is `[document][/document]` - this is used for each document you wish to include in the library, and must be located within the `[ez-library][/ez-library]` macro. This macro requires two parameters:

- `date`: This is the date you wish to use for this document. The date is used for sorting and is displayed in the library. The date must be formatted as "YYYY-MM-DD".

- `filename`: This is the filename that the file is saved as.

Within the `[document][/document]` macro, enter the display name to use for the document link.

**EXAMPLE:**

Place this into a Custom HTML gadget.

```text
<pre>
    [ez-library folder="documents/minutes" sort="date" view="list"]
      [document date="2014-11-01" filename="minutes Nov. 1 2014.docx"]November 2014 Minutes[/document]
      [document date="2017-04-11" filename="Minutes 11 4 17.pdf"]November 2017 Minutes[/document]
      [document date="2015-11-07" filename="meeting 7 nov 2015.doc"]November 2015 Minutes[/document]
    [/ez-library]
</pre>
```

## EZ-Terms Add-On

The EZ-Terms Addon makes it easy to modify how all terms of service checkboxes work in WildApricot. Instead of blindly checking a checkbox without reading the linked document, this addon prevents the users from checking the box until they click on the terms link and click on the agree button. Clicking on the the terms link will load the terms in a popup modal, keeping them on the same page. The user must scroll to the bottom of the terms to enable the agree button. The checkbox is checked only after the terms of service is read and confirmed it has been read by the user.

To enable this add-on add this line to your configuration script:

```javascript
ez_addons = ["ez-terms"];
watm_language_name[0] = "English";
```

**Using the EZ-Terms Add-on**

This add on changes the default behavior of the checkbox on the terms of service checkboxes on event registration forms and member application/renewal forms. 

When the EZ-Terms addon-on is enabled, you must have a public page set up with the terms added to it. This cannot be a document - the terms must be added directly to this page. WHen setting up the Terms of Use field, be sure to use the URL of that terms page.

On the terms page, add the class name `.terms` in the advanced settings on the page. If you are using the multi-language features, add the class name for the language (for example, `.english` or `.french`) to your content gadget. You can add a new content gadget for each language your site supports.

This is how the Terms of Service settings map to the modal dialog:

| Setting         | Use                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Field label** | This will be used as the title for the terms of service modal                                                                       |
| **Text**        | This is used for the link to open the modal as well as for the text on the agree button                                             |
| **Link**        | This is the URL of the page that contains the terms. The content from the gadget with the `.terms` class will be shown in the modal |

If you translate these texts in the Inspector, they will also be translated in the modal. There are two fixed text strings, however, that cannot be translated:

- The "Cancel" button
- The tooltip when you hover over the agree button that says "Scroll to the bottom to agree"

---

# Browser Requirements

EZ WildApricot Web Designer is supported on the latest versions of Chrome, Safari, Firefox and Edge. Older browsers like Internet Explorer on Windows are supported "best effort," without formal testing or 100% compatibility.

---

# Third-party open-source modules in use by EZ WildApricot Web Designer

The following open-source code libraries are used by this product. All the libraries use the MIT open source license.

<<<<<<< HEAD
0.2 - Added support for many more system flags, added French translation into CSV configuration file, changed testing button toggle label 11/27/18

0.3 - Added support for adding a style, added several more system labels, added support for limiting the language toggle display "flicker" 12/5/18

0.4 - Added support for effective primary menu design changes, added support to override any CSS class or ID 12/13/18

0.5 - Added support for mouseover, mouseout \(hover\) and :before and :after pseudo-elements 1/15/19

0.6 - Added support for SCSS-style variables 1/24/19

0.7 - Now managed in GitHub, fixed issues related to Internet Explorer 11 support in the CSV parser and in the WATM library 2/23/19

0.71 - The WildApricot Text Manger config file is not cached while in testing mode 2/6/20

0.8 - WATM will now automatically enable when it goes into public view in WildApricot, new `attribute` function has been added 6/15/20

0.81 - fixed code typo in wildapricot-textmanager.js due to reformatting 6/29/20

0.82 - added display of WATM version on console log 9/8/20

0.9 - added CSS class/id inspector invoked with `?dev` in URL, added more error/information logging, strip leading/trailing space in "function" field of configuration file 11/20/20

0.91 - Fixed replace_delay function that works for form dropdowns, added "-n" suffix to the `replace-delay` function. For example, `replace-delay-3` will delay for 3 seconds 11/23/20

0.92 - Fixed bug that prevented text containing HTML and links to be changed with replace or replace_element 3/5/2021

0.93 - support for switching languages using embedded WildApricot "widgets" in 3rd party content management system, added a standard French translation file 2/16/22

0.94 - added support for entering/exiting Inspector panel, copy/paste of element ID, class and CSS path in Inspector panel, more options added install script 4/19/2022

0.95 - added support for Inspector Hover mode which shows the outlines of each element on a page when using the Inspector 5/11/2022

0.951 - fixed translations to be rendered for multi-page widgets embedded with a primary and second language 5/17/2022

0.952 - fixed bug on Copy ID button in inspector that adds a # to the id on the clipboard 5/25/2022

0.96 - added showing the selected text of an element, ability to provide alternative text or translation and a drop down for the function, added license checking, trial mode 6/4/2022

2.0b1 - new inspector and configuration file editor, a view properties window including image color picker, support for unlimited languages, easy configuration file upload and preview of changes, rewritten in ECMAScript 6 (no more jQuery!) 8/13/2022

2.0.1 - added a new function for adding a Google font (`googlefont`) and adding a link to a piece of text (`createlink`), added support for cookies to work better 9/8/2022

2.0.2 - bug fixes, minimized french.csv file 9/20/2022

2.0.3 - allow moving of WATM icon to the right or left 10/4/2022

2.0.4 - add [ez-fa] macro for adding FontAwesome glyphs into a WildApricot page 10/6/2022

2.0.5 - added "EZ Macro" add-on architecture, and added [ez-tabs], [ez-notice], [ez-toggle], [ez-library] macros 10/13/2022

2.0.6 - added `delaybutton` function and changed the `delay` function to use `replace` when default text is present 12/06/2023

2.0.7 - changed `delay` to `shortdelay` and `longdelay`, the delays are configurable in the documented Javascript variables 01/04/2023

2.0.8 - NO code changes - README.md updated installation instructions (custom domain before script installation) 02/15/2023

2.0.9 - removed the CSS from install script and added it into the code to ensure no "white screen of death" scenarios if Javascript fails to install 02/18/2023

2.1.0 - added the `replace_element` function for backwards compatibility to pre-v2 WATM/EZ Website Designer versions 04/09/2023
- the EZ license is now checked once per day, rather than on every page load
- if the [web browser's language is set](https://www.computerhope.com/issues/ch001904.htm) EZ WildApricot Web Designer will automatically switch to the language, if available.
- added an error log and a "View Error Log" button to the inspector
- when an error is encountered while parsing the CSV file the error is logged, and parsing continues with the next line
- third-party script files are now included, removing requirement for domain whitelisting
- added instructions on adding translated content gadgets
- added "step through" debugging mechanism to process config and language files line by line with delay

2.1.1 - fixed infinite loop bug that was encountered when the default text contained a substring or the an identical string in the replacement text 07/06/2023

2.1.2 - updated ez-library add on to support multiple library instances in separate custom html content gadgets on the same WA page and in different languages 10/31/2023
- added the Copy Parent ID button to select the ID of the element without the full CSS Path 

2.1.3 - added configurable automatic file backup support of all configuration files
- added check to see if configuration file has the right column headers 04/24/2024
=======
- The inspector's spreadsheet user interface is powered by [Jspreadsheet CE](https://bossanova.uk/jspreadsheet)
- View Properties button features the ability to extract the primary colors used by an image. The [Color Thief](https://lokeshdhakar.com/projects/color-thief/) JavaScript library is used to extract colors of an image.
- Adding tooltips to elements in the UI is handled by [Tippy JS](https://atomiks.github.io/tippyjs/)
- Parsing the CSV configuration files is handled by [Papa Parse](https://www.papaparse.com/)
>>>>>>> master
