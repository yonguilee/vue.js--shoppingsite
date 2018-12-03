export default {
    //computiong properties
    computed: {
        filteredItems: function() {
            return this.items.filter((item) => {
                if (item.title.match(this.search_data)) {
                    return item.title.match(this.search_data);
                } else if (item.content.match(this.search_data)) {
                    return item.content.match(this.search_data);
                } else if (item.tags[0].match(this.search_data)) {
                    return item.tags[0].match(this.search_data);
                } else if (item.tags[1].match(this.search_data)) {
                    return item.tags[1].match(this.search_data);
                } else if (item.tags[2].match(this.search_data)) {
                    return item.tags[2].match(this.search_data);
                }

                // else if {
                //     for (var i = 0, i <= item.tags.length, i++) {
                //         this.if(item.tags[i].match(this.search_data)) {
                //             return item.tags[i].match(this.search_data);
                //         }
                //     }
                // }

            });
        }
    }
}