# Delete Product from cashier view

All producst has an boolean atributte Active, so if active its true, the product is available, but if the active its false, is not available to sell, so we activate an product for the cashier view

**URL** : `/product/:pk`

**URL Parameters** : `pk=[integer]` where `pk` is the ID of the Product in the
database.

**Method** : `POST`

**Auth required** : YES

**Permissions required** : Admin

**Data** : `{}`

## Success Response

**Condition** : If the Id exists.

**Code** : `200 ok`

**Content** : {}

**Data example**

```json

{
	"id": 1,
	"name": "Ssexo",
	"price": 70.0,
	"description": "Smoothie de fresa de leche con frambuesas y fresas partidas como topping",
	"type": "DRINKS"
}
```

## Error Responses

**Condition** : if id not exists

**Code** : `500`

**Content** : `{}`
