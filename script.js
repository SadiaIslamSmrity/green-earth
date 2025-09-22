const categoryContainer = document.getElementById("categoryContainer");
const postContainer = document.getElementById("postContainer");
const cartbox = document.getElementById("cartbox");
const moneycount = document.getElementById("moneycount");
const modalContainer = document.getElementById("modalContainer");
const treeModal = document.getElementById("treeModal");

let cartarr = []
let count = 0;
// const alltrees = document.getElementById("alltrees");

const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
        const categories  = data.categories
        // console.log(categories)
        showCategory(data.categories)
    })
}; 
const showCategory = (categories) => {
    categoryContainer.innerHTML = `
            <li class="hover:bg-green-300 hover:w-full hover:text-left list-none p-1">All trees</li>`
    categories.forEach(cat =>  {
            categoryContainer.innerHTML += `
            <li id="${cat.id}" class="hover:bg-green-300 hover:w-full hover:text-left list-none p-1">
            ${cat.category_name}
            </li>
        `
        });
        categoryContainer.addEventListener('click', (e)=> {
            const allLi = document.querySelectorAll("li");
            allLi.forEach((li) => {
                li.classList.remove("bg-green-600");
            });
            if(e.target.localName === "li"){
                e.target.classList.add("bg-green-600");
                loadByCategory(e.target.id)
            }
        });
        categoryContainer.addEventListener('click',(e) => {
    if(e.target.innerText === 'All trees')
    {
        loadPostAllTrees(e)
    }
})
};

const loadPostAllTrees = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        displayPosts(data.plants);
        loadTreeDetails(data.plants.id);
    });
};
const displayPosts = (posts) => {
    postContainer.innerHTML = "";
    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.innerHTML = `
        <div class="h-[370px] w-55 h-auto lg:w-[260px] p-3 bg-white space-y-2 rounded-lg">
                    <img src="${post.image}" alt="" class="h-h-auto w-full">
                    <p class="treeName font-bold">${post.name}</p>
                    <p class="text-sm">${post.description}</p>
                    <div class="flex justify-between">
                        <p class="bg-green-100 h-10 p-2 rounded-full text-green-800 text-sm text-center">${post.category}</p>
                        <p class="font-bold">৳${post.price}</p>
                    </div>
                    <button class="p-4 rounded-full bg-green-700 h-10 w-full flex justify-center items-center hover:bg-green-900 hover:text-white">Add to Cart</button>
                </div>
        `;
        postContainer.appendChild(postCard);
    });
    
};
postContainer.addEventListener('click', (e) => {
    if(e.target.innerText === 'Add to Cart')
    {
        handlebutton(e)
    }
    })
const loadByCategory = (plantsID) => {
    fetch(`https://openapi.programming-hero.com/api/category/${plantsID}`)
    .then(res => res.json())
    .then(data => {
        showPLantsByCat(data.plants)
    })
}
const showPLantsByCat = (plants) => {
    postContainer.innerHTML = ""
    plants.forEach((plants) => {
        const postCard2 = document.createElement("div");
        postCard2.innerHTML = `
        <div class="h-[370px] w-55 h-auto lg:w-[260px] p-3 bg-white space-y-2 rounded-lg">
                    <img src="${plants.image}" alt="" class="h-auto w-full">
                    <p class="treeName font-bold">${plants.name}</p>
                    <p class="text-sm">${plants.description}</p>
                    <div class="flex justify-between">
                        <p class="bg-green-100 h-10 p-2 rounded-full text-green-800 text-sm text-center">${plants.category}</p>
                        <p class="font-bold">৳${plants.price}</p>
                    </div>
                    <button class="p-4 rounded-full bg-green-700 h-10 w-full flex justify-center items-center hover:bg-green-900 hover:text-white">Add to Cart</button>
                </div>
        `;
        postContainer.appendChild(postCard2);
    });
}
postContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains("treeName"))
    {
        // console.log(e.target.parentNode);
        modal(e.target.parentNode);
    }
    })
const modal = (treeName) => {
    // console.log(treeName)
    document.getElementById("modalTitle").innerText = treeName.children[1].innerText;
   document.getElementById("modalBody").innerHTML = `
   <img src="${treeName.children[0].src}" class="h-70 w-auto">
   <p><span class="font-bold">Category:</span> ${treeName.children[3].children[0].innerText}</p>
   <p><span class="font-bold">Price:</span> ${treeName.children[3].children[1].innerText}</p>
   <p><span class="font-bold">Description:</span> ${treeName.children[2].innerText}</p>
   `;
   document.getElementById("tree_modal").checked = true;
};

const handlebutton = (e) => {
    const name = e.target.parentNode.children[1].innerText
    const price = e.target.parentNode.children[3].children[1].innerText
        cartarr.push({
            name: name,
            price: price
        })
        showincart(cartarr);
        total(cartarr);
}
let tk = 0;
const total = (data) => {
    data.forEach(data => {
        tk = data.price.slice(0, 0) + data.price.slice(0 + 1);
    })
    count = count + parseInt(tk);
    moneycount.innerText = count;
}

cartbox.addEventListener('click', (e) => {
    if(e.target.innerText === 'X')
    {
        deletebutton(e);
    }
    })
const deletebutton = (e) => {
    const toDelete = e.target.parentNode.children[0].children[0].innerText
    const toCount = e.target.parentNode.children[0].children[1].innerText
    // console.log(toDelete)
    cartarr = cartarr.filter(item => item.name !== toDelete)
    showincart(cartarr);
    afterdelete(toCount);
} 
const showincart = (cartarr) => {
    cartbox.innerHTML = ""
    cartarr.forEach((data) => {
        cartbox.innerHTML += `
        <div id="buttonparent" class="bg-green-100 rounded flex justify-between items-center">
        <div>
        <p class="font-semibold">${data.name}</p>
        <p class="font-thin">${data.price}</p>
        </div>
        <button id="delete" class="btn bg-green-50 text-red-600">X</button>
        </div>
        `
    })
}
const afterdelete = (data) => {
    tk2 = data.slice(0, 0) + data.slice(0 + 1);
    count = count - parseInt(tk2);
    moneycount.innerText = count;
}






window.onload = () => {
  loadPostAllTrees();
};

loadCategory();