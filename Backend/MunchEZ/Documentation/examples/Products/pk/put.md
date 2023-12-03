# Update Product data

Update the Product data

**URL** : `/product/:pk/`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : Admin

**Data constraints**

``setting a type different of FOOD, DRINKS, DESSERTS.
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

**Condition** : If everything is OK.

**Code** : `200 ok`

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

## Or

**Condition** : if id not exists

**Code** : `500`

**Content** : `{}`
