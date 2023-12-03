# Show Accessible Products

Show all products orders by the three types: FOOD, DRINKS, DESSERTS

**URL** : `/product/all`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

**Data constraints** : `{}`

## Success Responses

**Condition** : User can not see any Products.

**Code** : `200 OK`

**Content** : `{[]}`

### OR

**Condition** : User can see one or more Accounts.

**Code** : `200 OK`

**Content** : In this example, the User can see all products order by type in that order:

```json
{
	"food": [
		{
			"id": 1,
			"name": "Torta Jamon",
			"price": 45.0,
			"description": "Torta de jamon con jitomate, cebolla, lechuga, aguacate y chile",
			"active": true,
			"type": "FOOD"
		}
	],
	"drinks": [
		{
			"id": 2,
			"name": "Smoothie de fresa",
			"price": 35.0,
			"description": "Smoothie de fresa de leche con frambuesas y fresas partidas como topping",
			"active": true,
			"type": "DRINKS"
		}
	],
	"desserts": [
        {
			"id": 1,
			"name": "Galleta de chocolate",
			"price": 15.0,
			"description": "Galleta de chispas de chocolate",
			"active": true,
			"type": "DESSERTS"
		}
    ]
}
```
