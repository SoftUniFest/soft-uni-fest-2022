import { getOptions, request } from "./requester";

export const get = async (url) => {
    if (!url)
        throw new Error('Invalid params in crud.get()');

    const options = await getOptions('get');
    return await request(url, options);
}

export const post = async (url, data) => {
    if (!url || !data)
        throw new Error('Invalid params in crud.post()');

    const options = await getOptions('post', data);
    return await request(url, options);
}

export const put = async (url, data) => {
    if (!url || !data)
        throw new Error('Invalid params in crud.put()');

    const options = await getOptions('put', data);
    return await request(url, options);
}

export const del = async (url) => {
    if (!url)
        throw new Error('Invalid params in crud.del()');

    const options = await getOptions('delete');
    return await request(url, options);
}