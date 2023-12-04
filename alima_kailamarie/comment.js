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

async function searchCountry() {
const countryName = document.getElementById('country-name').value;
const response = await 
    axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    
if (response.data.length > 0) {
    const country = response.data[0];
    const countryInfo = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital[0]}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area}</p>
        <p>Timezones: ${country.timezones.join(', ')}</p>
        `;

const region = country.region;
const similarCountries = await 
    axios.get(`https://restcountries.com/v3.1/region/${region}`);

const similarCountriesList = `
    <h3>Countries in the same region</h3>
        <ul>
        ${similarCountries.data.map(country => `<li>
            ${country.name.common}</li>`).join('')}
        </ul>
        `;

document.getElementById('country-info').innerHTML = countryInfo;
document.getElementById('similar-countries').innerHTML = similarCountriesList;
    } else {
        document.getElementById('country-info').innerHTML = 
            '<p>No country found</p>';
        document.getElementById('similar-countries').innerHTML = '';
      }
    }
