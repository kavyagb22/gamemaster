const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getHeaders(){
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
    });

    if (!response.ok) {
        // 🛡️ Safe Extraction: Parse as text first to prevent JSON decode crashes
        const errorText = await response.text();
        let errorMessage = `GET request failed with status ${response.status}`;
        
        try {
            const parsedError = JSON.parse(errorText);
            errorMessage = parsedError.detail || errorMessage;
        } catch {
            // Content wasn't JSON (e.g., plain text 401 or proxy error)
            if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
    }
    return response.json();
}

export async function apiPost<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        // 🛡️ Safe Extraction: Parse as text first to prevent JSON decode crashes
        const errorText = await response.text();
        let errorMessage = `POST request failed with status ${response.status}`;
        
        try {
            const parsedError = JSON.parse(errorText);
            errorMessage = parsedError.detail || errorMessage;
        } catch {
            if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
    }
    return response.json();
}


export async function apiPut<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
        // 🛡️ Safe Extraction: Parse as text first to prevent JSON decode crashes
        const errorText = await response.text();
        let errorMessage = `PUT request failed with status ${response.status}`;
        
        try {
            const parsedError = JSON.parse(errorText);
            errorMessage = parsedError.detail || errorMessage;
        } catch {
            if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
    }
    return response.json();
}
