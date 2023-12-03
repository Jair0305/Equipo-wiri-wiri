# Show Accessible Drinks

Show all drinks producst.

**URL** : `/product/drinks`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

**Data constraints** : `{}`

## Success Responses

**Condition** : User can not see any Drinks.

**Code** : `200 OK`

**Content** : `{[]}`

### OR

**Condition** : User can see one or more Drinks.

**Code** : `200 OK`

**Content** : In this example, the User can see all drinks producst.

```json
[
	{
        "id": 1,
        "name": "Smoothie de fresa",
        "price": 35.0,
        "description": "Smoothie de fresa de leche con frambuesas y fresas partidas como topping",
        "active": true,
        "type": "DRINKS"
    },
	{
		"id": 2,
		"name": "Coca-Cola",
		"price": 20.0,
		"description": "Botella pet de coca cola de 600 ml",
		"active": true,
		"type": "DRINKS"
	},
	{
		"id": 3,
		"name": "Agua embotellada",
		"price": 15.0,
		"description": "Botella de agua natural de 1.5L",
		"active": true,
		"type": "DRINKS"
	}
]

```

# Show Accessible Food

Show all food products.

**URL** : `/product/food`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

**Data constraints** : `{}`

## Success Responses

**Condition** : User can not see any Food.

**Code** : `200 OK`

**Content** : `{[]}`

### OR

**Condition** : User can see one or more Food.

**Code** : `200 OK`

**Content** : In this example, the User can see all food products.

```json
[
	{
        "id": 1,
        "name": "Torta Jamon",
        "price": 45.0,
        "description": "Torta de jamon con jitomate, cebolla, lechuga, aguacate y chile",
        "active": true,
        "type": "FOOD"
    },
	{
		"id": 2,
		"name": "Torta de chilaquiles",
		"price": 20.0,
		"description": "Torta de chilaquiles verdes con queso, crema y frijoles",
		"active": true,
		"type": "FOOD"
	},
]

```

# Show Accessible desserts

Show all desserts products.

**URL** : `/product/desserts`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

**Data constraints** : `{}`

## Success Responses

**Condition** : User can not see any dessert.

**Code** : `200 OK`

**Content** : `{[]}`

### OR

**Condition** : User can see one or more dessert.

**Code** : `200 OK`

**Content** : In this example, the User can see all dessert products.

```json
[
	{
        "id": 1,
        "name": "Galleta de chocolate",
        "price": 15.0,
        "description": "Galleta de chispas de chocolate",
        "active": true,
        "type": "DESSERTS"
    },
    {
        "id": 2,
        "name": "Barra de Chocolate",
        "price": 15.0,
        "description": "Barra de chocolate de 30 gm",
        "active": true,
        "type": "DESSERTS"
    },
]

```