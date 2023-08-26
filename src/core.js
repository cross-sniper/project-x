//js/core.js

class Component {
    constructor(name, type) {
        this.element = document.createElement(type);
        this.element.id = name;
        this.name = name;
    }

    addTo(parent) {
        parent.appendChild(this.element);
        this.parent = parent
    }

    removeFrom(parent) {
        parent.removeChild(this.element);
    }

    size(w,h){
        this.element.width = w
        this.element.height = h
    }
}

class Media extends Component {
    constructor(name, type) {
        super(name, type);
        // You can add specific properties or methods for handling media here
    }

    // Add methods for handling media content here
}
class ImageMedia extends Media {
    constructor(name, src) {
        super(name, 'img');
        this.setSource(src);
    }

    setSource(src) {
        this.element.src = src;
    }

    // Add additional methods specific to handling images if needed
}
class VideoMedia extends Media {
    constructor(name, src) {
        super(name, 'video');
        this.setSource(src);
    }

    setSource(src) {
        this.element.src = src;
    }
    // Add additional methods specific to handling images if needed
}

class AudioMedia extends Media {
    constructor(name, src) {
        super(name, 'audio');
        this.setSource(src);
    }

    setSource(src) {
        this.element.src = src;
    }

    // Add additional methods specific to handling images if needed
}


class Slider extends Component{
    constructor(name){
        super(name,'input')
        this.element.type = 'range'
        this.element.addEventListener('change',()=>{
            if(this.onChange) this.onChange()
        })

    }
}

class Progress extends Component{
    constructor(name){
        super(name,'progress')
    }
}

class Button extends Component {
    constructor(name, text) {
        super(name, 'button');
        this.element.textContent = text;
        this.element.addEventListener('click', () => {
            if (this.onClick) this.onClick();
        });
    }
}
class Checkbox extends Component {
    constructor(name, label) {
        super(name, 'input');
        this.element.type = 'checkbox'
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.appendChild(this.element);
        this.element = labelElement;
        this.element.addEventListener('change', () => {
            if (this.onChange) this.onChange();
        });
    }
}
class TextInput extends Component {
    constructor(name, placeholder) {
        super(name, 'input');
        this.element.type = 'text';
        this.element.placeholder = placeholder;
        this.element.addEventListener('input', () => {
            if (this.onInput) this.onInput(this.element.value);
        });
    }
}

class Dropdown extends Component {
    constructor(name, options) {
        super(name, 'select');
        for (const option of options) {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            this.element.appendChild(optionElement);
        }
        this.element.addEventListener('change', () => {
            if (this.onChange) this.onChange(this.element.value);
        });
    }
    setValue(value) {
        this.element.value = value;
    }
}


//CanvasComponent has been moved to canvasCore.js

function addComponentToBody(component) {
    document.body.appendChild(component.element);
}

function removeComponentFromBody(component) {
    if (component.element.parentNode) {
        component.removeFrom(document.body);
    }
}