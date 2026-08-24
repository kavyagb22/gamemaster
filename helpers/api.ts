const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function getHeaders(){
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

export async function apiGet<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders()
    })
    if (!response.ok){
        const err = await response.json().catch(() => ({}))
        throw new Error(err.detail || `GET request failed with status ${response.status}`)
    }
    return response.json()
}

export async function apiPost<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined
    })
    if (!response.ok){
        const err = await response.json().catch(() => ({}))
        throw new Error(err.detail || `POST request failed with status ${response.status}`)
    }
    return response.json()
}

