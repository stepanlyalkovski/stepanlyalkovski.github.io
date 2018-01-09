import { setElementValue, setElementAttribute } from './domUtils';

export default function View(target) {
    target.setElementValue = setElementValue;
    target.setElementAttribute = setElementAttribute;
}