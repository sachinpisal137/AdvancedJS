// Constructor for Image object
function Image(title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
}

// The images object
const images = {
    list: [], // Array to store image objects

    // Method to check if an image with a certain title exists
    contains: function (title) {
        return this.list.some(image => image.title === title);
    },

    // Method to add a new image object
    add: function (title, artist, date) {
        if (!this.contains(title)) {
            const newImage = new Image(title, artist, date);
            this.list.push(newImage);
            console.log(`Image titled "${title}" added.`);
        } else {
            console.log(`Image titled "${title}" is already in the list.`);
        }
    },

    // Method to display all images
    show: function () {
        if (this.list.length === 0) {
            console.log("No images in the list.");
        } else {
            console.log("Images in the list:");
            this.list.forEach(image => {
                console.log(`Title: ${image.title}, Artist: ${image.artist}, Date: ${image.date}`);
            });
        }
    },

    // Method to clear the list of images
    clear: function () {
        this.list = [];
        console.log("All images removed.");
    }
};

// Testing the script
images.add("Starry Night", "Vincent van Gogh", 1889);
images.add("Mona Lisa", "Leonardo da Vinci", 1503);
images.add("The Persistence of Memory", "Salvador Dalí", 1931);

images.show(); // Display images

console.log(images.contains("Mona Lisa")); // true
console.log(images.contains("The Scream")); // false

images.add("Starry Night", "Vincent van Gogh", 1889); // Attempt to add a duplicate

images.clear(); // Clear the list

images.show(); // Check that the list is cleared
