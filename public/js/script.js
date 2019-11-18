new Vue({
    el: "#main",
    data: {
        // name: "habanero",
        // seen: false,
        images: []
    },
    mounted:


    function() {
        console.log("this is my image", this.image);
        var me= this;
        axios
            .get("/images")
            .then(function(response) {
                console.log("response from images is: ", response.data);
                console.log("me.images",me.images);
                me.images = response.data;
            })
            .catch(err => console.log("err", err));

    },
    methods: {
        myFunction: function(e) {
            console.log("im the function");
            console.log("e is:", e);
        }
    }
});
