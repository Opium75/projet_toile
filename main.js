
const upArrow = document.querySelector('#up-arrow');
const downArrow = document.querySelector('#down-arrow');


//////////////////////////////////

                /*CONSTANTS*/

const inputGenre = document.querySelector('#inputGenre');
const inputName = document.querySelector('#inputName');

const inputLengthPlaylist = document.querySelector('#inputLengthPlaylist');
const inputTopNthTracks = document.querySelector('#inputTopNthTracks');
const selectTime = document.querySelector("#select_time");


const buttonWelcome = document.querySelector('#button_welcome');
const buttonConfig = document.querySelector('#button_config');
const buttonShow =document.querySelector('#button_show');
const buttonAnswer = document.querySelector('#button_answer');
const buttonTip = document.querySelector('#button_tip');
const buttonNext = document.querySelector('#button_next');

const buttonPlay = document.querySelector('#play-arrow');
const sliderVolume = document.querySelector('#slider_volume');

const shame = 'sound/shame.mp3';
const hearHear = 'sound/hearhear.mp3';

                /*VARIABLES*/
var idGenreGlobal;
var dataGlobal;

var count=0;

//var score;

var playlist = [];

                /*INPUT VARIABLES*/


var lengthPlaylist = 20;
//day, week, month, year, life
var time = 'week';
var topNthTracks = 40; //API does not support over 200

//////////////////////////////////


                /*BASIC FUNCTIONS*/
let randint = range  => Math.trunc(Math.random()*range);

let changeValue =
      (value, element,bydefault) => element.innerHTML = value || `${bydefault}`;

let changeUsername = (newName,element) => element.innerHTML =
      (newName !== '')? "Vous êtes " + newName + " !" : "Vous êtes qui déjà ?";


let fillPlaylist = function(newArray,nb,topNthTracks) {
    var nbArray = [];
    var k;
    var spliced;
    for(i=0;i<topNthTracks;i++) {
        nbArray.push(i);
    }
    for(j=0;j<nb;j++) {
        k = randint(topNthTracks);
        spliced = nbArray.splice(k-j,1);
        newArray.push(spliced[0]);
    }
}


let pissedOff = function (bydefault,message) {
    var textGenre = document.querySelector('#text_genre');
    if (textGenre.innerHTML === bydefault) {
        textGenre.innerHTML = message;
    }
    else {
        textGenre.innerHTML = bydefault;
    }
}

let genreInvalid = function(element) {
    if(element.value==='') {
        pissedOff('Choisir un genre','Entre un genre, bordel');
    }
    element.classList.add('answer-wrong');
}

let isInGenres = function(string,genresArray) {
    for(i=0;i<genresArray.length;i++) {
        if(genresArray[i].name === string||genresArray[i].shortcut === string) {
            idGenreGlobal = genresArray[i].id;
            return true;
        }
    }
    return false;
}

let playPause = function(element) {
    var audio = document.getElementById('audio_player');
    if (audio.paused) {
            audio.play();
            element.classList.remove('play');
            element.classList.add('pause');
    }
    else {
            audio.pause();
            element.classList.remove('pause');
            element.classList.add('play');
    }
}

let audioStop = function(element) {
    var audio = document.getElementById('audio_player');
    if(!(audio.paused)) audio.pause();
    element.classList.remove('pause');
    element.classList.add('play');
    }

let showPage = page => {
    page.classList.remove('page-hidden');
    page.classList.add('page-active');
}

let closeAllPages = function() {
    pagesCurrent = document.querySelectorAll('.page-active');
    pagesCurrent.forEach(page => {
        page.classList.remove('page-active');
        page.classList.add('page-hidden');
    });
}



let changePage =  page => {
    closeAllPages();
    showPage(page);
}

let openArrows = function() {
        upArrow.classList.remove('up-arrow-inactive');
        upArrow.classList.add('arrow-active');
        downArrow.classList.remove('down-arrow-inactive');
        downArrow.classList.add('arrow-active');
}

let closeArrows = function() {
        upArrow.classList.remove('arrow-active');
        upArrow.classList.add('up-arrow-inactive');
        downArrow.classList.remove('arrow-active');
        downArrow.classList.add('down-arrow-inactive');
}

