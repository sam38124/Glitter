"use strict";
class GlAdapter {
    constructor(viewID, size, viewHolder) {
        this.notifyDataSetChange = function () {
            document.getElementById(viewID).innerHTML = ''
            var html = ''
            for (var a = 0; a < size(); a++) {
                html += viewHolder(a)
            }
            document.getElementById(viewID).innerHTML = html
        }
        this.notifyDataSetChange()
    }
}