const BASE_URL = 'https://api.racc.lol/raccoon'

console.log('hej')

type ApiResponse<T> = {
  data: T | undefined
  error: string | null
}

interface daily {
  url: string
  size: number
  contentType: string
}

type DailyResponse = ApiResponse<daily[]>

const getDaily = (): Promise<DailyResponse> => {
  return fetch(`${BASE_URL}?daily=true`).then((res) => res.json()).then((data) => ({
    data,
    error: null
  })).catch((error) => ({
    data: undefined,
    error
  }))

}
export default getDaily

const {data} = await getDaily()

if (data) {
  console.log(data);
  
} else {
  console.log('no data');
  
}