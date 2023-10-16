

function logout() {
    localStorage.removeItem('usersecret');
    window.location.href = "index";
}
  
  
var isUserLoggedIn = localStorage.getItem('usersecret');

if (isUserLoggedIn) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('logout').classList.remove('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('register').classList.add('hidden');
} else {
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('logout').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('register').classList.remove('hidden');
}




function convertToHTML(text) {
    // Replace ###text### with <h3>text</h3>
    text = text.replace(/###(.*?)###/g, '<h3>$1</h3>');

    // Replace ##text## with <h2>text</h2>
    text = text.replace(/##(.*?)##/g, '<h2>$1</h2>');
  
    // Replace **text** with <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Replace *text* with <i>text</i>
    text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
  
    // Replace &&codeinside&& with <code>codeinside</code>
    text = text.replace(/&&([^&]+)&&/g, '<pre class="code"><code>$1</code></pre>');
  
    // Replace [url] with <img src="url" alt="Image">
    text = text.replace(/\[([^\]]+)\]/g, '<img src="$1" alt="Image">');
  
    // Wrap paragraphs in <p> tags
    text = text.replace(/([^>\r\n]*)(\r\n|\n\r|\r|\n)/g, '<p>$1</p>');
  
    return text;
}
  





var url = window.location.href;
var urlSplit = url.split('?');
var articleId = urlSplit[1];

fetch('/api/blog/' + articleId)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('title').innerText = data.title;
        document.getElementById('subtitle').innerText = data.subtitle;
        document.getElementById('content').innerHTML = convertToHTML(data.content);
        document.querySelector('#conclusion p').innerText = data.conclusion;
        document.getElementById('category').innerText = data.category;
        document.getElementById('thumbnail').src = "" + data.thumbnail;
        for (var i = 0; i < data.tags.length; i++) {
            var tag = document.createElement('tag');
            tag.innerText = data.tags[i];
            document.getElementById('tags').appendChild(tag);
        }

        const authorId = data.author;
        fetch('/api/user/' + authorId)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                document.querySelector('#author name').innerText = `${data.user.firstName} ${data.user.lastName}`;
                const sem = data.user.year === '1' ? 1 : data.user.year === '2' ? 3 : 5;
                document.querySelector('#author class').innerText = `${data.user.branch}`+ `${sem}` + 'I' + `${data.user.division}`;
            })
            .catch(function(err) {
                console.log(err);
            });
    })
    .catch(function(err) {
        console.log(err);
    });








document.querySelector('body').style.opacity = 1;