const flankingElementText = "↓"

const header = document.querySelector(".updates h2")
const textbox = document.querySelector("#new")

// wait for textbox font to be loaded
const textboxStyle = getComputedStyle(textbox)
const fontSpec = textboxStyle.fontSize + " " + textboxStyle.fontFamily
document.fonts.load(fontSpec).then((fontFaceSet) => {
	function addFlankingElements(element, text) {
		const beforeElement = document.createElement("span")
		const beforeElementContent = document.createTextNode(text)
		beforeElement.style.padding = "0 2em"

		beforeElement.appendChild(beforeElementContent)
		element.insertBefore(beforeElement, textbox)
		const afterElement = beforeElement.cloneNode(true)
		element.appendChild(afterElement)

		return [beforeElement, afterElement]
	}

	function resizeHeader(padding) {
		var headerWidth = header.getBoundingClientRect().width
		var maxNewText = Math.floor((headerWidth - padding) / textWidthWithWhitepace)

		var underflow = (maxNewText <= 0)
		if (underflow) {
			textbox.textContent = ""

		} else {
			// prevent appending an extra whitespace to the end of the string
			var textMaxRepeat = text.concat(" ").repeat(maxNewText - 1)
			textMaxRepeat = textMaxRepeat.concat(text)

			textbox.textContent = textMaxRepeat
		}
	}


	if (textbox) {
		var text = textbox.textContent
		var textWidth = textbox.getBoundingClientRect().width
		textbox.textContent += " ".concat(text)
		var textWidthWithWhitepace = textbox.getBoundingClientRect().width - textWidth

		var beforeText = addFlankingElements(header, flankingElementText)[0]
		// account for how big the flanking elements are
		var headerPadding = beforeText.getBoundingClientRect().width * 2

		resizeHeader(headerPadding)
		window.onresize = resizeHeader.bind("padding", headerPadding)
	}
});
