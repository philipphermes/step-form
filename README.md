# Step Form

## Usage

1. Add this to your head:
    ```html
        <script type="module" src="app.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css" />
    ```
2. Add this to your body
    ```html
        <div id="stepForm"></div>
    ```
3. Change the location of the json file here: `import steps from './steps.json' assert {type: 'json'};`
4. configure the steps.json

## steps.json

### Cards
* Displays card with image and text
* fields:
  ```json
    {
        "type": "cards",
        "name": "What can we do for you?",
        "description": "Please select a service",
        "objects": [
            {
                "name": "E-Commerce",
                "img": "image.jpg"
            },
            {
                "name": "Content creation",
                "img": "image2.jpg"
            },
            {
                "name": "Marketing",
                "img": "image3.jpg"
            }
        ]
    }
  ```

### Rangeslider
* Creats a rangeslider
* fields:
    ```json
      {
        "type": "rangeslider",
        "name": "What is your budget?",
        "description": "If you select 0 € it means you don't have a specific budget",
        "range": {
            "min": 0, 
            "max": 10000
        },
        "button": "Next"
    }
    ```
  
### Contact
* Creates a contact form which will sent the data as json to the given url
* supported inputs:
  * input
  * textarea
* fields:
    ```json
      {
        "type": "contact",
        "name": "Please provide your details",
        "description": "This step is necessary so that we can send you a suitable offer",
        "button": "Submit",
        "destination": "http://localhost:8000/contact",
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
                "id": "firstname",
                "name": "firstname",
                "type": "text",
                "label": "Firstname",
                "required": true
            },
            {
                "id": "organization",
                "name": "organization",
                "type": "text",
                "label": "Organization",
                "required": true
            },
            {
                "id": "description",
                "name": "description",
                "type": "textarea",
                "label": "Description",
                "required": false
            }
        ]
    }
    ```
  
### Final
* Creates a page wich will show if the contact request was successfully or an error occurred
* fields:
    ```json
      {
        "type": "final",
        "title": "Success!",
        "success": "Your request has been sent successfully",
        "error": "Something went wrong while sending the request, please try again later"
      }
    ```