---
title: Stats service v0.0.1
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

<h1 id="stats-service">Stats service v0.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Because we need statistics

Base URLs:

* <a href="http://127.0.0.1:3337">http://127.0.0.1:3337</a>

License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

<h1 id="stats-service-pokemon">pokemon</h1>

Pokemon stats

## getNumberOfRoundsByPokemon

<a id="opIdgetNumberOfRoundsByPokemon"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3337/pokemons/{id}/number-of-rounds \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3337/pokemons/{id}/number-of-rounds',
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

`GET /pokemons/{id}/number-of-rounds`

*Number of rounds for a specific pokemon*

Returns the number of rounds for a specific pokemon

<h3 id="getnumberofroundsbypokemon-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|[PokemonID](#schemapokemonid)|true|Pokemon ID|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "numberOfRounds": 0
}
```

<h3 id="getnumberofroundsbypokemon-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|An error caused by the client|Inline|

<h3 id="getnumberofroundsbypokemon-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|integer(int64)|false|none|Pokemon's id used in the request|
|» numberOfRounds|integer(int64)|false|none|Number of rounds for this pokemon|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AppError](#schemaapperror)]|false|none|none|
|» code|integer(int32)|true|none|Error code|
|» message|string|true|none|Error message|

<aside class="success">
This operation does not require authentication
</aside>

## getNumberOfVictoriesByPokemon

<a id="opIdgetNumberOfVictoriesByPokemon"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3337/pokemons/{id}/number-of-victories \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3337/pokemons/{id}/number-of-victories',
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

`GET /pokemons/{id}/number-of-victories`

*Number of victories for a specific pokemon*

Returns the number of victories for a specific pokemon

<h3 id="getnumberofvictoriesbypokemon-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|[PokemonID](#schemapokemonid)|true|Pokemon ID|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "numberOfVictories": 0
}
```

<h3 id="getnumberofvictoriesbypokemon-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|An error caused by the client|Inline|

<h3 id="getnumberofvictoriesbypokemon-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|integer(int64)|false|none|Pokemon's id used in the request|
|» numberOfVictories|integer(int64)|false|none|Number of victories for this pokemon|

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AppError](#schemaapperror)]|false|none|none|
|» code|integer(int32)|true|none|Error code|
|» message|string|true|none|Error message|

<aside class="success">
This operation does not require authentication
</aside>

## getPokemonsWithNumberOfRounds

<a id="opIdgetPokemonsWithNumberOfRounds"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3337/pokemons/rounds \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3337/pokemons/rounds',
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

`GET /pokemons/rounds`

*List of pokemons with their number of rounds*

Returns the list of pokemons with their number of rounds

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "numberOfRounds": 0
  }
]
```

<h3 id="getpokemonswithnumberofrounds-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ArrayOfPokemons](#schemaarrayofpokemons)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stats-service-round">round</h1>

Rounds stats

## getRoundsAdayLast30Days

<a id="opIdgetRoundsAdayLast30Days"></a>

> Code samples

```shell
# You can also use wget
curl -X GET http://127.0.0.1:3337/rounds/count-a-day-last-30-days \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3337/rounds/count-a-day-last-30-days',
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

`GET /rounds/count-a-day-last-30-days`

*Number of rounds a day for the last 30 days. 1 round per player play. It means that's the double of rounds played*

> Example responses

> 200 Response

```json
[
  {
    "date": "2019-08-24",
    "numberOfRounds": 0
  }
]
```

<h3 id="getroundsadaylast30days-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[ArrayOfRounds](#schemaarrayofrounds)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="stats-service-stats">stats</h1>

## uploadStatRow

<a id="opIduploadStatRow"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT http://127.0.0.1:3337/stats \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```javascript
const inputBody = '{
  "idPokemon": 0,
  "dateMatch": "2019-08-24T14:15:22Z",
  "victory": true,
  "idMatch": 0,
  "team": 1
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3337/stats',
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

`PUT /stats`

*Upload stats*

Upload stats

> Body parameter

```json
{
  "idPokemon": 0,
  "dateMatch": "2019-08-24T14:15:22Z",
  "victory": true,
  "idMatch": 0,
  "team": 1
}
```

<h3 id="uploadstatrow-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StatsDto](#schemastatsdto)|false|Stats to upload|

> Example responses

> 200 Response

```json
{
  "idPokemon": 0,
  "dateMatch": "2019-08-24T14:15:22Z",
  "victory": true,
  "idMatch": 0,
  "team": 1
}
```

<h3 id="uploadstatrow-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[StatsDto](#schemastatsdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|An error caused by the client|Inline|

<h3 id="uploadstatrow-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AppError](#schemaapperror)]|false|none|none|
|» code|integer(int32)|true|none|Error code|
|» message|string|true|none|Error message|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_StatsDto">StatsDto</h2>
<!-- backwards compatibility -->
<a id="schemastatsdto"></a>
<a id="schema_StatsDto"></a>
<a id="tocSstatsdto"></a>
<a id="tocsstatsdto"></a>

```json
{
  "idPokemon": 0,
  "dateMatch": "2019-08-24T14:15:22Z",
  "victory": true,
  "idMatch": 0,
  "team": 1
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|idPokemon|integer(int64)|true|none|Pokemon's id|
|dateMatch|string(date-time)|true|none|Date of the round|
|victory|boolean|true|none|Victory (if true) or defeat|
|idMatch|integer(int64)|true|none|Round's id|
|team|integer|true|none|Team of the pokemon|

<h2 id="tocS_ArrayOfRounds">ArrayOfRounds</h2>
<!-- backwards compatibility -->
<a id="schemaarrayofrounds"></a>
<a id="schema_ArrayOfRounds"></a>
<a id="tocSarrayofrounds"></a>
<a id="tocsarrayofrounds"></a>

```json
[
  {
    "date": "2019-08-24",
    "numberOfRounds": 0
  }
]

```

Array Of Rounds Stats

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Array Of Rounds Stats|[object]|false|none|Array of rounds|
|date|string(date)|true|none|Date of the aggregated day|
|numberOfRounds|integer(number)|true|none|Number of rounds for this day|

<h2 id="tocS_ArrayOfPokemons">ArrayOfPokemons</h2>
<!-- backwards compatibility -->
<a id="schemaarrayofpokemons"></a>
<a id="schema_ArrayOfPokemons"></a>
<a id="tocSarrayofpokemons"></a>
<a id="tocsarrayofpokemons"></a>

```json
[
  {
    "id": 0,
    "numberOfRounds": 0
  }
]

```

Array Of Pokemons Stats

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Array Of Pokemons Stats|[object]|false|none|Array of pokemons|
|id|integer(int64)|true|none|Pokemon's id|
|numberOfRounds|integer(int64)|true|none|Number of rounds for this pokemon|

<h2 id="tocS_PokemonID">PokemonID</h2>
<!-- backwards compatibility -->
<a id="schemapokemonid"></a>
<a id="schema_PokemonID"></a>
<a id="tocSpokemonid"></a>
<a id="tocspokemonid"></a>

```json
0

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|integer|false|none|none|

<h2 id="tocS_AppError">AppError</h2>
<!-- backwards compatibility -->
<a id="schemaapperror"></a>
<a id="schema_AppError"></a>
<a id="tocSapperror"></a>
<a id="tocsapperror"></a>

```json
{
  "code": 0,
  "message": "Internal error"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer(int32)|true|none|Error code|
|message|string|true|none|Error message|

