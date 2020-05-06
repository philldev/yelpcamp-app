const mongoose = require('mongoose'),
Campground = require('./models/campgrounds'),
Comment = require('./models/comment')


const data = [
  {
    name: 'Rusty Hills',
    image: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'Very Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam ad deserunt nulla, eligendi neque iure, ipsum autem facilis officiis repellat, amet eius delectus at necessitatibus? and relaxing campground 10/10 want to come here everyday xD'
  },
  {
    name: 'Cloudy Mountain',
    image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'Very cold in Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam ad deserunt nulla, eligendi neque iure, ipsum autem facilis officiis repellat, amet eius delectus at necessitatibus? dont forget to bring thick jackets!'
  },
  {
    name: 'Long Horizon',
    image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'Just look at the Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam ad deserunt nulla, eligendi neque iure, ipsum autem facilis officiis repellat, amet eius delectus at necessitatibus?!'
  }
]


function seedDB(){
  // Remove all campgrounds
  Campground.deleteMany({}, err => {
    if(err)console.log(err);
    console.log(`removed campgrounds!`)
    Comment.deleteMany({}, (err) => {
      if(err) console.log(err);
      console.log(`removed comments!`);
      // for(let camp of data){
      //   Campground.create(camp, (err, campground) => {
      //     // if error
      //     if (err) console.log(err);
      //     // else add comment to each camp
      //     console.log('Campground added!');
      //     Comment.create({
      //       text:"This place is great! but no internet :(",
      //       author:"Phill"
      //     }, (err, comment) => {
      //       if (err) console.log(err);
      //       campground.comments.push(comment);
      //       campground.save()
      //       console.log('Created new comment')
      //     })
      //   })
      // }
    })
  })
  // add a few campgrounds
   
}

module.exports = seedDB;
