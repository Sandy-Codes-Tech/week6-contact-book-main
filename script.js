// Global Variables
let apiKey = '';
const rootPath = "https://mysite.itvarsity.org/api/ContactBook/";

// Check if the API key exists when page loads
function checkApiKey() {
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
        apiKey = storedApiKey;
        // Show contacts page (show page)
        showContacts();
        //Get contacts (API call)
        getContacts();
    }
}

//Set up the API key and store it
function setApiKey() {
    const inputApiKey = document.getElementById('apiKeyInput').value.trim();

    if (inputApiKey) {
        alert('Please enter an API key.');
        return;
    }

    //Validate the API key 
    fetch(rootPath + "controller/api-key/?apiKey=" + inputApiKey)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            if (data == "1") {
                apiKey = inputApiKey;
                localStorage.setItem("apiKey", apiKey);
                showContacts();
                getContacts();
            } else {
                alert("Invalid API key entered");
            }
        })
        .catch(function (error) {
            alert('Error validating your API key. Please try again.');
        });
}

// Show different pages
function showPage(pageId) { 
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show the selected page
    document.getElementById(pageId).classList.add('active');
}

function showContacts() {
    showPage('contactsPage');
}

function showAddContacts() {
    showPage('addContactPage');
    // Clear the form fields
    document.getElementById('addContactForm').reset();
}

function showEditContact(contactId) {
    showPage('editContactPage');
    // Load the contact for editing
    loadContactForEdit(contactId);
}