let hideElement =  element => {
    element.classList.remove('element-hidden');
    element.classList.add('element-hidden');
}

let showElement = element => {
    element.classList.remove('element-hidden');
    element.classList.remove('element-active');
    element.classList.add('element-active');
}



let checkNameTrack = (num,answer,tracks) => {
    // console.log(answer.value);
     //console.log(tracks[playlist[num]].name);
    return(tracks[playlist[num]].name===answer.value);
}

let checkNameArtist = (num,answer,tracks) => {
    //console.log(answer.value);
    //console.log(tracks[playlist[num]].artistName);
    return(tracks[playlist[num]].artistName===answer.value);
}


let analyseAnswer = function(num,tracks) {
    var inputSong = document.querySelector('#inputAnswerSong');
    var inputSongJS = $('#inputAnswerSong');
    var inputArtist = document.querySelector('#inputAnswerArtist');
    var inputArtistJS = $('#inputAnswerArtist');
    var i=0;
    i+=animateAnswer(inputSong,inputSongJS,checkNameTrack(num,inputSong,tracks),tracks[playlist[num]].name);
    i+=animateAnswer(inputArtist,inputArtistJS,checkNameArtist(num,inputArtist,tracks),tracks[playlist[num]].artistName);
    if(i===0) soundEffect2(shame);
    if (i==2) soundEffect2(hearHear);
}

let animateAnswer = (element,elementJQ,isRight,trueAnswer) => {
    elementJQ.prop('readonly', true);
    if(isRight) {
        element.classList.add('answer-right');
        return 1;

    }
    else {
        element.value = trueAnswer;
        element.classList.add('answer-wrong');
        return 0;
    }

}

let unAnimateAnswer = (element,elementJQ) => {
    elementJQ.prop('readonly',false);
    element.classList.remove('answer-right');
    element.classList.remove('answer-wrong');
    element.value ='';
}

let unAnimateAllAnswers = function() {
    var inputSong = document.querySelector('#inputAnswerSong');
    var inputSongJS = $('#inputAnswerSong');
    var inputArtist = document.querySelector('#inputAnswerArtist');
    var inputArtistJS = $('#inputAnswerArtist');
    unAnimateAnswer(inputSong,inputSongJS);
    unAnimateAnswer(inputArtist,inputArtistJS);

}




/*let soundEffect = link => {
    var sound = link;
    onsole.log(sound);
    var audio = $('#audio_player');
    var source = $('#audio_source');
    audio[0].pause();
    source.attr('src',sound);
    audio[0].load();
    audio[0].play();
}*/

let soundEffect2 = link => {
    var sound2 = new Audio(link);
    sound2.play();
}


let isHidden = element => element.classList.contains('element-hidden');


let audioNext = function(element) {
    var audio = document.getElementById('audio_player');
    if (audio.paused) {
        audio.play();
        element.classList.remove('play');
        element.classList.add('pause')
    }
    buttonNext.classList.remove('next-hidden');
    buttonNext.classList.add('next-active');
}

let getInfo = function() {
    topNthTracks = parseInt(inputTopNthTracks.value);
    lengthPlaylist = parseInt(inputLengthPlaylist.value);
    time = selectTime.value;
}


                /*ADVANCED FUNCTIONS*/


let showGenre = function(idGenre) {
    var genrePicture = document.querySelector('#genre_pic');
    var bandName = document.querySelector('#band_name');
    fetch('http://api.napster.com/v2.2/genres/'+`${idGenre}`+'/artists/top?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm&range='+`${time}`+'&limit='+`${topNthTracks}`)
    .then(response => response.json())
    .then( data => {
        var topArtists = data;
        var i = randint(topNthTracks);
        var idArtist = topArtists.artists[i].id;
        var nameArtist = topArtists.artists[i].name;
    fetch('http://api.napster.com/v2.2/artists/'+`${idArtist}`+'/images?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')
        .then(response => response.json())
        .then( data => {
            var coversArtist = data;
            var urlPicChosen = coversArtist.images[0].url;
            //console.log(urlPicChosen);
            genrePicture.style.background = `url('${urlPicChosen}') no-repeat top / 100%`;
            changeValue(nameArtist,bandName,'Un artist ?');
            showElement(genrePicture);
            showElement(bandName);
})})}

    

