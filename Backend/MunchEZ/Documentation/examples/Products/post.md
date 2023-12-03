# Create Product

Create a product with name, price, description and type, all this is required
exists 3 types: FOOD, DRINKS, DESSERTS

**URL** : `/product`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : Admin

**Data constraints**

No setting one thing of body required.

```json
{
  "name": "Torta de jamon",
  "price": 50.0,
  "description": "Torta de jamon",
}
```

setting a type different of FOOD, DRINKS, DESSERTS.
Note: Use a UpperCase

```json
{
  "name": "Torta de jamon",
  "price": 50.0,
  "description": "Torta de jamon",
  "type": "drink"
}
```

**Data example** All fields must be sent correctly.

```json
{
  "name": "Torta de jamon",
  "price": 50.0,
  "description": "Torta de jamon",
  "type": "FOOD"
}
```

## Success Response

**Condition** : If everything is OK and an Account didn't exist for this User.

**Code** : `201 CREATED`

**Content example**

```json
{
	"id": 13,
	"name": "Torta de jamon",
	"price": 50.0,
	"description": "Torta de jamon",
	"type": "FOOD"
}
```

## Error Responses

**Condition** : If any field is not sent or type is sent bad.

**Code** : `400 Bad Request`

**Content** : `{}`
