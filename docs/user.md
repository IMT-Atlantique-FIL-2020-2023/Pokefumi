---
title: User service v0.0.1
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

<h1 id="user-service">User service v0.0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Because we need users

Base URLs:

* <a href="http://127.0.0.1:3333">http://127.0.0.1:3333</a>

License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

<h1 id="user-service-user">user</h1>

users informations and manipulations

## getAllUsers

<a id="opIdgetAllUsers"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3333/users',
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

`GET /users`

*List of all users*

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "username": "string",
    "statut": "string",
    "score": 0,
    "password": "string"
  }
]
```

<h3 id="getallusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|Inline|

<h3 id="getallusers-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|[a user]|
|» user|[User](#schemauser)|false|none|a user|
|»» id|integer(int64)|false|none|id of the user|
|»» username|string(text)|false|none|name of the user|
|»» statut|string|false|none|status of the user|
|»» score|integer(number)|false|none|score of the player|
|»» password|string(text)|false|none|password of the user|

<aside class="success">
This operation does not require authentication
</aside>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

```javascript
const inputBody = '{
  "id": 0,
  "username": "string",
  "statut": "string",
  "score": 0,
  "password": "string"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('http://127.0.0.1:3333/users',
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

`POST /users`

*Add a new user*

> Body parameter

```json
{
  "id": 0,
  "username": "string",
  "statut": "string",
  "score": 0,
  "password": "string"
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[User](#schemauser)|true|Optional description in *Markdown*|

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|unsuccessful operation|None|

<aside class="success">
This operation does not require authentication
</aside>

## connectUser

<a id="opIdconnectUser"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3333/auth/connect?username=string&password=string',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/connect`

*Connect the user*

<h3 id="connectuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|username|query|string|true|none|
|password|query|string|true|none|

> Example responses

> 200 Response

```json
"string"
```

<h3 id="connectuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Authentificated, return the token|string|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|wrong credentials|None|

<aside class="success">
This operation does not require authentication
</aside>

## getUserById

<a id="opIdgetUserById"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('http://127.0.0.1:3333/users/{id}',
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

`GET /users/{id}`

*Retrieves a specific user*

<h3 id="getuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|The user ID|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "username": "string",
  "statut": "string",
  "score": 0,
  "password": "string"
}
```

<h3 id="getuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successful operation|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "username": "string",
  "statut": "string",
  "score": 0,
  "password": "string"
}

```

user

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|id of the user|
|username|string(text)|false|none|name of the user|
|statut|string|false|none|status of the user|
|score|integer(number)|false|none|score of the player|
|password|string(text)|false|none|password of the user|

