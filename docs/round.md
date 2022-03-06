---
title: Round service v0.0.1
language_tabs:
  - shell: Shell
  - javascript: JavaScript
language_clients:
  - shell: ""
  - javascript: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="round-service">Round service v0.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

To manage rounds in a match

Base URLs:

* <a href="http://127.0.0.1:3335">http://127.0.0.1:3335</a>

License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="round-service-default">Default</h1>

## getApi

<a id="opIdgetApi"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/api \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/api',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /api`

*Check is the api is up*

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="getapi-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getapi-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="round-service-pokemon">pokemon</h1>

Pokemon infos

## getPokemons

<a id="opIdgetPokemons"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/pokemons \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/pokemons',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /pokemons`

*Get the list of existing pokemons*

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "types": [
      {
        "id": 0,
        "name": "string",
        "faiblesses": [
          "string"
        ],
        "resistances": [
          "string"
        ]
      }
    ]
  }
]
```

<h3 id="getpokemons-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The list of pokemons|Inline|

<h3 id="getpokemons-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Pokemon](#schemapokemon)]|false|none|[A POKEMON :o]|
|» Pokemon|[Pokemon](#schemapokemon)|false|none|A POKEMON :o|
|»» id|integer(int64)|false|none|Pokemon's id|
|»» name|string|false|none|Pokemon's name|
|»» types|[[TypePokemon](#schematypepokemon)]|false|none|List of the types for this pokemon|
|»»» TypePokemon|[TypePokemon](#schematypepokemon)|false|none|A POKEMON TYPE :o|
|»»»» id|integer(int64)|false|none|id of the type|
|»»»» name|string|false|none|label of the type|
|»»»» faiblesses|[string]|false|none|list of weakness for a type|
|»»»» resistances|[string]|false|none|list of weakness for a type|

<aside class="success">
This operation does not require authentication
</aside>

## getPokemonById

<a id="opIdgetPokemonById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/pokemons/{id} \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/pokemons/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /pokemons/{id}`

*Get the pokemon for a given id*

<h3 id="getpokemonbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|Pokemon ID|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "types": [
    {
      "id": 0,
      "name": "string",
      "faiblesses": [
        "string"
      ],
      "resistances": [
        "string"
      ]
    }
  ]
}
```

<h3 id="getpokemonbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The pokemon for a given id|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## getPokemonByName

<a id="opIdgetPokemonByName"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/pokemons/name/{name} \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/pokemons/name/{name}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /pokemons/name/{name}`

*Get the pokemon for a given name*

<h3 id="getpokemonbyname-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|Pokemon name|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "types": [
    {
      "id": 0,
      "name": "string",
      "faiblesses": [
        "string"
      ],
      "resistances": [
        "string"
      ]
    }
  ]
}
```

<h3 id="getpokemonbyname-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The pokemon for a given name|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## getTypes

<a id="opIdgetTypes"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/types \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/types',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /types`

*Get the list of existing types*

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "faiblesses": [
      "string"
    ],
    "resistances": [
      "string"
    ]
  }
]
```

<h3 id="gettypes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The list of types|Inline|

<h3 id="gettypes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[TypePokemon](#schematypepokemon)]|false|none|[A POKEMON TYPE :o]|
|» TypePokemon|[TypePokemon](#schematypepokemon)|false|none|A POKEMON TYPE :o|
|»» id|integer(int64)|false|none|id of the type|
|»» name|string|false|none|label of the type|
|»» faiblesses|[string]|false|none|list of weakness for a type|
|»» resistances|[string]|false|none|list of weakness for a type|

<aside class="success">
This operation does not require authentication
</aside>

## getTypeById

<a id="opIdgetTypeById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/types/{id} \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/types/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /types/{id}`

*Get the type for a given id*

<h3 id="gettypebyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|type ID|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "faiblesses": [
    "string"
  ],
  "resistances": [
    "string"
  ]
}
```

<h3 id="gettypebyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The type for a given id|[TypePokemon](#schematypepokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## getTypeByName

<a id="opIdgetTypeByName"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/types/name/{name} \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/types/name/{name}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /types/name/{name}`

*Get the type for a given name*

