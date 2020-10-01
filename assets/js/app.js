//variables

TweetList=document.getElementById('tweet-list');




//event listeners

eventListener();
function eventListener()
{
 document.querySelector('#form').addEventListener('submit',newTweet);
  
 TweetList.addEventListener('click',removeTweet);

 document.addEventListener('DOMContentLoaded',localStorageOnLoad);
}




//functions

function newTweet(e)
{
    e.preventDefault();

    //read the new value
    const tweet=document.getElementById('tweet').value; 

    // create remove button
     const removeBtn=document.createElement('a');
     removeBtn.textContent='X';
     removeBtn.classList='remove-tweet';
    
     //crete new list
    const li=document.createElement('li');
    li.textContent=tweet;

    //add to html
    li.appendChild(removeBtn);
    TweetList.appendChild(li);
    //add to local storage

    addToLocalStorage(tweet);

}
// remove tweets from the DOM
function removeTweet(e){
    if(e.target.classList.contains('remove-tweet'))
    {
        e.target.parentElement.remove();
    }
    //remove from local storage
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addToLocalStorage(tweet)
{
  let tweets=getFromStorage();

  //add into array
  tweets.push(tweet);
  //set tweets array into string array

  localStorage.setItem('tweets',JSON.stringify(tweets));
}

function getFromStorage()
{
    let tweets;
    const tweetLS=localStorage.getItem('tweets');
    if(tweetLS === null)
    {
        tweets=[];
    }
    else{
        tweets=JSON.parse(tweetLS);
    }
    return tweets;
}
//print elements from local storage

function localStorageOnLoad()
{
    tweets=getFromStorage();
    tweets.forEach(function(tweet){
        const removeBtn=document.createElement('a');
        removeBtn.textContent='X';
        removeBtn.classList='remove-tweet';
    
        //crete new list
        const li=document.createElement('li');
        li.textContent=tweet;

       //add to html
        li.appendChild(removeBtn);
        TweetList.appendChild(li);
        
    });
}
function removeTweetLocalStorage(tweet)
{
       let tweets=getFromStorage();

       const tweetDelete=tweet.substring(0,tweet.length-1);

       tweets.forEach(function(tweetLS,index)
       {
            if(tweetDelete === tweetLS)
            {
                tweets.splice(index,1);
            }
       });
       localStorage.setItem('tweets',JSON.stringify(tweets));
}