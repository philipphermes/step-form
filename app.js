import steps from './steps.json' assert {type: 'json'};

const selected = [];

window.addEventListener('load', () => {
    displayStep();
})

function displayStep(responseStatus = null) {
    const step = getStep();

    document.getElementById('stepForm').innerHTML = ""
    displayBar()

    switch (step.type) {
        case 'cards':
            displayCards(step)
            break;
        case 'rangeslider':
            displayRangeSlider(step)
            break;
        case 'contact':
            displayContact(step)
            break;
        case 'final':
            displayFinal(step, responseStatus)
            break;
        default:
            break;
    }
}

function displayBar() {
    const wrapper = document.createElement('div')
    wrapper.classList.add('stepper-wrapper')

    for (let key in steps) {
        if (steps[key].type === 'final') {
            continue
        }

        const item = document.createElement('div')
        item.classList.add('stepper-item')

        const stepNr = parseInt(key) + 1;

        if (selected.length >= stepNr) {
            item.classList.add('completed')
        }

        const nr = document.createElement('span')
        nr.classList.add('step-counter')
        nr.innerHTML = stepNr.toString()

        item.appendChild(nr);

        wrapper.appendChild(item)


    }

    document.getElementById('stepForm').appendChild(wrapper)
}

function displayCards(step) {
    const container = document.createElement('div')
    container.classList.add('container')

    const name = document.createElement('h2')
    name.innerHTML = step.name
    container.appendChild(name)

    const description = document.createElement('span')
    description.innerHTML = step.description
    container.appendChild(description)

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

    container.appendChild(cards)
    document.getElementById('stepForm').appendChild(container)
}

function displayRangeSlider(step) {
    const container = document.createElement('div')
    container.classList.add('container')

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


    container.appendChild(name)
    container.appendChild(description)
    container.appendChild(sliderDiv)
    container.appendChild(button)

    document.getElementById('stepForm').appendChild(container)

    slider.addEventListener('input', () => {
        sliderVal.innerHTML = slider.value + "€"
    })
}

function displayContact(step) {
    const container = document.createElement('div');
    container.classList.add('container');

    const name = document.createElement('h2')
    name.innerHTML = step.name
    container.appendChild(name)

    const description = document.createElement('span')
    description.innerHTML = step.description
    container.appendChild(description)

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

            container.appendChild(label)
            container.appendChild(input)
        } else if (field.type === 'textarea') {
            const label = document.createElement('label')
            label.for = field.id
            label.innerHTML = field.label

            const textarea = document.createElement('textarea')
            textarea.id = field.id
            textarea.name = field.name
            textarea.required = field.required

            container.appendChild(label)
            container.appendChild(textarea)
        }
    })

    const button = document.createElement('button')
    button.type = "button"
    button.innerHTML = step.button
    container.appendChild(button)

    button.addEventListener('click', () => {
        const fields = [];
        let empty = false

        step.fields.forEach(field => {
            const input = document.getElementById(field.id);

            if (field.required === true && input.value === '') {
                empty = true
            }
        })

        if (empty === false) {
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

            fetch(step.destination, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selected)
            }).then(response => {
                displayStep(response.status)
            }).catch(onerror => {
                displayStep(onerror.status)
            });
        }
    })

    document.getElementById('stepForm').appendChild(container)
}

function displayFinal(step, responseStatus) {
    const container = document.createElement('div');
    container.classList.add('container');

    const title = document.createElement('h2')
    title.innerHTML = step.title
    container.appendChild(title)

    const message = document.createElement('span')

    if (responseStatus === 200) {
        message.innerHTML = step.success
        message.classList.add('success')
    } else {
        message.innerHTML = step.error
        message.classList.add('error')
    }

    container.appendChild(message)
    document.getElementById('stepForm').appendChild(message)
}

function getStep() {
    let step = null;

    step = selected.length

    return steps[parseInt(step)]
}