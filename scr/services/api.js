export class ApiTab {
    getApi(){
        return axios({
            method: 'GET',
            url: 'https://65f94726df15145246110051.mockapi.io/api/Item',
        })
    }
}

export class ApiItems {
    getApi(){
        return axios({
            method: 'GET',
            url: 'https://65f94649df1514524610fb9a.mockapi.io/dressroom/Api',
        })
    }
}