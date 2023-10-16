// const password = prompt("Enter password to continue");
// if (password !== "admin@123456") {
//     location.replace("index");
// }



var blogs = [];

fetch(`/api/blog/published`)
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
                if (isBlogReviewed !== "true" && isBlogReviewed !== "rejected") {
                    blogCard.innerHTML = `
                        <img src="${blog.thumbnail}" alt="">
                        <h3>${blog.title}</h3>
                        <div class="buttons">
                            <a href="${`/article?${blog._id}`}"><button class="publish"><i class="fa-solid fa-location-arrow"></i>&nbsp; Published</button></a>
                            <div>
                                <button onclick="acceptBlog('${blog._id}')" class="review accept">Accept</button>
                                <button onclick="rejectBlog('${blog._id}')" class="review reject">Reject</button>
                            </div>
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



function acceptBlog(id) {
    alert("Blog accepted");
    fetch(`/api/blog/accept/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function rejectBlog(id) {
    alert("Blog rejected");
    fetch(`/api/blog/reject/${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}









document.querySelector('body').style.opacity = 1;