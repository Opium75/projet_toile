const nb_tracks = 20;

const genrePicture = document.querySelector('#genre_pic');
const albumPicture = document.querySelector('#album_pic');


const upArrow = document.querySelector('#up-arrow');
const downArrow = document.querySelector('#down-arrow');

const pageStart = document.querySelector('#page1');
const pageConfig = document.querySelector('#page2');

const bandName = document.querySelector('#band_name');
const albumName = document.querySelector('#album_name');

const inputGenre = document.querySelector('#inputGenre');
const inputName = document.querySelector('#inputName');
const printName = document.querySelectorAll('.header');


const inputAnswerSong = document.querySelector('#inputAnswerSong');
const inputAnswerArtist = document.querySelector('#inputAnswerArtist');


const buttonWelcome = document.querySelector('#button_welcome');
const buttonConfig = document.querySelector('#button_config');
const buttonShow =document.querySelector('#button_show');
const buttonError = document.querySelector('#button_error');
const buttonAnswer = document.querySelector('#button_answer');
const buttonTip = document.querySelector('#button_tip');

const buttonPlay = document.querySelector('#play-arrow');
const buttonNext = document.querySelector('#button_next');

const sliderVolume = document.querySelector('#slider_volume');

const background = document.querySelector('#background');

const shame = 'sound/shame.mp3';
const hearHear = 'sound/hearhear.mp3';

var idGenreGlobal;

var score ;
var dataGlobal;
var count;

var playlist = new Array(nb_tracks);

buttonWelcome.addEventListener('click', function(event) {
    openArrows();
	changePage(pageConfig);
    hideElement(buttonWelcome);
	event.preventDefault();}
);

const randint = range  => Math.trunc(Math.random()*range);

const changeValue =
      (value, element,bydefault) => element.innerHTML = value || `${bydefault}`;

const changeUsername = (newName,element) => element.innerHTML =
      (newName !== '')? "Vous êtes " + newName + " !" : "Vous êtes qui déjà ?";


inputName.addEventListener('keyup', event => 
                printName.forEach( element => changeUsername(event.target.value,element))
                )

let changePicGenre = function(idGenre) {
    fetch('http://api.napster.com/v2.2/genres/'+`${idGenre}`+'/artists/top?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm&limit=20')
    .then(response => response.json())
    .then( data => {
        const topArtists = data;
        const i = randint(20);
        const idArtist = topArtists.artists[i].id;
        const nameArtist = topArtists.artists[i].name;
    fetch('http://api.napster.com/v2.2/artists/'+`${idArtist}`+'/images?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')
        .then(response => response.json())
        .then( data => {
            const coversArtist = data;
            const urlPicChosen = coversArtist.images[0].url;
            console.log(urlPicChosen);
            genrePicture.style.background = `url('${urlPicChosen}') no-repeat top / 100%`;
            changeValue(nameArtist,bandName,'Un artist ?');
            showElement(genrePicture);
            showElement(bandName);
})})}

let pissedOff = function (bydefault,message) {
    const textGenre = document.querySelector('#text_genre');
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
    //showElement(buttonError);

}

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


buttonShow.addEventListener('click', event =>
 fetch('http://api.napster.com/v2.2/genres/'+`${inputGenre.value}`+'?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')	
        .then(response => response.json())
        .then( data => { const genreDetails = data;
            if(genreDetails.genres!==undefined&&genreDetails.genres[0]!==undefined) {
                hideElement(genrePicture);
                const idGenre = genreDetails.genres[0].id;
                idGenreGlobal = idGenre;
                changePicGenre(idGenre);
            }
            else {
                genreInvalid(inputGenre);
            }}))

buttonError.addEventListener('click', event => {
    inputGenre.value = '';
    inputGenre.classList.remove('answer-wrong');
    hideElement(event.target);

})

let fillPlaylist = function(newArray,n) {
    for(i=0;i<n;i++) {
        newArray[i] = randint(n);
    }
}

let getTracksAndStart = function(idGenre) {
    fetch('http://api.napster.com/v2.2/genres/'+`${idGenre}`+'/tracks/top?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')
            .then(response => response.json())
                .then(data => {
                    const topTracks = data;
                    dataGlobal = topTracks;
                    changePage(pageStart);
                    fillPlaylist(playlist,nb_tracks);
                    changeTrack(0,albumPicture,albumName,topTracks.tracks);
                    count=0;
                            })}
                  
