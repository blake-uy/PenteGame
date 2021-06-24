# Starter Code for HTML/JS Client

This is some example starter code for the HTML/JS client.  To test, load the file
`index.html` into a web browser.  Open up the Javascript console to see the results 
of mouse clicks on the board.

This starter code uses ES 6 modules.  This is a now standard and widely used 
framework for dealing with multiple Javascript files in a modular and safe 
way.  However, when loading this type of code in a browser, it is subject 
to the browser's standard "same-origin policy," which requires that all 
code be loaded from the same source.  Therefore, we can't simply open the 
HTML file in a browser using the "Open" option from the file menu.  It considers 
anything that reads from the filesystem directly to be unsafe.  

To get it to load correctly, you need to load it through some web server.  
There are many options here, but these are the two that I think are the most 
accessible for you at this point:

1.  If you're using IntelliJ, click on the icon at the upper right corner of the 
    screen when viewing the HTML file.  That will automatically start a simple web 
    server and load the file in a browser through that server.
1.  If you're not using InteilliJ, run a small server using python.  Execute the 
    following while in the directory containing the HTML file:
    
    ```bash
    python3 -m http.server 8080
    ````

    Then, in a web browser, go to:  http://localhost:8080/index.html

This example uses "raw" Javascript (no special frameworks/libraries), and uses 
ES 6 modules.   It demonstrates how to switch between different main "screens" 
and to display a dialog.  

Suggestion: start by drawing a UML class diagram of the code that is here.
That should help you as you begin to dig into the code.

Feel free to modify this in whatever way you desire.  The intention is to help you
get started.  Let me know if you have any questions, I'm happy to help.

## Resources for learning HTML/CSS/Javascript

* https://www.w3schools.com/js/DEFAULT.asp
* https://www.w3schools.com/html/default.asp
* https://www.w3schools.com/Css/
* https://developer.mozilla.org/en-US/docs/Learn