let getGenreAndShow = function(input,canvas) {
    fetch('http://api.napster.com/v2.2/genres?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&lang=fr-FR')
    .then(reponse => reponse.json())
    .then(data => {
        var allGenres = data;
        if(!isInGenres(input.value,allGenres.genres)) {
            genreInvalid(input);
        }
        else {
            var idGenre = idGenreGlobal;
            showGenre(idGenre);
        }})}

let getGenreAndStart = function(input) {
fetch('http://api.napster.com/v2.2/genres?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&lang=fr-FR')
    .then(reponse => reponse.json())
    .then(data => {
        var allGenres = data;
        getInfo();        
        if(!isInGenres(input.value,allGenres.genres)) {
            genreInvalid(input);
        }
        else {
            var idGenre = idGenreGlobal;
            getTracksAndStart(idGenre);
    }})}

let getTracksAndStart = function(id) {
    var albumPicture = document.querySelector('#album_pic');
    var albumName = document.querySelector('#album_name');
    var pageStart = document.querySelector('#page1');
    fetch('http://api.napster.com/v2.2/genres/'+`${id}`+'/tracks/top?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm&range='+`${time}`+'&limit='+`${topNthTracks}`)
            .then(response => response.json())
                .then(data => {
                    var topTracks = data;
                    dataGlobal = topTracks;
                    playlist = [];
                    changePage(pageStart);
                    fillPlaylist(playlist,lengthPlaylist,topNthTracks);
                    changeTrack(0,albumPicture,albumName,topTracks.tracks);
                    count=0;
                            })}

let answerPage = function(page) {
    var albumPicture = document.querySelector('#album_pic');
    var divCover = document.getElementById('div_cover');
    var divAnswer = document.getElementById('div_answer');
    var albumName = document.querySelector('#album_name');
    var background = document.querySelector('#background');
    showPage(background);
    hideElement(buttonAnswer);
    hideElement(buttonTip);
    if(albumPicture.classList.contains('element-hidden')) {
        showElement(albumPicture);
        showElement(albumName);
    }
    audioNext(buttonPlay);

}


let backToWelcome = function() {
    closeAllPages();
    restoreAllButtons();
    audioStop(buttonPlay);
    if(buttonNext.classList.contains('next-active')) {
        buttonNext.classList.remove('next-active');
        buttonNext.classList.add('next-hidden');
    }
    unAnimateAllAnswers();
    closeArrows();
};

let restoreAllButtons = function() {
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        if(button.classList.contains('element-hidden')) {
            showElement(button);
        }
    })
    buttonNext.classList.remove('next-active');
    buttonNext.classList.add('next-hidden');

}

let changeCover = (num,picture,name,tracks) => {
    var albumName = document.querySelector('#album_name');
    var albumId = tracks[playlist[num]].albumId;
    var albumTitle = tracks[playlist[num]].albumName;
    fetch('http://api.napster.com/v2.2/albums/'+`${albumId}`+'/images?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')
    .then(response => response.json())
        .then(data => {
            var coversArtist = data;
            var urlCover = coversArtist.images[2].url;
            //console.log(urlCover);
            changeValue(albumTitle,name,'Un artist ?');
            picture.style.background = `url('${urlCover}') no-repeat top / 100%`;
        });
}


let changeAudio = (num,tracks) => {
    var urlAudio = tracks[playlist[num]].previewURL;
    var audioJQ = $('#audio_player');
    var source = document.querySelector('#audio_source');
    audioJQ[0].pause();
    //source.attr('src',urlAudio);
    source.setAttribute('src', urlAudio); 
    audioJQ[0].load();
    playPause(buttonPlay);
    
}

