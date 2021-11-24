import {imageBaseUrl} from './Constants';

export const getImageUrl = (id, thumbnail) => {
    return `${imageBaseUrl}${(id?.split(':')[0])}/p/f/m/${thumbnail}`;
}