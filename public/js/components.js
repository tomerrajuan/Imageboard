Vue.component("my-component", {
    template: `#my-template`,
    data: function() {
        return {
            comments: [],
            comment_comment: "",
            username_comment: "",
            url: "",
            title: "",
            description: "",
            username: "",
            commentImageId: "",
            commentUsername: "",
            comment: ""
        };
    },
    props: ["id"],
    mounted: function() {
        var me = this;
        console.log("this is ", me.image);
        if (this.id != location.hash.slice(1)) {
            return;
        }
        axios
            .get("/image/" + this.id)
            .then(function(res) {
                console.log("response at mounted getting image is", res);

                me.url = res.data.image.url;
                me.title = res.data.image.title;
                me.description = res.data.image.description;
                if (!res.data.image.description) {
                    me.description = "no description given";
                }
                me.comments = res.data.comment;
                me.username = res.data.image.username;
                if (!res.data.image.username) {
                    me.username = "no Name";
                }
                console.log("me.commments:", me.comments.rows);
            })
            .catch(err => {
                console.log("error at axios get image", err);
                me.$emit("close");
            });
    },
    methods: {
        unsetCurrentImage: function() {
            this.$emit("close");
        },
        handleAddComments: function() {
            let me = this;
            if (!me.username_comment) {
                alert("Please Enter a name!");
                return;
            }
            if (!me.comment_comment) {
                alert("Please Enter your comment!");
                return;
            } else {
                console.log("this of add comment is", this);
                let obj = {
                    comment: me.username_comment,
                    image_id: me.id,
                    username: me.comment_comment
                };
                console.log("obj", obj);
                axios
                    .post("/comment", obj)
                    .then(function(res) {
                        console.log(
                            "response axios post comment: ",
                            res.data.comment
                        );
                        me.comments.unshift(res.data.comment);
                    })
                    .catch(err => console.log("error in post upload", err));
            }
        }
    }
});
