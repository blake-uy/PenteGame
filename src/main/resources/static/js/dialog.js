/**
 * This is a class for managing a dialog.  This is an example, so it currently
 * only has the ability to display and close.  To make it more useful, you'll need
 * to provide an event handler for the "ok" button that takes the appropriate action, and/or
 * add input elements to the HTML as appropriate.
 */
export class DialogView {
    constructor() {
        this.dialogElement = document.getElementById("dialog");
        this.shadeElement = document.getElementById("shade");

        // Close button
        const closeButton = this.dialogElement.querySelector('#dialog button.close-btn');
        closeButton.addEventListener('click', (e) => this.close(e) );

        // Cancel button
        const cancelButton = this.dialogElement.querySelector('#dialog .cancel-btn');
        cancelButton.addEventListener('click', (e) => this.close(e) );

        // Clicks on the shade will also cause the dialog to close.
        this.shadeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.close(e)
        });
    }

    /**
     * Show the dialog
     */
    show() {
        this.dialogElement.style.display = 'flex';
        this.shadeElement.style.display = 'flex';
    }

    /**
     * Close the dialog
     * @param event the associated Event
     */
    close( event ) {
        this.dialogElement.style.display = 'none';
        this.shadeElement.style.display = 'none';
    }

}
