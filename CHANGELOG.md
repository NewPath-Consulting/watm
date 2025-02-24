# EZ WildApricot Web Designer Release History

0.1 - Initial Release 11/19/18

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

2.0.7 - changed `delay` to `shortdelay` and `longdelay`, the delays are configurable in the documented JavaScript variables 01/04/2023

2.0.8 - NO code changes - README.md updated installation instructions (custom domain before script installation) 02/15/2023

2.0.9 - removed the CSS from install script and added it into the code to ensure no "white screen of death" scenarios if JavaScript fails to install 02/18/2023

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

2.2 - added Table of Contents to README and description of the configuration file columns and how they are used
- added ez-language add-on to support event title/description and online store product title/description translations 08/09/2024

2.2.1 - added ez-terms add-on to improve how Terms of Service checkbox works in WildApricot websites 10/03/2024
