interface PostData {
        latitude: number;
        longitude: number;
        offset: number;
};

async function postData(url: string = '', data: PostData): Promise<any> {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};
export default postData;