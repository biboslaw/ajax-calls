document.addEventListener("DOMContentLoaded", main());

function main() {
    var button = document.querySelector('button')
    var count = 1
    button.addEventListener('click', function () {
        getJSON(count, button)
        count++
    })
}

function getJSON(count, button) {
    console.log(count)
    var url = 'https://learnwebcode.github.io/json-example/animals-' + count + '.json'
    // getting data by XMLHttpRequest
    if (count === 1) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = function () {
            var data = xhr.response
            fillDiv(data)
        }
        xhr.send()
        // getting data by fetch()    
    } else if (count === 2) {
        fetch(url).then(function (response) {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Request failed!')
        }, function (networkError) {
            console.log(networkError.message)
        }).then(function (jsonResponse) {
            fillDiv(jsonResponse)
            return jsonResponse
        })
        // getting data by jQuery  
    } else if (count === 3) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success(response) {
                fillDiv(response)
            },
            error(jqXHR, status, errorThrown) {
                console.log(jqXHR)
            }
        })
        button.classList.add('hidden')
    }
}

function fillDiv(ajaxObiect) {
    var p
    var divContent = ""
    var mainDiv = document.querySelector('#main')
    var textNode;
    for (var i = 0; i < ajaxObiect.length; i++) {
        divContent = ajaxObiect[i].name + ' is a ' + ajaxObiect[i].species  + ' and likes: '
        for (var j = 0; j<ajaxObiect[i].foods.likes.length; j++){
            if (j===0   ){
                divContent += ajaxObiect[i].foods.likes[j]
            } else {
                divContent += " and " + ajaxObiect[i].foods.likes[j]
            }
        }
        divContent += ' and dislikes: '
        for (var j = 0; j<ajaxObiect[i].foods.dislikes.length; j++){
            if (j===0   ){
                divContent += ajaxObiect[i].foods.dislikes[j]
            } else {
                divContent += " and " + ajaxObiect[i].foods.dislikes[j]
            }
        }
        p = document.createElement('p')
        textNode = document.createTextNode(divContent)
        p.appendChild(textNode)
        mainDiv.appendChild(p)
        textNode = ""
        p = ""
    }
}
