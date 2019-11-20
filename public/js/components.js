Vue.component("my-component", {
    template: `#my-template`,
    data: function() {
        return {
            images: [],
            url: "",
            title: "",
            description: "",
            username: ""
        };
    },
    props: ["id"],
    mounted: function() {
        var me = this;
        console.log("this is ", me.image);
        axios
            .get("/image/" + this.id)
            .then(function(res) {
                console.log("response at mounted getting image is", res);
                me.url = res.data[0].url;
                me.title = res.data[0].title;
                me.description = res.data[0].description;
                me.username = res.data[0].username;
            })
            .catch(err => console.log("err", err));

        // axios.post('/comment', {
        //     id: this.id,
        //     username: this.username,
        //     comment:this.comment
        // });
    },
    methods: {
        unsetCurrentImage: function() {
            this.$emit("close");
        }
    },
    addComment: function() {
        var me= this;
        axios
            .get("/comment/" + this.id)
            .then(function(res) {
                console.log("response at mounted getting a comment", res);
                me.username = res.data[0].username;
                me.comment = res.data[0].comment;
            })
            .catch(err => console.log("err", err));
    }
});
