const axios = require('axios');
var token;
const orangehrmurl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/'
const opencrxconfig = {
    headers:{
        'Accept':'application/json'
    },
    auth:{
        username: 'guest',
        password: 'guest'
    } 
}

const orangehrmtokenconfig = {
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'ELMuhtadi',
    password: 'Wajdidhcu99!'
}

async function executeopencrxcall(restcallstring){
    return await axios.get(restcallstring,opencrxconfig);
}

async function getorangehrmtoken(){
    const tokenreq = await axios.post('https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken',orangehrmtokenconfig);
    token = tokenreq.data.access_token;
}

async function executegetorangehrmcall(restcallstring){
    return await axios.get(orangehrmurl + restcallstring,{headers:{ Authorization: `Bearer ${token}` }});
}

async function executepostorangehrmcall(restcallstring,formData){
    return await axios.post(orangehrmurl + restcallstring,formData,{headers:{ Authorization: `Bearer ${token}`,'Content-Type': `multipart/form-data; boundary=${formData._boundary}`}});
}

module.exports = {executeopencrxcall,getorangehrmtoken,executegetorangehrmcall,executepostorangehrmcall};