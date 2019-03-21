export {getCookie, setCookie}

let getCookie = function(name) {
    let cookies = document.cookie.split(';');
    for(let i=0 ; i < cookies.length ; ++i) {
        let pair = cookies[i].trim().split('=');
        if(pair[0] === name)
            return pair[1];
    }
    return null;
};

let setCookie = username => document.cookie = 'username=' + username;