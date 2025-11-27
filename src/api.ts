const BASE_URL = 'https://api.racc.lol/raccoon'

interface RaccoonImage {
    url: string
    size: number
    contentType: string
}

type ApiResponse<T> = {
    success: boolean
    data?: T
}

export const getRaccoonImage = async (
    type: 'daily' | 'hourly' | 'weekly'
): Promise<ApiResponse<RaccoonImage>> => {
    try {
        //  const res = await fetch(`${BASE_URL}?${type}=true&json=true`)
        
        const url = new URL(BASE_URL);
        url.search = new URLSearchParams({
            [type]: 'true',
            json: 'true',
        }).toString();
        
        const res = await fetch(url.toString());
        
        if (!res.ok) {
            return { success: false, data: undefined }
        }
        
        return (await res.json()) as ApiResponse<RaccoonImage>
    } catch (error) {
        console.error('Failed to fetch raccoon image:', error)
        return { success: false }
    }
}
