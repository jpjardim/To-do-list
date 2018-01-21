document.getElementById('myForm').addEventListener('submit', saveBookmark);

//fetch all the stored bookmarks from local storage


function saveBookmark(e) {
    //Get values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

    //create an object with two attributes
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //check if local storage is empty
    if (localStorage.getItem('bookmarks') === null) {

        //create an array and push a bookmark
        var bookmarks = [];
        bookmarks.push(bookmark);

        /*
        Save object bookmarks to local storage
        Parse the JSON object to string, as local storage only store strings
        */
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    else {
        /*
        get bookmarks from local storage
        As you saved save to local storage as string, we parse it back to JSON
        */        
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();
    
    fetchBookmarks();
    //Prevent form from submiting
    e.preventDefault();
}



//delete the url from the list
function deleteBookmark(url) {
    //fetch the list from the storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //loop throug the list
    for (var j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].url === url) {
            //remove the item from position 'j'
            bookmarks.splice(j, 1);
        }
    }
    
    //reset the array into local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //refetch bookmark
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var result = document.getElementById("bookmarksResults");
    
    //clean bookmarksResults before setting it again
    result.innerHTML = '';
    
    //build output    
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        result.innerHTML += '<div>' + name + ' - ' + '<a target="_blank" href="'+url+'">Visit</a>' + ' - ' + '<button onclick="deleteBookmark(\''+url+'\')">Delete</button>' + '</div>';
    }
    
}
