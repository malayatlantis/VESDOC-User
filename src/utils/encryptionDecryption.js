export function encrypt(data){
    let buff = new Buffer(data);
    return buff.toString('base64')
}
export function decrypt(data){
    let buff = new Buffer(data, 'base64');
    return buff.toString('ascii')
}