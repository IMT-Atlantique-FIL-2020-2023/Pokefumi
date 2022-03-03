---
title: Matchmaking service v0.0.1
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

<h1 id="matchmaking-service">Matchmaking service v0.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Because we need machmatking

Base URLs:

* <a href="http://127.0.0.1:3334">http://127.0.0.1:3334</a>

License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="matchmaking-service-matches">matches</h1>

Everything related to a match

## getAllMatches

<a id="opIdgetAllMatches"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3334/matchs',
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

`GET /matchs`

*Get all matches*

> Example responses

> 200 Response

```json
[
  "string"
]
```

<h3 id="getallmatches-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getallmatches-responseschema">Response Schema</h3>

Status Code **200**

*Array of matches id*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## createMatch

<a id="opIdcreateMatch"></a>

> Code samples

```javascript
const inputBody = '{
  "opponentId": 0,
  "deck": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://127.0.0.1:3334/matchs',
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

`PUT /matchs`

*Create a match*

> Body parameter

```json
{
  "opponentId": 0,
  "deck": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
}
```

<h3 id="creatematch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateMatchDto](#schemacreatematchdto)|false|Match to create|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "authorPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "opponentPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "authorId": 0,
  "opponentId": 0,
  "status": "waitingInvite",
  "winnerId": null
}
```

<h3 id="creatematch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[MatchDto](#schemamatchdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|An error caused by the client|Inline|

<h3 id="creatematch-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AppError](#schemaapperror)]|false|none|none|
|» code|integer(int32)|true|none|Error code|
|» message|string|true|none|Error message|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## getMatchById

<a id="opIdgetMatchById"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3334/matchs/{id}',
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

`GET /matchs/{id}`

*Get a match by id*

<h3 id="getmatchbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|Id of the match|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "authorPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "opponentPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "authorId": 0,
  "opponentId": 0,
  "status": "waitingInvite",
  "winnerId": null
}
```

<h3 id="getmatchbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[MatchDto](#schemamatchdto)|

<aside class="success">
This operation does not require authentication
</aside>

## getAllMatchesWaitingForInvitation

<a id="opIdgetAllMatchesWaitingForInvitation"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3334/matchs/invitation',
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

`GET /matchs/invitation`

*Get all matches that are waiting for an invitation for the connected player*

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "authorId": "string"
  }
]
```

<h3 id="getallmatcheswaitingforinvitation-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getallmatcheswaitingforinvitation-responseschema">Response Schema</h3>

Status Code **200**

*Array of awaiting matches*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» id|integer|true|none|The id of the match|
|» authorId|string|false|none|The id of the player opponent|

<aside class="success">
This operation does not require authentication
</aside>

## joinMatch

<a id="opIdjoinMatch"></a>

> Code samples

```javascript
const inputBody = '[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://127.0.0.1:3334/matchs/{id}/join',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /matchs/{id}/join`

*Join a match*

> Body parameter

```json
[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]
```

<h3 id="joinmatch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|Id of the match|
|body|body|[DeckDto](#schemadeckdto)|false|Deck|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "authorPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "opponentPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "authorId": 0,
  "opponentId": 0,
  "status": "waitingInvite",
  "winnerId": null
}
```

<h3 id="joinmatch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[MatchDto](#schemamatchdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|An error caused by the client|Inline|

<h3 id="joinmatch-responseschema">Response Schema</h3>

Status Code **400**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AppError](#schemaapperror)]|false|none|none|
|» code|integer(int32)|true|none|Error code|
|» message|string|true|none|Error message|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

<h1 id="matchmaking-service-internal">internal</h1>

For internal communication

## closeMatch

<a id="opIdcloseMatch"></a>

> Code samples

```javascript
const inputBody = '{
  "winnerId": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3334/internal/matches/{id}/close',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /internal/matches/{id}/close`

*Close a match*

> Body parameter

```json
{
  "winnerId": "string"
}
```

<h3 id="closematch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|Id of the match|
|body|body|object|false|Post match winner and close it|
|» winnerId|body|string|true|The id of the winner|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "authorPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "opponentPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "authorId": 0,
  "opponentId": 0,
  "status": "waitingInvite",
  "winnerId": null
}
```

<h3 id="closematch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[MatchDto](#schemamatchdto)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|An error caused by the client|Inline|

<h3 id="closematch-responseschema">Response Schema</h3>

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

<h2 id="tocS_DeckDto">DeckDto</h2>
<!-- backwards compatibility -->
<a id="schemadeckdto"></a>
<a id="schema_DeckDto"></a>
<a id="tocSdeckdto"></a>
<a id="tocsdeckdto"></a>

```json
[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]

```

Deck of the player

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[PokemonID](#schemapokemonid)]|false|none|Deck of the player|

<h2 id="tocS_CreateMatchDto">CreateMatchDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatematchdto"></a>
<a id="schema_CreateMatchDto"></a>
<a id="tocScreatematchdto"></a>
<a id="tocscreatematchdto"></a>

```json
{
  "opponentId": 0,
  "deck": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|opponentId|integer|true|none|Id of the opponent|
|deck|[[PokemonID](#schemapokemonid)]|false|none|Deck of the player|

<h2 id="tocS_MatchDto">MatchDto</h2>
<!-- backwards compatibility -->
<a id="schemamatchdto"></a>
<a id="schema_MatchDto"></a>
<a id="tocSmatchdto"></a>
<a id="tocsmatchdto"></a>

```json
{
  "id": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z",
  "authorPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "opponentPokemons": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "authorId": 0,
  "opponentId": 0,
  "status": "waitingInvite",
  "winnerId": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|The id of the match|
|createdAt|string(date-time)|true|none|The date of the creation|
|updatedAt|string(date-time)|true|none|The date of the last update|
|authorPokemons|[integer]|true|none|The pokemons ids of the author|
|opponentPokemons|[integer]|false|none|The pokemons ids of the opponent|
|authorId|integer|true|none|The id of the author|
|opponentId|integer|true|none|The id of the opponent|
|status|string|true|none|The status of the match|
|winnerId|integer|false|none|The id of the winner|

#### Enumerated Values

|Property|Value|
|---|---|
|status|waitingInvite|
|status|started|
|status|finished|

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

