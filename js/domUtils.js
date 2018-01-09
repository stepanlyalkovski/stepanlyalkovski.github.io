
function setElementValue(baseElement, selector, value) {
    let element = baseElement.querySelector(selector);
    element.innerHTML = value;
}

function setElementAttribute(baseElement, selector, attribute, value) {
    if (value == null) {
        return;
    }

    let element = baseElement.querySelector(selector);
    element.setAttribute(attribute, value);
}

export { setElementValue, setElementAttribute }