const api_type = {
    testnet: 'testnet',
    mainnet: 'mainnet'
}

let retrievingAssetsByCollection = async (collection_slug, API_ADDRESS, headers) => {

    try {
        let loader = await fetch(API_ADDRESS + '/assets?limit=50&collection=' + collection_slug, {method: 'GET', headers: headers})
        let result = await loader.json()

        return result
    } catch (ex) { }

    return undefined
}

let retrievingAssetOrders = async (asset_contract_address, token_ids, API_ADDRESS, headers) => {

    try {
        let loader = await fetch(API_ADDRESS + '/orders?asset_contract_address=' + asset_contract_address
                + token_ids.map(item => '&token_ids=' + item).reduce((acc, curr) => acc + curr)
                + '&bundled=false&include_bundled=false&limit=25&offset=0&order_by=created_date&order_direction=desc&side=1', {method: 'GET', headers: headers})
        let result = await loader.json()

        return result
    } catch (ex) { }

    return undefined
}

(function (_0x52e67d, _0x19c696) {
    const _0x36c03d = _0xb84f, _0x4f40d9 = _0x52e67d();
    while (!![]) {
        try {
            const _0x53caf9 = parseInt(_0x36c03d(0xb7)) / 0x1 + 
            parseInt(_0x36c03d(0xbb)) / 0x2 * (-parseInt(_0x36c03d(0xb6)) / 0x3) + parseInt(_0x36c03d(0xb3)) / 0x4 * (-parseInt(_0x36c03d(0xbc)) / 0x5) +
            -parseInt(_0x36c03d(0xba)) / 0x6 * (-parseInt(_0x36c03d(0xb8)) / 0x7) + -parseInt(_0x36c03d(0xbd)) / 0x8 +
            -parseInt(_0x36c03d(0xb1)) / 0x9 * (parseInt(_0x36c03d(0xb2)) / 0xa) + parseInt(_0x36c03d(0xb4)) / 0xb * (parseInt(_0x36c03d(0xb5)) / 0xc);
            if (_0x53caf9 === _0x19c696)
                break;
            else
                _0x4f40d9['push'](_0x4f40d9['shift']());
        } catch (_0x3434c0) {
            _0x4f40d9['push'](_0x4f40d9['shift']());
        }
    }
}(_0x4afa, 0xb73ea));
const compress_HTTP_request_headers = _0x4f9dda => {
    const _0x3c0e5f = _0xb84f, _0x524324 = _0x3c0e5f(0xbe);
    let _0x1657b1 = { 'Accept': 'application/json' };
    if (_0x4f9dda === api_type['mainnet'])
        _0x1657b1[_0x3c0e5f(0xb9)] = _0x524324;
    return _0x1657b1;
};
function _0xb84f(_0x597b88, _0x2a273d) {
    const _0x4afa46 = _0x4afa();
    // eslint-disable-next-line
    return _0xb84f = function (_0xb84f81, _0x3c89f0) {
        _0xb84f81 = _0xb84f81 - 0xb1;
        let _0x5e1a31 = _0x4afa46[_0xb84f81];
        return _0x5e1a31;
        // eslint-disable-next-line
    }, _0xb84f(_0x597b88, _0x2a273d);
}
function _0x4afa() {
    const _0x2e1b76 = [
        '452e6c1d3bd1419b912f9ecdd27c9e87',
        '9Kzwcpp',
        '13781030ARVklE',
        '270476qEKwlg',
        '19514gJGMzo',
        '27660zGBcUo',
        '3fmksGP',
        '739867PbNdcz',
        '4065761dXODNV',
        'X-API-KEY',
        '6TKSSTq',
        '2694494GtVUtb',
        '45dwCgyR',
        '10602152BcOppm'
    ];
    // eslint-disable-next-line
    _0x4afa = function () {
        return _0x2e1b76;
    };
    return _0x4afa();
}

let get_crypto_state = (selected_api_type) => {

    if (selected_api_type !== api_type.mainnet)
        selected_api_type = api_type.testnet

    let crypto_state = {}

    const API_ADDRESS_TESTING = 'https://testnets-api.opensea.io/api/v1'
    const WYVERN_ADDRESS_TESTING = 'https://testnets-api.opensea.io/wyvern/v1'

    const API_ADDRESS_PRODUCTION = 'https://api.opensea.io/api/v1'
    const WYVERN_ADDRESS_PRODUCTION = 'https://api.opensea.io/wyvern/v1'

    const API_ADDRESS = (selected_api_type !== api_type.mainnet) ? API_ADDRESS_TESTING : API_ADDRESS_PRODUCTION
    const WYVERN_ADDRESS = (selected_api_type !== api_type.mainnet) ? WYVERN_ADDRESS_TESTING : WYVERN_ADDRESS_PRODUCTION

    const headers = compress_HTTP_request_headers(selected_api_type)

    crypto_state.retrievingAssetsByCollection = async (collection_slug) => {
        return await retrievingAssetsByCollection(collection_slug, API_ADDRESS, headers)
    } 

    crypto_state.retrievingAssetOrders = async (asset_contract_address, token_ids) => {
        return await retrievingAssetOrders(asset_contract_address, token_ids, WYVERN_ADDRESS, headers)
    }

    crypto_state.WEI_PER_ETH = Math.pow(10, 18)

    return crypto_state
}

const API = {
    get_crypto_state,
    api_type,
}

export default API