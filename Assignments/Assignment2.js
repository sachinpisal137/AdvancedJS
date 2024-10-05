// Add show method to Image constructor using prototype
function Image(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

Image.prototype.show = function () {
    console.log(`${this.title} (${this.artist}, ${this.date})`);
};

// The images object with additional methods
const images = {
    list: [],

    contains: function (title) {
        return this.list.some(image => image.title === title);
    },

    add: function (title, artist, date) {
        if (!this.contains(title)) {
            this.list.push(new Image(title, artist, date));  // Use Image constructor
        }
    },

    edit: function (title, artist, date) {
        const image = this.list.find(image => image.title === title);
        if (image) {
            image.artist = artist;
            image.date = date;
        }
    },

    delete: function (title) {
        const index = this.list.findIndex(image => image.title === title);
        if (index !== -1) this.list.splice(index, 1);
    },

    show: function () {
        this.list.forEach(image => image.show());
    }
};

// Test the script
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);

images.edit('Mona Lisa', 'Leonardo da Vinci', 1504);
images.delete('The Last Supper');

images.show();
// -> Mona Lisa (Leonardo da Vinci, 1504)
// -> The Starry Night (Vincent van Gogh, 1889)
