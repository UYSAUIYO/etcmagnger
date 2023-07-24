const DEV_BaseUrl = {
    baseUrl: 'http://localhost:8080'
}

const PRO_BaseUrl = {
    baseUrl: 'https://api.etherealcraft.cn'
}
export default process.env.NODE_ENV === 'development' ? DEV_BaseUrl : PRO_BaseUrl