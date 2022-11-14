var socket = io('http://localhost:3000');

const onlineUsersElem = document.getElementById("online-users");

socket.on('online-users',(data) => {
    console.log(data)
    onlineUsersElem.innerText = data
})
