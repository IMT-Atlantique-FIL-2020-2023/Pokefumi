import * as t from '../api/match/types'
import { Api } from '../models'

async function getMatchsAdayLast30Days(): Promise<t.GetMatchsAdayLast30DaysResponse> {
	throw 'Unimplemented'
}


const api: t.MatchApi = {
	getMatchsAdayLast30Days,
}

export default api
