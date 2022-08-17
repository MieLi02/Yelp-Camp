const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log("ERROR!", err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10; 
        const camp = new Campground({
            author: '62f9b544da9bcee5366367b5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'As description, it is a perfect place to camp at!!!',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [ cities[random1000].longitude,
                cities[random1000].latitude,
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/damb1wnuj/image/upload/v1660599016/Yelp%20Camp/lhobyz4yy67lloigvmhz.png',
                    filename: 'Yelp Camp/lhobyz4yy67lloigvmhz'
                },
                {
                    url: 'https://res.cloudinary.com/damb1wnuj/image/upload/v1660605107/Yelp%20Camp/jxktkfsjyyhqdvr06pbz.png',
                    filename: 'Yelp Camp/jxktkfsjyyhqdvr06pbz '
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
.then(() => {
    mongoose.connection.close();
})