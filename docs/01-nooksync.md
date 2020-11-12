## NookSync API

NookSync is the API used to sync saved data that would otherwise 
be in localstorage to the database, so it can be accessed across all devices using the
ID.

It is a simple API that is just one JSON object for the data, like the following:

```json
{
  "donatedBugs": [1, 2, 3, 5, 6, 8, 10],
  "donatedFish": [5, 6, 7, 8, 12, 44],
  "donatedSeaCreatures": [1, 5, 6, 7, 8],
  "settings": {
    "hemisphere": "northern"  
  }
}
```

Supported methods:
- `GET`
- `POST`
- `PATCH`
- `DELETE`
