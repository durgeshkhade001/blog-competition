const animationDuration = 1500;

const participantscounter = document.getElementById('participants-counter');
const submissionscounter = document.getElementById('submissions-counter');

const startAnimation = (targetNumber, counter) => {
  let startTime;
  const updateNumber = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / animationDuration, 1);
    const currentNumber = Math.floor(progress * targetNumber);
    counter.innerText = currentNumber;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  };

  requestAnimationFrame(updateNumber);
};

fetch('/api/user/count')
  .then(response => response.json())
  .then(data => {
    startAnimation(data.count, participantscounter);
});


function loadblog(id) {
  document.location.href = `/article?${id}`;
}


let fetchedBlogs;

fetch('/api/blog/public')
  .then(response => response.json())
  .then(data => {
    fetchedBlogs = data;
    startAnimation(data.length, submissionscounter);
    data.forEach(element => {
      let blog = `<div class="blog-card" onclick="loadblog('${element._id}')">
                    <div class="thimbnail"> 
                    <img src="${element.thumbnail}" alt="">
                  </div>
                  <h3>${element.title}</h3>
                  </div>`;
      document.getElementById('blogs').innerHTML += blog;

      if ( element.winner == 1) {
        document.querySelector('#winning-blogs .first img').src = element.thumbnail;
        document.querySelector('#winning-blogs .first h3').innerText = element.title;
      } else if ( element.winner == 2) {
        document.querySelector('#winning-blogs .second img').src = element.thumbnail;
        document.querySelector('#winning-blogs .second h3').innerText = element.title;
      } else if ( element.winner == 3) {
        document.querySelector('#winning-blogs .third img').src = element.thumbnail;
        document.querySelector('#winning-blogs .third h3').innerText = element.title;
      }
    });
    if (fetchedBlogs.length % 3 !== 0) {
      ghostblog = `<div class="blog-card ghost"></div>`;
      document.getElementById('blogs').innerHTML += ghostblog;
    }
    if (fetchedBlogs.length == 0) {
      document.querySelector('h2#no-blogs').classList.remove('hidden');
    }
});

function showBlogsWithCategory(category) {

  if (category == 'All') {
    document.getElementById('blogs').innerHTML = '';
    fetchedBlogs.forEach(element => {
      let blog = `<div class="blog-card" onclick="loadblog('${element._id}')">
                    <div class="thimbnail"> 
                    <img src="${element.thumbnail}" alt="">
                  </div>
                  <h3>${element.title}</h3>
                  </div>`;
      document.getElementById('blogs').innerHTML += blog;
    });
    if (fetchedBlogs.length % 3 !== 0) {
      ghostblog = `<div class="blog-card ghost"></div>`;
      document.getElementById('blogs').innerHTML += ghostblog;
    }
    return;
  }

  let categoryBlogsCount = 0;
  document.getElementById('blogs').innerHTML = '';
  fetchedBlogs.forEach(element => {
    if (element.category == category) {
      categoryBlogsCount++;
      let blog = `<div class="blog-card" onclick="loadblog('${element._id}')">
                    <div class="thimbnail"> 
                    <img src="${element.thumbnail}" alt="">
                  </div>
                  <h3>${element.title}</h3>
                  </div>`;
      document.getElementById('blogs').innerHTML += blog;
    }
    if (categoryBlogsCount == 0) {
      document.querySelector('h2#no-blogs').classList.remove('hidden');
    } else {
      document.querySelector('h2#no-blogs').classList.add('hidden');
    }
  });
}





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





document.querySelector('body').style.opacity = 1;