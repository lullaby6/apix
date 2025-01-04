function apix(url, options = {}) {
    const method = options?.method ?? "GET";
    const body = options?.body ?? null;

    const retries = options?.retries ?? 0;
    const retryDelay = options?.retryDelay ?? 1000;
    const timeout = options?.timeout ?? 10000;

    const controller = new AbortController();
    const signal = controller.signal;
    let timeoutId = null;

    const retry = async (attempt = 0) => {
        try {
            timeoutId = setTimeout(() => controller.abort(), timeout);

            const requestOptions = {
                ...options,
                headers: {
                    ...(method !== "GET" && body ? { "Content-Type": "application/json" } : {}),
                    ...(options.headers || {}),
                },
                ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
                signal,
            };

            const response = await fetch(url, requestOptions);

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else {
                throw new Error("Response is not in JSON format");
            }
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === "AbortError") {
                throw new Error("Request timed out");
            } else if (attempt < retries) {
                console.warn(`Retry attempt ${attempt + 1} failed: ${error.message}`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                return retry(attempt + 1);
            } else {
                console.error(`Request failed:`, error);
                throw error;
            }
        }
    };

    return retry();
}

module.exports = apix;