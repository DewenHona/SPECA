let navigation = {
    "user" : {
        "default" : {
            "pages" : [
                '/home.html',
                '/hardware.html',
                '/dashboard.html',
                '/custom.html',
                '/blog.html',
                '/automated.html',
                '/about.html',
                '/merchant/all.html',
                '/merchant/dashboard.html'
            ],
            "links" : [
                new link('Home', '/home.html'),
                new link('Auto', '/automated.html'),
                new link('Custom', '/custom.html'),
                new link('Parts', '/hardware.html'),
                new link('Blog', '/blog.html'),
                new link('Account', '/dashboard.html'),
                new link('About', '/about.html')
            ]
        },
    },
    "merchant" : {
        
    },
    "visitor" : {

    }
};

function link(title, url) {
    this.url = url;
    this.title = title;
}

link.prototype.add = function() {
    var ul = document.getElementsByClassName('nav-menu')[0].firstElementChild;
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerHTML = this.title;
    a.href = this.url;
    li.appendChild(a);
    ul.appendChild(li);
};

(function addLinks() {
    var type = ''
    if(sessionStorage.mname) {
        type = 'merchant'
    } else if(sessionStorage.name) {
        type = 'user'
    } else {
        type = 'visitor'
    }
    insertLinks(navigation[type], window.location.pathname)
    insertLogut(type)
})();

function insertLinks(user, page) {
    if (user.default.pages.includes(page)) {
        for (const l of user.default.links) {
            (l.add.bind(l))();
        }
    }
}

function insertLogut(type) {
    if(type === 'visitor') {

    } else {
        
    }
}