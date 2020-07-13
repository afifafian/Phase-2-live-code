
$(document).ready(function(){
    if (localStorage.token) {
        $("#buttonAdd").show()
        $("#buttonLogout").show()
        $("#login-form").hide()
        fetchPassword()
    } else {
        $("#buttonAdd").hide()
        $("#buttonLogout").hide()
        $("#login-form").show()
        $("#add-form").hide()
        $("#no-list").hide()
        $("#password-list").hide()
    }
});

function afterLogin(event) {
    event.preventDefault()
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/login',
        data: {email: email, password: password}
    })
    .done(function(data){
        localStorage.token = data.access_token
        fetchPassword()
        $("#buttonAdd").show()
        $("#buttonLogout").show()
        $("#login-form").hide()
        $("#password-list").show()
    
    })
    .fail(function(err){
        console.log(err.responseJSON)
    })
    .always(function(_){
        email = $("#emailLogin").val('')
        password = $("#passwordLogin").val('')
    })
}

function fetchPassword() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3001/passwords',
        headers: {access_token:localStorage.token}
    })
    .done(function(data){
        $('#password-list').empty()

        for (let i = 0; i < data.length; i++) {
            $('#password-list').append(`
            <div class="col md-4">
              <div class="card mb-4 box-shadow">
                <div class="card-body">
                  <h5 class="card-title">${data[i].name}</h5>
                  <p class="card-text">${data[i].url}</p>
                  <p class="card-text">${data[i].username}</p>
                  <p class="card-text">${data[i].password}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group mx-auto">
                      <button type="button" class="btn btn-sm btn-outline-danger" onclick="afterDelete(${data[i].id}, event)">Delete Password</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `)
        }
        if (data.length === 0) {
            $("#no-list").show()
        } else {
            $("#no-list").hide()
        }
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(_){
        $("#add-form").hide()
        
    })
}

function addForm(){
    $("#add-form").show()
    $("#password-list").hide()
}

function afterAdd(event) {
    event.preventDefault()
   
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/passwords',
        data: {
            name: $("#nameAdd").val(),
            url: $("#urlAdd").val(), 
            username: $("#usernameAdd").val(),
            password:$("#passAdd").val()
        },
        headers: {access_token:localStorage.token}
    })
    .done(function(data){
        console.log(data)
        $("#add-form").hide()
        $("#password-list").show()
        fetchPassword()
    
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(_){
        $("#nameAdd").val(''),
        $("#urlAdd").val(''), 
        $("#usernameAdd").val(''),
        $("#passAdd").val('')
    })
}

function afterDelete(id, event) {
    event.preventDefault()
   
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3001/passwords/${id}`,
        headers: {access_token: localStorage.token}
    })
    .done(function(data){
        console.log(data)
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(_){
        fetchPassword()
        console.log(`ALWAYS KETIKA DELETE`)
    })
}

function afterLogout() {
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()
    localStorage.clear()
    $("#login-form").show()
    $("#password-list").hide()
    $("#buttonAdd").hide()
    $("#buttonLogout").hide()
    email = $("#emailLogin").val('')
    password = $("#passwordLogin").val('')
}