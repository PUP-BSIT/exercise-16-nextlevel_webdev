document.addEventListener("DOMContentLoaded", function () {
// Enable the "Comment" button when both fields are filled out
const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");
const commentButton = document.getElementById("comment_button");
const commentDisplay = document.getElementById("comment_Display");

nameInput.addEventListener("input", toggleCommentButton);
commentInput.addEventListener("input", function () {
    toggleCommentButton();
        commentDisplay.textContent = commentInput.value;
});

function toggleCommentButton() {
    commentButton.disabled = !(nameInput.value && commentInput.value);
}

document.getElementById('comment_form').addEventListener('submit', 
function(event) {
event.preventDefault(); 

const name = nameInput.value;
const comment = commentInput.value;

const newComment = document.createElement('div');
newComment.classList.add('comment');
newComment.innerHTML = `<strong>${name}:</strong> ${comment}`;

commentDisplay.insertBefore(newComment, commentDisplay.firstChild);

nameInput.value = '';
commentInput.value = '';

commentButton.disabled = true;
});
});

$("#searchBtn").click(function() {
    let country = $("#countrySearch").val();
    let region = "";

$.getJSON("https://restcountries.com/v3.1/name/" + country, function(data) {
    $("#countryDetails").html("<h2>" + data.name.common + "</h2><p>Capital: " 
        + data.capital + "</p><p>Population: " + data.population + "</p>");
        region = data.region;
});

$.getJSON("https://restcountries.com/v3.1/region/" + region, function(data) {
    let relatedCountriesHTML = "<h3>Other countries in " + region + 
        ":</h3><ul>";

    for (let i = 0; i < data.length; i++) {
        relatedCountriesHTML += "<li>" + data[i].name.common + "</li>";
    }
    
    relatedCountriesHTML += "</ul>";
    $("#relatedCountries").html(relatedCountriesHTML);
    });
});
