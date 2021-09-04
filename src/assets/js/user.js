
document.getElementById('formsubmit').addEventListener('click', (e)=>e.preventDefault());
//todos los submit buttons tienen que tener ese id id^

function validateEmail(mail){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
        return (true)
    }
    return (false)
}

async function fetch_nicknames() { 
    const rawResponse = await fetch('http://stockmarketapi.tk/users', {
        method: 'GET'})
    .then(res => res.json())
    .then(res => {return res});
    return rawResponse;
}

async function store() {
    var nickname = document.getElementById('nickname');
    var pw1 = document.getElementById('pw1');
    var pw2 = document.getElementById('pw2');
    var umail = document.getElementById('umail');

    if(nickname.value.length == 0){
        alert('Please fill in your nickname');

    }else if(pw1.value.length == 0){
        alert('Please fill in your password');

    }else if(pw2.value.length == 0){
        alert('Please confirm your password');

    }else if(umail.value.length == 0){
        alert('Please fill in your mail');

    }else if(pw1.value != pw2.value){
        alert("Passwords don't match");

    }else if(!validateEmail(umail.value)){
        alert("You have entered an invalid email address!")
    }
    else{
        var newUser = {nickname: nickname.value, password: pw1.value, email: umail.value}
        let nicknameList = await fetch_nicknames();
        if(nicknameList[0]){
            //Si hay usuarios
            var conflictUser = nicknameList.find(user=>user.nickname===nickname.value);
            
            if(conflictUser){
                alert('Username taken');
            }else{
                (async () => {
                    let userId = await fetch('http://stockmarketapi.tk/sign_up', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(newUser)
                    })
                    .then(res => res.json())
                    .then(res => {return res});
                    
                    let current_user = {
                        nickname: newUser.nickname,
                        id: userId
                    };
                    localStorage.setItem('current_user', JSON.stringify(current_user));
                  })();

                alert('Your account has been created');
                //se crea un usuario en userlist
                window.location = './index loged.html';
            }
        }else{
            (async () => {
            	let userId = await fetch('http://stockmarketapi.tk/sign_up', {
            		method: 'POST',
            		headers: {
            			'Accept': 'application/json',
            			'Content-Type': 'application/json'
            		},
            		body: JSON.stringify(newUser)
            	})
            	.then(res => res.json())
            	.then(res => {return res});

            	let current_user = {
            		nickname: newUser.nickname,
            		id: userId
            	};
            	localStorage.setItem('current_user', JSON.stringify(current_user));
            })();

            alert('Your account has been created');
            //Se crea un usuario junto a la userlist

            window.location = './index loged.html';
        }
    }
}


async function check(){
    var nickName = document.getElementById('nickName').value;
    var userPw = document.getElementById('userPw').value;
    let nicknameList = await fetch_nicknames();
    if(nicknameList[0]){
        var user = nicknameList.find(nickItem=>nickItem.nickname === nickName);

        if(!user){
            alert('Username is wrong');
        }else{
            if(user.password !== userPw){
                alert('Wrong password');
            }else{
                let current_user = {
                        nickname: user.nickname,
                        id: user.id
                    };
                    localStorage.setItem('current_user', JSON.stringify(current_user));         
                


                //login success
                alert('Login success');

                window.location = './index loged.html';
            }
        }
    }else{
        alert('No users registered');
    }
}