import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiSearchPlayersParams } from '../app-types'

const buildSearchString = (params: object) =>
  (new URLSearchParams(params as any)).toString()

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.balldontlie.io/api/v1' }),
  endpoints: builder => ({
    searchPlayers: builder.query<any, ApiSearchPlayersParams>({
      query: (params) => `/players?` + buildSearchString(params)
    }),
  })
})

export const {
  useSearchPlayersQuery,
} = apiSlice
