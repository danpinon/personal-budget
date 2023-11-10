# HOW TO USE THE ENVELOPS BUDGET API

## /api/envelops

### Get Envelops (GET)
`/api/envelops` Returns an array of envelops

### Add Envelop (POST)
`/api/envelops` Returns envelop object

Accepts:
```
body: {
  "category": {String},
  "budget": {Number}
}
```

### Get Envelop (PUT)
`/api/envelops/:id` Returns envelop object

### Edit Envelop (PUT)
`/api/envelops/:id` Returns envelop object

Accepts:
```
body: {
  "category": {String},
  "budget": {Number}
}
```

### Delete Envelop (DELETE)
`/api/envelops/:id` Returns a succesful status

### Budget Transfer between envelops (PUT)
`/api/envelops/:from/:to` Returns successful status and message

Accepts:
```
body: {
  "transfer": {Number}
}
```

## /api/balance

### Get Balance (GET)
`/api/balance` Returns balance object

### Edit Balance (PUT)
`/api/balance` Returns balance object
Accepts:
```
  body: { 
    balance: [balance] 
  }
```