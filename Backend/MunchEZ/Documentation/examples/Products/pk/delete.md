# Delete Product from cashier view

All producst has an boolean atributte Active, so if active its true, the product is available, but if the active its false, is not available to sell, so we can disable a product with that

**URL** : `/product/disable/:pk`

**URL Parameters** : `pk=[integer]` where `pk` is the ID of the Product in the
database.

**Method** : `DELETE`

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


# Delete Product from database

If the product is not useful, you can delete the product from the database
but the product must not be associated with any order registered in the database

**URL** : `/product/delete/:pk`

**URL Parameters** : `pk=[integer]` where `pk` is the ID of the Product in the
database.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : Admin

**Data** : `{}`

## Success Response

**Condition** : If the product is not used in any available order.

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

### Or

**Condition** : the product is current in an order details.

**Code** : `403 FORBIDDEN`

**Content** : `{}`
