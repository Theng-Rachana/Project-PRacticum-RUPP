$(document).ready(function(){
    $.get("http://localhost:3000/Products",function(data,status){
        $("#card").html('');
        $.each(data,function(key, acc){
            $("#card").append(
                `<div id="containers">
                <img src="${acc.image}">
                <p id="til">${acc.title}</p>
                <button id="deletebtn" onclick="deleteBook(`+acc.id+`)">delete</button>
                </div>`
            )
        })
    });
});
$(document).ready(function(){
    $("button").click(function(){
        $.post("http://localhost:3000/Products",
        {   
            title : document.getElementById("productNames").value,
            price : Number(document.getElementById("prices").value),
            image : document.getElementById("images").value,
            category : document.getElementById("categories").value,
        },
        );
    })
});
function deleteBook(id){
    $.ajax({
        url: 'http://localhost:3000/Products/'+id,
        method: 'DELETE',
        success: function () {
            alert('record has been deleted');
            getAllBooks();
        },
        error: function (error) {
            alert(error);
        }
    })
}