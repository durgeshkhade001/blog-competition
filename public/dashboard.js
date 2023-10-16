

if (localStorage.getItem("usersecret") === null) {
    window.location.href = "login";
}

var usersecret = localStorage.getItem("usersecret");

var user = {};

fetch("/api/user/" + usersecret)
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            user = data.user;
            document.querySelector("#welcome-msg name").textContent = user.firstName + " " + user.lastName;
        }
    })
    .catch((err) => {
        console.log(err);
    });

var blogs = [];

console.log(`/api/blog/author/${usersecret}`);
fetch(`/api/blog/author/${usersecret}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            blogs = data;
            blogs.forEach((blog) => {
                var blogCard = document.createElement("div");
                blogCard.classList.add("blog-card");
                const isBlogReviewed = blog.reviewed;
                if (isBlogReviewed == "true") {
                    blogCard.innerHTML = `
                        <img src="${blog.thumbnail}" alt="">
                        <h3>${blog.title}</h3>
                        <div class="buttons">
                            <a href="${`/article?${blog._id}`}"><button class="publish"><i class="fa-solid fa-location-arrow"></i>&nbsp; Published</button></a>
                            <a class ="done-review review-status"><button class="review"><i class="fa-regular fa-circle-check"></i>&nbsp; Reviewed</button></a>
                        </div>
                    `;
                } else if (isBlogReviewed == "rejected") {
                    blogCard.innerHTML = `
                        <img src="${blog.thumbnail}" alt="">
                        <h3>${blog.title}</h3>
                        <div class="buttons">
                            <a href="${`/article?${blog._id}`}"><button class="publish"><i class="fa-solid fa-location-arrow"></i>&nbsp; Published</button></a>
                            <a class ="rejected-review review-status"><button class="review"><i class="fa-solid fa-ban"></i>&nbsp; Rejected</button></a>
                        </div>
                    `;
                }
                
                else {blogCard.innerHTML = `
                        <img src="${blog.thumbnail}" alt="">
                        <h3>${blog.title}</h3>
                        <div class="buttons">
                            <a href="${`/article?${blog._id}`}"><button class="publish"><i class="fa-solid fa-location-arrow"></i>&nbsp; Published</button></a>
                            <a class ="under-review review-status"><button class="review"><i class="fa-regular fa-compass"></i>&nbsp; Review Pending</button></a>
                        </div>
                    `;
                }
                
                document.querySelector("#blogs").appendChild(blogCard);
            });

                
            if (blogs % 3 !== 0) {
                ghostblog = `<div class="blog-card ghost"></div>`;
                document.getElementById('blogs').innerHTML += ghostblog;
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });


function newBlog() {
    if (blogs.length >= 5) {
        alert("You have reached the limit of 5 blogs.");
        return;
    } else {
        window.location.href = "newblog";
    }
}






function logout() {
    localStorage.removeItem("usersecret");
    window.location.href = "index";
}




document.querySelector('body').style.opacity = 1;