<h3 id="gettypebyname-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|type name|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "faiblesses": [
    "string"
  ],
  "resistances": [
    "string"
  ]
}
```

<h3 id="gettypebyname-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The type for a given name|[TypePokemon](#schematypepokemon)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="round-service-round">round</h1>

rounds infos

## getRoundsResultById

<a id="opIdgetRoundsResultById"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/round/{id1}/{id2} \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/round/{id1}/{id2}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /round/{id1}/{id2}`

*Get the result of a round for two given pokemon ids*

<h3 id="getroundsresultbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id1|path|string|true|pokemon1 id|
|id2|path|string|true|pokemon2 id|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "types": [
    {
      "id": 0,
      "name": "string",
      "faiblesses": [
        "string"
      ],
      "resistances": [
        "string"
      ]
    }
  ]
}
```

<h3 id="getroundsresultbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The winning pokemon|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## getRoundsResultByName

<a id="opIdgetRoundsResultByName"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3335/round/name/{name1}/{name2} \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3335/round/name/{name1}/{name2}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /round/name/{name1}/{name2}`

*Get the result of a round for two given pokemon names*

<h3 id="getroundsresultbyname-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name1|path|string|true|pokemon1 name|
|name2|path|string|true|pokemon2 name|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "types": [
    {
      "id": 0,
      "name": "string",
      "faiblesses": [
        "string"
      ],
      "resistances": [
        "string"
      ]
    }
  ]
}
```

<h3 id="getroundsresultbyname-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The winning pokemon|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## playRound

<a id="opIdplayRound"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://127.0.0.1:3335/match \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access-token}'

```

```javascript
const inputBody = '{
  "idMatch": 0,
  "idxPokemonDeck": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://127.0.0.1:3335/match',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PUT /match`

*Play the round for a given user and a given match*

> Body parameter

```json
{
  "idMatch": 0,
  "idxPokemonDeck": 0
}
```

<h3 id="playround-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|

> Example responses

> 200 Response

```json
{
  "roundWinner": 0,
  "pokemonWinner": 0,
  "roundLooser": 0,
  "pokemonLooser": 0,
  "roundIndex": 9
}
```

<h3 id="playround-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The winning pokemon|[RoundResultDto](#schemaroundresultdto)|
|408|[Request Timeout](https://tools.ietf.org/html/rfc7231#section-6.5.7)|Timeout the other player didn't responded within the allowed delay|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

# Schemas

<h2 id="tocS_Pokemon">Pokemon</h2>
<!-- backwards compatibility -->
<a id="schemapokemon"></a>
<a id="schema_Pokemon"></a>
<a id="tocSpokemon"></a>
<a id="tocspokemon"></a>

```json
{
  "id": 0,
  "name": "string",
  "types": [
    {
      "id": 0,
      "name": "string",
      "faiblesses": [
        "string"
      ],
      "resistances": [
        "string"
      ]
    }
  ]
}

```

Pokemon

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|Pokemon's id|
|name|string|false|none|Pokemon's name|
|types|[[TypePokemon](#schematypepokemon)]|false|none|List of the types for this pokemon|

<h2 id="tocS_TypePokemon">TypePokemon</h2>
<!-- backwards compatibility -->
<a id="schematypepokemon"></a>
<a id="schema_TypePokemon"></a>
<a id="tocStypepokemon"></a>
<a id="tocstypepokemon"></a>

```json
{
  "id": 0,
  "name": "string",
  "faiblesses": [
    "string"
  ],
  "resistances": [
    "string"
  ]
}

```

TypePokemon

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|id of the type|
|name|string|false|none|label of the type|
|faiblesses|[string]|false|none|list of weakness for a type|
|resistances|[string]|false|none|list of weakness for a type|

<h2 id="tocS_RoundResultDto">RoundResultDto</h2>
<!-- backwards compatibility -->
<a id="schemaroundresultdto"></a>
<a id="schema_RoundResultDto"></a>
<a id="tocSroundresultdto"></a>
<a id="tocsroundresultdto"></a>

```json
{
  "roundWinner": 0,
  "pokemonWinner": 0,
  "roundLooser": 0,
  "pokemonLooser": 0,
  "roundIndex": 9
}

```

RoundResultDto

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|roundWinner|integer|true|none|the id of the winner|
|pokemonWinner|integer|true|none|the pokeApi id of the winner's pokemon|
|roundLooser|integer|true|none|the id of the looser|
|pokemonLooser|integer|true|none|the pokeApi id of the looser's pokemon|
|roundIndex|integer|true|none|the index of the round|

