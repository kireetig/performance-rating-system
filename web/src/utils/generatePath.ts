import * as _ from 'lodash';

export const generateLink = (url:string, params:any) => {
    let dupUrl = url;
    _.map(params, (value, key) => {
        dupUrl = dupUrl.replace(`:${key}`, value);
    });
    return dupUrl;
}