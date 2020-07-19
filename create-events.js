const EventEmmitter =  require('events');


const sampleEvent =  new EventEmmitter();

//Listner1
sampleEvent.on('newSale',()=>{
    console.log("There was a new sale!!");
});

//Listner2
sampleEvent.on('newSale',()=>{
    console.log("There was a new sale!! 123");
});

//Listner3
sampleEvent.on('newSale',(stocks,message)=>{
    console.log(`This event can get the parameters ${stocks} and ~${message}`);
});

sampleEvent.emit('newSale',"stock1","message1");