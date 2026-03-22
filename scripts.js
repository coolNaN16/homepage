class post {
    constructor(title, content, type, layout, text_align) {
        this.title = title
        this.content = content
        this.type = type
        this.layout = layout
        this.text_align = text_align
    }
}

// ↓ Home Posts ↓

let posts = [
    // new post("Hello World!",
    //     "Welcome to my website! <br> ",
    //     "section",
    //     "flex-start",
    //     "left"
    // ), 
    // new post("About Me",
    //     "<span class='bold'>Hello there</span>, my name is Kenzie!, <br> I made this website for fun, maybe to post stuffs but idk <br><br> <img src='images/conan_yawn.jpg' style='height: 250px; aspect-ratio: 1;'> <br><br> I really like Detective Conan, as you can see, <br> other than that, I like Sherlock, Death Note, and maybe Dr. Who. <br> I also like programming, making games, websites, etc. <br>",
    //     "section",
    //     "flex-start",
    //     "left"
    // ),
]

// Self explanatory ↓

let games_posts = []

let gallery_posts = [
    // new post("Image Test",
    //     "<img src='images/coolNaN16_2.webp'> <br> Image",
    //     "section",
    //     "flex-start",
    //     "left"
    // ),
]

let links_posts = [
    // new post("Socials",
    //     "<img src='images/coolNaN16_2.webp' style='width: 200px; aspect-ratio: 1;'> <br><br> <label class='bold'>Discord: </label> <a href='https://www.google.com/'>@kenzie_cool16</a> <br>",
    //     "section",
    //     "flex-start",
    //     "left"
    // ),

]

// aside posts are visible on all pages ↓

let aside_posts =  [
    // new post("Socials",
    //     "<img src='images/coolNaN16_2.webp' style='width: 100px; aspect-ratio: 1;'> <br><br> <a href='https://www.google.com/'>@kenzie_cool16</a> <br>",
    //     "aside",
    //     "center",
    //     "center"
    // ),
]

function goto(url) {
    if (!window.location.href.includes(url)) {
        window.location.href = url
    }
}

// XMLHTTP

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            inputXML(this)
        }
    };
    xhttp.open("GET", "xml_files/posts.xml", true);
    xhttp.send();
}

function inputXML(xml) {
    let response = xml.responseXML
    let doc = response.getElementsByTagName("doc")
    let postL = response.getElementsByTagName("post")
    // let home = response.getElementsByTagName("home")
    // let gallery = response.getElementsByTagName("gallery")
    // let games = response.getElementsByTagName("games")
    // let links = response.getElementsByTagName("links")

    console.log(doc)

    for (let i = 0; i < postL.length; i++) {
        let loc = postL[i].getElementsByTagName("loc")[0].innerHTML.trim()
        console.log(loc)
        let postH = new post(
                            postL[i].getElementsByTagName("title")[0].innerHTML, 
                            postL[i].getElementsByTagName("content")[0].innerHTML.replace("]]>", ""), 
                            postL[i].getElementsByTagName("type")[0].innerHTML.trim(),  
                            postL[i].getElementsByTagName("flex-align")[0].innerHTML.trim(), 
                            postL[i].getElementsByTagName("text-align")[0].innerHTML.trim()
                            )
        if (loc == "home") {
            posts.push(postH)
            console.log("Pushed to home!")
        } else if (loc == "gallery") {
            gallery_posts.push(postH)
            console.log("Pushed to gallery!")
        } else if (loc == "games") {
            games_posts.push(postH)
            console.log("Pushed to games!")
        } else if (loc == "links") {
            links_posts.push(postH)
            console.log("Pushed to links!")
        } else {
            aside_posts.push(postH)
            console.log("Pushed Aside!")
        }
                            
    }

    // for (let i = 0; i < gallery.length; i++) {
    //     let postH = new post(
    //                         gallery[i].getElementsByTagName("title")[0].innerHTML, 
    //                         gallery[i].getElementsByTagName("content")[0].innerHTML.replace("]]>", ""), 
    //                         gallery[i].getElementsByTagName("type")[0].innerHTML.trim(),  
    //                         gallery[i].getElementsByTagName("flex-align")[0].innerHTML.trim(), 
    //                         gallery[i].getElementsByTagName("text-align")[0].innerHTML.trim()
    //                         )
    //     gallery_posts.push(postH)
    // }

    // for (let i = 0; i < games.length; i++) {
    //     let postH = new post(
    //                         games[i].getElementsByTagName("title")[0].innerHTML, 
    //                         games[i].getElementsByTagName("content")[0].innerHTML.replace("]]>", ""), 
    //                         games[i].getElementsByTagName("type")[0].innerHTML.trim(),  
    //                         games[i].getElementsByTagName("flex-align")[0].innerHTML.trim(), 
    //                         games[i].getElementsByTagName("text-align")[0].innerHTML.trim()
    //                         )
    //     games_posts.push(postH)
    // }

    // for (let i = 0; i < links.length; i++) {
    //     let postH = new post(
    //                         links[i].getElementsByTagName("title")[0].innerHTML, 
    //                         links[i].getElementsByTagName("content")[0].innerHTML.replace("]]>", ""), 
    //                         links[i].getElementsByTagName("type")[0].innerHTML.trim(),  
    //                         links[i].getElementsByTagName("flex-align")[0].innerHTML.trim(), 
    //                         links[i].getElementsByTagName("text-align")[0].innerHTML.trim()
    //                         )
    //     links_posts.push(postH)
    // }

    document.getElementById("section-column").innerHTML = ""
    document.getElementById("aside-column").innerHTML = ""
    if (window.location.href.includes("index.html")) {
        loadPosts(posts)
    } else if (window.location.href.includes("gallery.html")) {
        loadPosts(gallery_posts)
    } else if (window.location.href.includes("games.html")) {
        loadPosts(games_posts)
    } else if (window.location.href.includes("links.html")) {
        loadPosts(links_posts)
    } else {}
    loadPosts(aside_posts)
    
}

