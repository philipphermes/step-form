import steps from './steps.json' assert {type: 'json'};

const selected = [];

window.addEventListener('load', () => {
    displayStep();
})

function displayStep() {
    const step = getStep();

    switch (step.type) {
        case 'cards':
            document.getElementById('stepForm').innerHTML = ""
            displayCards(step)
            break;
        case 'rangeslider':
            document.getElementById('stepForm').innerHTML = ""
            displayRangeSlider(step)
            break;
        case 'contact':
            document.getElementById('stepForm').innerHTML = ""
            displayContact(step)
            break;
        default:
            break;
    }
}


function displayCards(step) {
    const name = document.createElement('h2')
    name.innerHTML = step.name
    document.getElementById('stepForm').appendChild(name)

    const description = document.createElement('span')
    description.innerHTML = step.description
    document.getElementById('stepForm').appendChild(description)

    const cards = document.createElement('div')
    cards.classList.add('cards')

    step.objects.forEach(object => {
        const card = document.createElement('div')
        card.classList.add('card')

        const image = document.createElement('img')
        image.src = object.img;
        image.classList.add('image-background')

        const cardName = document.createElement('h3')
        cardName.innerHTML = object.name;

        card.appendChild(image)
        card.appendChild(cardName)
        cards.appendChild(card)

        card.addEventListener('click', () => {
            selected.push({
                card: object.name
            })

            displayStep();
        })
    })

    document.getElementById('stepForm').appendChild(cards)
}

function displayRangeSlider(step) {
    const name = document.createElement('h2')
    name.innerHTML = step.name

    const description = document.createElement('span')
    description.innerHTML = step.description

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = step.range.min;
    slider.max = step.range.max;
    slider.step = step.range.max / 20

    const sliderVal = document.createElement('span')
    sliderVal.innerHTML = '0€'

    const sliderDiv = document.createElement('div')
    sliderDiv.classList.add('range')

    sliderDiv.appendChild(slider)
    sliderDiv.appendChild(sliderVal)

    const button = document.createElement('button')
    button.type = "button"
    button.innerHTML = step.button

    button.addEventListener('click', () => {
        selected.push({
            range: slider.value
        })

        displayStep()
    })

    const div = document.createElement('div');
    div.classList.add('container');
    div.appendChild(name)
    div.appendChild(description)
    div.appendChild(sliderDiv)
    div.appendChild(button)

    document.getElementById('stepForm').appendChild(div)

    slider.addEventListener('input', () => {
        sliderVal.innerHTML = slider.value + "€"
    })
}

function displayContact(step) {
    const name = document.createElement('h2')
    name.innerHTML = step.name
    document.getElementById('stepForm').appendChild(name)

    const description = document.createElement('span')
    description.innerHTML = step.description
    document.getElementById('stepForm').appendChild(description)

    const div = document.createElement('div');
    div.classList.add('container');

    step.fields.forEach(field => {
        if (field.type === 'text' || field.type === 'email') {
            const label = document.createElement('label')
            label.for = field.id
            label.innerHTML = field.label

            const input = document.createElement('input')
            input.type = field.type
            input.required = field.required
            input.id = field.id
            input.name = field.name
            input.placeholder = field.label

            div.appendChild(label)
            div.appendChild(input)
        } else if (field.type === 'textarea') {
            const label = document.createElement('label')
            label.for = field.id
            label.innerHTML = field.label

            const textarea = document.createElement('textarea')
            textarea.id = field.id
            textarea.name = field.name

            div.appendChild(label)
            div.appendChild(textarea)
        }
    })

    const button = document.createElement('button')
    button.type = "button"
    button.innerHTML = step.button
    div.appendChild(button)

    button.addEventListener('click', () => {
        const fields = [];
        //TODO check if emoty
        step.fields.forEach(field => {
            const input = document.getElementById(field.id);
            fields.push({
                name: field.name,
                value: input.value
            })
        })

        selected.push({
            fields: fields
        })

        console.log(selected);

        displayStep()
    })

    document.getElementById('stepForm').appendChild(div)
}

function getStep() {
    let step = null;

    step = selected.length

    return steps[parseInt(step)]
}