buttonConfig.addEventListener('click',event => {
    event.preventDefault();
    printName.forEach( element => changeUsername(inputName.value,element));
 fetch('http://api.napster.com/v2.2/genres/'+`${inputGenre.value}`+'?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')	
        .then(response => response.json())
        .then( data => { const genreDetails = data;
            if(genreDetails.genres!==undefined&&genreDetails.genres[0]!==undefined) {
                const idGenre = genreDetails.genres[0].id;
                idGenreGlobal = idGenre;
                console.log(idGenreGlobal);
                getTracksAndStart(idGenre);
            }
            else {
            genreInvalid(inputGenre);
        }
    })})



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
    const inputSong = $('#inputAnswerSong');
    const inputArtist = $('#inputAnswerArtist');
    var i=0;
    i+=animateAnswer(inputAnswerSong,inputSong,checkNameTrack(num,inputAnswerSong,tracks),tracks[playlist[num]].name);
    i+=animateAnswer(inputAnswerArtist,inputArtist,checkNameArtist(num,inputAnswerArtist,tracks),tracks[playlist[num]].artistName);
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
    const inputSong = $('#inputAnswerSong');
    const inputArtist = $('#inputAnswerArtist');
    unAnimateAnswer(inputAnswerSong,inputSong);
    unAnimateAnswer(inputAnswerArtist,inputArtist);

}


let answerPage = function(page) {
    const divCover = document.getElementById('div_cover');
    const divAnswer = document.getElementById('div_answer');
    showPage(background);
    hideElement(buttonAnswer);
    hideElement(buttonTip);
    if(albumPicture.classList.contains('element-hidden')) {
        showElement(albumPicture);
        showElement(albumName);
    }
    audioNext(buttonPlay);

}

let audioNext = function(element) {
    var audio = document.getElementById('audio_player');
    if (audio.paused) {
        audio.play();
        element.classList.remove('play');
        element.classList.add('pause')
    }
    ;
    buttonNext.classList.remove('next-hidden');
    buttonNext.classList.add('next-active');
}

buttonAnswer.addEventListener('click', event => {
    event.preventDefault();
    audioStop(buttonPlay);
    if(count==19) {
        backToWelcome();
    }
    else {
        analyseAnswer(count,dataGlobal.tracks);
        answerPage(pageStart);
        count+=1;
    }  
})

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
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        if(button.classList.contains('element-hidden')) {
            showElement(button);
        }
    })
    buttonNext.classList.remove('next-active');
    buttonNext.classList.add('next-hidden');
    hideElement(buttonError);

}

upArrow.addEventListener('click',event => backToWelcome());

downArrow.addEventListener('click',event => backToWelcome());

let soundEffect = link => {
    var sound = link;
    console.log(sound);
    var audio = $('#audio_player');
    var source = $('#audio_source');
    audio[0].pause();
    source.attr('src',sound);
    audio[0].load();
    audio[0].play();
}

let soundEffect2 = link => {
    var sound2 = new Audio(link);
    sound2.play();
}



let changeCover = (num,picture,name,tracks) => {
	const albumId = tracks[playlist[num]].albumId;
    const album = tracks[playlist[num]].albumName;
	fetch('http://api.napster.com/v2.2/albums/'+`${albumId}`+'/images?apikey=ZjBmNmM3YzUtMmY3MS00ODkwLWIwOTctNGE1ZWFjMGU3YmZm')
    .then(response => response.json())
		.then(data => {
			const coversArtist = data;
			const urlCover = coversArtist.images[2].url;
            console.log(urlCover);
            changeValue(album,name,'Un artist ?');
			picture.style.background = `url('${urlCover}') no-repeat top / 100%`;
		});
}


let changeAudio = (num,tracks) => {
	const urlAudio = tracks[playlist[num]].previewURL;
	var audio = $('#audio_player');
    var source = $('#audio_source');
    audio[0].pause();
    source.attr('src',urlAudio);
    audio[0].load();
    playPause(buttonPlay);
    
}

let changeTrack = (num,picture,name,tracks) => {
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

let isHidden = element => element.classList.contains('element-hidden');

buttonTip.addEventListener('click', event => {
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

let sliderAnimation =function(val,slider,thumb) {
  var pc = val/(slider.max - slider.min); /* the percentage slider value */
  var distance = 100 * pc;
  var move= "translateX(" + distance + "%)";  
  thumb.style.webkitTransform = move;
  thumb.style.MozTransform = move;
  thumb.style.msTransform = move;
}

buttonNext.addEventListener('click',event => {
    event.target.classList.remove('next-active');
    event.target.classList.add('next-hidden');
    unAnimateAllAnswers();
    changeTrack(count,albumPicture,albumName,dataGlobal.tracks);
});

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

const showElement = element => {
	element.classList.remove('element-hidden');
    element.classList.remove('element-active');
    element.classList.add('element-active');
}
