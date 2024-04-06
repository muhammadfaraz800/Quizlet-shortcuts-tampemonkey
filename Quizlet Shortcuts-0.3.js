// ==UserScript==
// @name         Quizlet Shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Show all steps with CTRL + Enter and move to next part with Alt + Enter
// @author       Faraz
// @match        https://quizlet.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// Ctrl + Enter to reveal steps (answers) and scroll to the bottom of the page
// Alt + Enter to move to next part
//Changes in v0.3: added timeout of 0.1 s so that the height of page is calculated accurately

(function() {
    'use strict';

    let ctrlPressed = false; // Track Ctrl key state
    let altPressed = false; // Track Alt key state

    // Function to handle keydown events
    const handleKeyDown = (event) => {
        if (event.key === 'Control') {
            ctrlPressed = true; // Set ctrlPressed to true when Ctrl key is pressed
        } else if (event.key === 'Alt') {
            altPressed = true; // Set altPressed to true when Alt key is pressed
        } else if (ctrlPressed && event.key === 'Enter') {
            revealSteps(); // Call revealSteps function when Ctrl + Enter is pressed
        } else if (altPressed && event.key === 'Enter') {
            moveNext(); // Call moveNext function when Alt + Enter is pressed
        }
    };

    // Function to handle keyup events
    const handleKeyUp = (event) => {
        if (event.key === 'Control') {
            ctrlPressed = false; // Set ctrlPressed to false when Ctrl key is released
        } else if (event.key === 'Alt') {
            altPressed = false; // Set altPressed to false when Alt key is released
        }
    };

    // Function to reveal steps (answers) and scroll to the bottom of the page
    const revealSteps = () => {
        const targetButton = document.querySelector('button.AssemblyButtonBase.AssemblyPrimaryButton--default.AssemblyButtonBase--large.AssemblyButtonBase--padding.AssemblyButtonBase--fullWidth[aria-label="Show all steps"]');
        if (targetButton) {
            targetButton.click();
            // Delay scrolling to ensure the page height has adjusted after revealing the answer
            setTimeout(scrollToBottom, 100); // Adjust delay time as needed
        }
    };

    // Function to move to next part
    const moveNext = () => {
        const exerciseLink = document.querySelector('.n5cc71p .NavigationLink--next a');
        if (exerciseLink) {
            exerciseLink.click();
        }
    };

    // Function to scroll to the bottom of the page
    const scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    // Attach event listeners for keydown and keyup events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
})();
