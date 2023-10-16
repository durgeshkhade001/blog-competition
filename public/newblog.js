if (localStorage.getItem("usersecret") === null) {
    window.location.href = "login";
}

let thumbnail;

function uploadFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('/api/uploadFiles', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.createdFile && data.createdFile.path) {
            const thumbnailImg = document.getElementById('thumbnail');
            thumbnailImg.src = '' + data.createdFile.path;
            thumbnail = data.createdFile.path;
        } else {
            console.error('Error uploading file:', data.error);
            alert('Error uploading file. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
    });
}

function logout() {
    localStorage.removeItem("usersecret");
    window.location.href = "index";
}

function validateInputLength(input, maxLength, fieldName) {
    if (input.length > maxLength) {
        alert(`${fieldName} cannot be more than ${maxLength} characters.`);
        return false;
    }
    return true;
}

function validateTags(tags) {
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].length > 20) {
            alert('Tags cannot be more than 20 characters.');
            return false;
        }
    }
    return true;
}

function saveanpreviewblog(preview) {
    let tags = [];
    const tagsParent = document.getElementById('tags');
    const tagsChildren = tagsParent.children;

    for (let i = 0; i < tagsChildren.length; i++) {
        tags.push(tagsChildren[i].innerText);
    }

    newBlog = {
        title: document.getElementById('title').innerText,
        subtitle: document.getElementById('subtitle').innerText,
        category: document.getElementById('select-category').value,
        thumbnail: thumbnail,
        content: document.querySelector('#content').innerText,
        conclusion: document.querySelector('#conclusion p').innerText,
        tags: tags,
        author: localStorage.getItem("usersecret"),
    }

    if (!validateInputLength(newBlog.title, 100, 'Title')) return;
    if (!validateInputLength(newBlog.subtitle, 100, 'Subtitle')) return;
    if (!validateInputLength(newBlog.content, 10000, 'Content')) return;
    if (!validateTags(newBlog.tags)) return;

    for (const prop in newBlog) {
        if (newBlog[prop] === '') {
            alert('Please fill in all fields.');
            return;
        }
    }

    if (thumbnail === undefined) {
        alert('Please upload a thumbnail.');
        return;
    }

    return fetch('/api/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBlog),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error.message);
            return null;
        }
        savedBlog = data.createdBlog._id;
        if (preview === true) window.open('article?' + savedBlog);
        return savedBlog;
    })
    .catch(error => {
        console.error('Error saving/publishing blog:', error);
        alert('Error saving/publishing blog. Please try again.');
        return null;
    });
}

function saveandpublish() {
    const savedBlogPromise = saveanpreviewblog(false);
    savedBlogPromise.then(savedBlog => {
        if (savedBlog) {
            return fetch('/api/blog/publish/' + savedBlog);
        } else {
            return Promise.reject('Failed to save and preview blog.');
        }
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'dashboard';
    })
    .catch(error => {
        console.error('Error publishing blog:', error);
        alert('Error publishing blog. Please try again.');
    });
}

function publishblog() {
    if (confirm('Once published, you cannot make any changes to your blog.')) {
        saveandpublish();
    } else {
        return;
    }
}

document.querySelector('body').style.opacity = 1;