function loadPosts(array) {

    if (array.length == 0) {
        const section = document.getElementById('section-column')
        const label = document.createElement("label")
        label.innerHTML = "Nothing to see here!, atleast for now..."
        label.style.color = "black"

        section.appendChild(label)
    }
    for (let i = 0; i < array.length; i++) {
        console.log("Post " + i + " Started!")
        const aside = document.getElementById('aside-column')
        const section = document.getElementById('section-column')

        const group = document.createElement("div")
        const div_title = document.createElement("div")
        const div_content = document.createElement("div")
        group.className = "post-group"
        div_title.className = "post-title"
        div_content.className = "post-content"
        div_title.innerHTML =  "<span class='title'>" +  array[i].title + "</span>"
        div_content.innerHTML = "<p class='content' style='text-align: " + array[i].text_align + ";'>" + array[i].content + "</p>"
        div_content.style.justifyItems = array[i].layout

        group.appendChild(div_title)
        group.appendChild(div_content)
        if (array[i].type == "section") {
            section.appendChild(group)
        } else {aside.appendChild(group)}
    
        console.log("Post " + i + " Finished!")
    }
}


const aside = document.getElementById('aside-column')
const section = document.getElementById('section-column')

window.onload = function() {
    
    console.log("1" / "a")
    if (window.location.href.includes("index.html")) {
        loadPosts(posts)
    } else if (window.location.href.includes("links.html")) {
        // this.document.getElementById("aside").style.display = "none"
        loadPosts(links_posts)
    } else if (window.location.href.includes("gallery.html")) {
        loadPosts(gallery_posts)
    } else if (window.location.href.includes("games.html")) {
        loadPosts(games_posts)
    }
    if (!window.location.href.includes("links.html")) {
        loadPosts(aside_posts)
    }
    loadDoc()
}

















// XML EXAMPLE FROM w3schools

// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//     myFunction(this);
//     }
//   };
//   xhttp.open("GET", "cd_catalog.xml", true);
//   xhttp.send();
// }
// function myFunction(xml) {
//   var i;
//   var xmlDoc = xml.responseXML;
//   var table="<tr><th>Title</th><th>Artist</th></tr>";
//   var x = xmlDoc.getElementsByTagName("CD");
//   for (i = 0; i <x.length; i++) {
//     table += "<tr><td>" +
//     x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
//     "</td><td>" +
//     x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
//     "</td></tr>";
//   }
//   document.getElementById("demo").innerHTML = table;
// }

// XML LOOKS LIKE THIS

{/* <CATALOG>
    <CD>
        <TITLE>Empire Burlesque</TITLE>
        <ARTIST>Bob Dylan</ARTIST>
        <COUNTRY>USA</COUNTRY>
        <COMPANY>Columbia</COMPANY>
        <PRICE>10.90</PRICE>
        <YEAR>1985</YEAR>
    </CD>
    <CD>
        <TITLE>Hide your heart</TITLE>
        <ARTIST>Bonnie Tyler</ARTIST>
        <COUNTRY>UK</COUNTRY>
        <COMPANY>CBS Records</COMPANY>
        <PRICE>9.90</PRICE>
        <YEAR>1988</YEAR>
    </CD> 
</CATALOG>*/}