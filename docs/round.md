---
title: Round service v0.0.1
language_tabs:
  - javascript: JavaScript
language_clients:
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

<h1 id="round-service-default">Default</h1>

## get__api

> Code samples

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

<h3 id="get__api-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="get__api-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» message|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="round-service-pokemon">pokemon</h1>

Pokemon infos

## get__pokemons

> Code samples

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

<h3 id="get__pokemons-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The list of pokemons|Inline|

<h3 id="get__pokemons-responseschema">Response Schema</h3>

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

## get__pokemons_{id}

> Code samples

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

<h3 id="get__pokemons_{id}-parameters">Parameters</h3>

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

<h3 id="get__pokemons_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The pokemon for a given id|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## get__pokemons_name_{name}

> Code samples

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

<h3 id="get__pokemons_name_{name}-parameters">Parameters</h3>

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

<h3 id="get__pokemons_name_{name}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The pokemon for a given name|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## get__types

> Code samples

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

<h3 id="get__types-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The list of types|Inline|

<h3 id="get__types-responseschema">Response Schema</h3>

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

## get__types_{id}

> Code samples

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

<h3 id="get__types_{id}-parameters">Parameters</h3>

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

<h3 id="get__types_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The type for a given id|[TypePokemon](#schematypepokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## get__types_name_{name}

> Code samples

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

<h3 id="get__types_name_{name}-parameters">Parameters</h3>

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

<h3 id="get__types_name_{name}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The type for a given name|[TypePokemon](#schematypepokemon)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="round-service-round">round</h1>

rounds infos

## get__round_{id1}_{id2}

> Code samples

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

<h3 id="get__round_{id1}_{id2}-parameters">Parameters</h3>

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

<h3 id="get__round_{id1}_{id2}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The winning pokemon|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
</aside>

## get__round_name_{name1}_{name2}

> Code samples

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

<h3 id="get__round_name_{name1}_{name2}-parameters">Parameters</h3>

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

<h3 id="get__round_name_{name1}_{name2}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|The winning pokemon|[Pokemon](#schemapokemon)|

<aside class="success">
This operation does not require authentication
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

