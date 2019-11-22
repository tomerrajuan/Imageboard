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
        axios
            .get("/image/" + this.id)
            .then(function(res) {
                // if (!res.data.image) {
                //     $emit("close");
                // } else {
                console.log("response at mounted getting image is", res);
                me.url = res.data.image.url;
                me.title = res.data.image.title;
                me.description = res.data.image.description;
                me.comments = res.data.comment;
                console.log("me.commments:", me.comments.rows);
                // me.commentImageId = res.data.comment.rows[0].id;
                // me.commentUsername = res.data.comment.rows[0].username;
                // me.comment = res.data.comment.rows[0].comment;
                // }
            })
            .catch(err => console.log("error at axios get image", err));
    },
    methods: {
        unsetCurrentImage: function() {
            this.$emit("close");
        },
        handleAddComments: function() {
            let me = this;
            console.log("this is", this);
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
});