let changeTrack = (num,picture,name,tracks) => {
    var albumPicture = document.querySelector('#album_pic');
    var albumName = document.querySelector('#album_name');
    var background = document.querySelector('#background');
    changeCover(num,picture,name,tracks);
    changeAudio(num,tracks);
    buttonNext.classList.remove('next-active');
    buttonNext.classList.add('next-hidden');
    if(!background.classList.contains('page-hidden')) {
        background.classList.remove('page-active');
        background.classList.add('page-hidden');
        showElement(buttonAnswer);
        showElement(buttonTip);
    }
    hideElement(albumPicture);
    hideElement(albumName);
}

let sliderAnimation =function(val,slider,thumb) {
  var pc = val/(slider.max - slider.min); /* the percentage slider value */
  var distance = 100* pc;
  var move= "translateX(" + distance + "%)";  
  thumb.style.webkitTransform = move;
  thumb.style.MozTransform = move;
  thumb.style.msTransform = move;
}



//////////////////////////////////

buttonWelcome.addEventListener('click', function(event) {
    var pageConfig = document.querySelector('#page2');
    openArrows();
	changePage(pageConfig);
    hideElement(buttonWelcome);
	event.preventDefault();}
);


inputName.addEventListener('keyup', event =>  {
    var printName = document.querySelectorAll('.header');
    printName.forEach( element =>
                     changeUsername(event.target.value,element))
                 })

inputGenre.addEventListener('click', event => {
    if(event.target.classList.contains('answer-wrong')) {
        event.target.classList.remove('answer-wrong');
        event.target.value = '';
        pissedOff('Choisir un genre','Entre un genre, bordel');
    }
})
inputGenre.addEventListener('keyup', event => {
    if(event.target.classList.contains('answer-wrong')) {
        event.target.classList.remove('answer-wrong');
        pissedOff('Choisir un genre','Entre un genre, bordel');

    }
})

inputTopNthTracks.addEventListener('change',event => {
    if(event.target.value<inputLengthPlaylist.value) {
        inputLengthPlaylist.value = event.target.value;
    }
    TopNthTracks = event.target.value;
})

inputLengthPlaylist.addEventListener('change',event => {
    if(event.target.value>inputTopNthTracks.value) {
        inputTopNthTracks.value = event.target.value;
    }
    lengthPlaylist = event.target.value;
})

selectTime.addEventListener('change', event => {
    time = event.target.value;
})




var lengthPlaylist = 20;
//day, week, month, year, life
var time = 'week';
var topNthTracks = 40;




buttonShow.addEventListener('click', event => {
    event.preventDefault();
    var pictureGenre = document.querySelector('#genre_pic');
    getGenreAndShow(inputGenre,pictureGenre);
})
                  
buttonConfig.addEventListener('click',event => {
    var printName = document.querySelectorAll('.header');
    event.preventDefault();
    printName.forEach( element => changeUsername(inputName.value,element));
    getGenreAndStart(inputGenre);
        })






buttonAnswer.addEventListener('click', event => {
    var pageStart = document.querySelector('#page1');
    event.preventDefault();
    audioStop(buttonPlay);
    analyseAnswer(count,dataGlobal.tracks);
    answerPage(pageStart);
    })


upArrow.addEventListener('click',event => backToWelcome());

downArrow.addEventListener('click',event => backToWelcome());



buttonTip.addEventListener('click', event => {
    var albumPicture = document.querySelector('#album_pic');
    var albumName = document.querySelector('#album_name');
    if (isHidden(albumPicture)) {
        showElement(albumPicture);
        showElement(albumName);
    }
    else {
        hideElement(albumPicture);
        hideElement(albumName);
    }
})

buttonPlay.addEventListener('click',event => playPause(event.target));

sliderVolume.addEventListener('input', event => {
    var thumb  = document.getElementById('curtain');
    var audio = document.getElementById('audio_player');
    audio.volume = event.target.value;
    sliderAnimation(event.target.value,event.target,curtain);
})



buttonNext.addEventListener('click',event => {
    var albumPicture = document.querySelector('#album_pic');
    var albumName = document.querySelector('#album_name');
    event.target.classList.remove('next-active');
    event.target.classList.add('next-hidden');
    unAnimateAllAnswers();
    if(count>=lengthPlaylist-1) {
        backToWelcome();
    }
    else {
        count+=1;
        changeTrack(count,albumPicture,albumName,dataGlobal.tracks);
    }  
    
});

