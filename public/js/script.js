new Vue({
    el: "#main",
    data: {
        images: [],
        title: "",
        description: "",
        username: "",
        file: null,
        currentImage: null

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
    },
    methods: {
        setCurrentImage: function(id) {
            console.log("id of current image is:", id);
            this.currentImage=id;
        },
      
        handleClick: function(e) {
            var me = this;
            e.preventDefault();

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
        },
        handleChange: function(e) {
            console.log("handleChange is happening");
            this.file = e.target.files[0];
        }
    }
});
