new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null,
        currentImage: location.hash.slice(1),
        showButton: true,
        firstId: "",
        lastImage: ""
    },
    mounted: function() {
        var me = this;
        axios

            .get("/images")
            .then(function(response) {
                console.log("response from images is: ", response.data);
                me.images = response.data;
            })
            .catch(err => console.log("err", err));

        // window.addEventListener("hashchange", function() {
        //     var hash =this.currentImage;
        //     if(this.id)
        // });
    },
    // add an if statement to see if the hash exist.
    // when the model opens and ask for the image,
    // if there is no image, it should close itself

    methods: {
        setCurrentImage: function(id) {
            console.log("id of current image is:", id);
            this.currentImage = id;
        },

        handleClick: function(e) {
            var me = this;
            e.preventDefault();
            if (!this.title) {
                alert("Please Enter a title!");
                return false;
            } else {
                var fd = new FormData();
                fd.append("file", this.file);
                fd.append("title", this.title);
                fd.append("description", this.description);
                fd.append("username", this.username);
                axios
                    .post("/upload", fd)
                    .then(function(response) {
                        me.images.unshift(response.data.image);
                    })
                    .catch(err => console.log("error in post upload", err));
            }
        },
        handleChange: function(e) {
            console.log("handleChange is happening");
            this.file = e.target.files[0];
        },
        getMoreImages: function() {
            var me = this;
            let lastImage = me.images[me.images.length - 1].id;

            axios
                .get("/moreImages/" + lastImage)
                .then(function(res) {
                    console.log("response get more images: ", res);
                    me.firstId = res.data.firstId[0].id;
                    me.images = me.images.concat(res.data.image);
                    me.lastImage = me.images[me.images.length - 1].id;
                    if (me.lastImage === me.firstId) {
                        me.showButton = false;
                    }
                })
                .catch(err => console.log("error in post upload", err));
        },
        menu: function(e) {
            console.log(e);
        }
    }
});

// window.onscroll = () => {
//     console.log("this anscroll" , this);
//     console.log(document.documentElement.scrollTop,window.innerHeight,document.documentElement.offsetHeight);
//
//     let bottomOfWindow =
//         document.documentElement.scrollTop + window.innerHeight ===
//         document.documentElement.offsetHeight;
//
//
//
//     console.log("last image id is", lastImage);
//
//     if (bottomOfWindow === true) {
