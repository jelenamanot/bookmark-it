//Listening to the submit event
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Get input values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    //If user doesn't pass validation, return false
    if(!validateForm(siteName, siteUrl)) {
        return false;
    }
    
    //Bookmark object
    var bookmark = {
        name: siteName,
        url: siteUrl
    };
    
    if (localStorage.getItem('bookmarks') === null) {
        //Initialize array
        var bookmarks = [];
        //Adding single bookmark to bookmarks array
        bookmarks.push(bookmark);
        //setItem
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //strings
    }
    else {
        //getItem
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //JSON values
        //Add new bookmark to the bookmarks array
        bookmarks.push(bookmark);
        //Set it back to the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //strings
    }
    
    document.getElementById('myForm').reset();
    
    //Without refreshing, show bookmarks
    fetchBookmarks();
    
    //Prevent form from submitting
    e.preventDefault(e);
}

//Delete bookmark
function deleteBookmark(url) {
    //Get all bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //strings
    
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
           bookmarks.splice(i,1);
        }
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 
    
    //Without refreshing, show bookmarks
    fetchBookmarks();
}

//Show bookmarks
function fetchBookmarks() {
    //Get all bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //strings
    //Get bookmarks results div
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    bookmarksResults.innerHTML = '';
    
    //Showing values using for loop
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">' + 
                                      '<h3>'+ name +
                                      ' <a class="right btn btn-danger" onclick="deleteBookmark(\''+url+'\')" href="#">Delete It</a>' +
                                      ' <a class="right btn btn-success" target="_blank" href="'+url+'">Visit It</a>'
                                      '</h3>' +
                                      '</div>';
    }
}
//Validate inputs
function validateForm(siteName, siteUrl) {
    
    if(!siteName || !siteUrl) {
        alert('Please fill in the form.');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)) {
        alert('Please enter a valid URL.');
        return false;
    }
    
    return true;
}