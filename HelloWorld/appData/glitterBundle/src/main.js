/**
 * Bottom Sheet
 * @author Windo <herwindo.artono@go-jek.com>
 */
"use strict";
class BottomSheet {
    constructor(id) {
        this.id = id;
        this.el = document.getElementById(id);
        this.scrim = this.el.querySelector(".c-bottom-sheet__scrim");
        this.handle = this.el.querySelector(".c-bottom-sheet__handle");
        this.sheet = this.el.querySelector(".c-bottom-sheet__sheet");
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.scrim.addEventListener("click", this.deactivate);
        this.handle.addEventListener("click", this.deactivate);
        this.addSheetListener=function (element) {
        	var finalY=0
			new TouchDragListener({
				el: element,
				touchStartCallback: ({el, active, initialY, currentY, yOffset}) => {
					bottomSheet.sheet.style.setProperty("transform", `translateY(0)`);
					bottomSheet.sheet.style.setProperty("transition", `unset`);
				},
				touchEndCallback: ({el, active, initialY, currentY, yOffset}) => {
					if(finalY>50){
						bottomSheet.deactivate(finalY);
					}else{
						bottomSheet.sheet.style.setProperty("transform", `translateY(0)`);
					}
					// bottomSheet.sheet.style.setProperty(
					// 	"transition",
					// 	`transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
					// );
					// bottomSheet.sheet.style.setProperty(
					// 	"--translateY",
					// 	`translateY(${bottomSheet.sheet.currentY}px)`
					// );
				},
				touchMoveCallback: ({el, active, initialY, currenty, yOffset}) => {
					var currentY=currenty/2
					finalY=currentY
					console.log('tran--'+initialY+'act--'+currenty)
					if (currentY <= -40) {
						currentY = -41 + currentY / 10;
					} else if (currentY <= -60) {
						currentY = -60;
					} else if (currentY >= 210) {
						bottomSheet.deactivate(currentY);
						return;
					}
					bottomSheet.sheet.style.setProperty(
						"transform",
						`translateY(${currentY}px)`
					);
				}
			});
		}
		// this.sheetListener = new TouchDragListener({
		// 	el: this.sheet,
		// 	touchStartCallback: ({el, active, initialY, currentY, yOffset}) => {
		// 		el.style.setProperty("--translateY", `translateY(0)`);
		// 		el.style.setProperty("transition", `unset`);
		// 	},
		// 	touchEndCallback: ({el, active, initialY, currentY, yOffset}) => {
		// 		el.style.setProperty(
		// 			"transition",
		// 			`transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
		// 		);
		// 		el.style.setProperty(
		// 			"--translateY",
		// 			`translateY(${currentY}px)`
		// 		);
		// 	},
		// 	touchMoveCallback: ({el, active, initialY, currentY, yOffset}) => {
		// 		if (currentY <= -40) {
		// 			currentY = -41 + currentY / 10;
		// 		} else if (currentY <= -60) {
		// 			currentY = -60;
		// 		} else if (currentY >= 210) {
		// 			this.deactivate(currentY);
		// 			return;
		// 		}
		//
		// 		el.style.setProperty(
		// 			"--translateY",
		// 			`translateY(${currentY}px)`
		// 		);
		// 	}
		// });
		//
		// this.scrimListener = new TouchDragListener({
		// 	el: this.scrim,
		// 	touchMoveCallback: ({el, active, initialY, currentY, yOffset}) => {
		// 		if (currentY >= 83) {
		// 			this.deactivate();
		// 			return;
		// 		}
		// 	}
		// });
		this.addSheetListener(this.handle)
    }
    activate() {
        // if (e) e.preventDefault();
        this.el.classList.add("active");
		console.log('finish')
    }
    deactivate(translateY) {
		$('#country-selector').remove()
        if (!translateY) {
            this.sheet.style.setProperty("--translateY", `translateY(201px)`);
        } else {
            this.sheet.style.setProperty(
                "transition",
                `transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
            );
            this.sheet.style.setProperty(
                "--translateY",
                `translateY(${translateY}px)`
            );
        }

        this.el.classList.remove("active");
    }
}




