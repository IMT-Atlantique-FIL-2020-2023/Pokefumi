# Match

## Operations

### getMatchsAdayLast30Days

```http
GET /matchs/count-a-day-last-30-days
```


## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function getMatchsAdayLast30Days(): Promise<t.GetMatchsAdayLast30DaysResponse> {
	throw 'Unimplemented'
}


const api: t.MatchApi = {
	getMatchsAdayLast30Days,
}

export default api
```
