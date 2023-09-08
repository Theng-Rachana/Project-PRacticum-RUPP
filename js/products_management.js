$(document).ready(function(){
    $.get("http://localhost:3000/Products",function(data,status){
        $("#card").html('');
        $.each(data,function(key, acc){
            $("#card").append(
                `<div id="containers">
                <img src="${acc.image}">
                <p id="til" style="width: 300px;text-align: start;">${acc.title}</p>
                <p>${acc.category}</p>
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
            price : document.getElementById("prices").value,
            image : document.getElementById("images").value,
            category : document.getElementById("categories").value,
        },
        );
        alert("Product successful add.");
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