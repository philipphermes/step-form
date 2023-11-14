# Step Form

## Steps example

```json
[
    {
        "type": "cards",
        "name": "Was können wir für Sie machen?",
        "description": "Bitte wählen Sie das Passende angebot aus",
        "objects": [
            {
                "name": "E-Commerce",
                "img": "testImages/wp7011387-sazabi-wallpapers.jpg"
            },
            {
                "name": "Content creation",
                "img": "testImages/wp7011407-sazabi-wallpapers.jpg"
            },
            {
                "name": "Marketing",
                "img": "testImages/wp7011526-sazabi-wallpapers.jpg"
            }
        ]
    },
    {
        "type": "rangeslider",
        "name": "Wie hoch ist ihr Budget?",
        "description": "Wenn Sie 0€ auswählen heißt es, dass Sie kein bestimmtes Budget haben",
        "range": {
            "min": 0, 
            "max": 10000
        },
        "button": "Weiter"
    },
    {
        "type": "contact",
        "name": "Bitte geben Sie ihre Daten an?",
        "description": "Dieser Schritt ist erforderlich, damit wir ihnen ein Passendes Angbeot zukommenlassen können",
        "button": "Absenden",
        "fields": [
            {
                "id": "email",
                "name": "email",
                "type": "email",
                "label": "Email",
                "required": true
            },
            {
                "id": "name",
                "name": "name",
                "type": "text",
                "label": "Name",
                "required": true
            },
            {
                "id": "vorname",
                "name": "vorname",
                "type": "text",
                "label": "Vorname",
                "required": true
            },
            {
                "id": "organisation",
                "name": "organisation",
                "type": "text",
                "label": "Organisation",
                "required": true
            },
            {
                "id": "beschreibung",
                "name": "beschreibung",
                "type": "textarea",
                "label": "Beschreibung",
                "required": true
            }
        ]
    },
    {
        "type": "final",
        "success": "Ihre anfrage wurde erfolgreich versendet",
        "error": "Beim versenden der Anfrage ist etwas schiefgeganen, bitte versuchen Sie es später erneut"
    }
]
```