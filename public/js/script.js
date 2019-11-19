new Vue({
    el: "#main",
    data: {
        // name: "habanero",
        // seen: false,
        images: [],
        title: "",
        description: "",
        username: "",
        file: null
    },
    mounted: function() {
        console.log("this is my image", this.image);
        axios
            .get("/images")
            .then(function(response) {
                console.log("response from images is: ", response.data);

            })
            .catch(err => console.log("err", err));
    },
    methods: {
        myFunction: function(e) {
            console.log("im the function");
            console.log("e is:", e);
        },
        handleClick: function(e) {
            var me = this;
            e.preventDefault();
            console.log("this", this);
            var fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            axios
                .post("/upload", fd)
                .then(function(response) {
                    me.images.unshift(response.data.image);
                    console.log("response upload", response);
                })
                .catch(err => console.log("error in post upload", err));
        },
        handleChange: function(e) {
            console.log("handleChange is happening");
            console.log("e.target.file", e.target.files[0]);
            this.file = e.target.files[0];
        }
    }
});
