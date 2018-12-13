<<<<<<< Updated upstream
function scrollWin()  
    window.scrollBy(0, document.body.scrollHeight);
}
=======
const tracksTemplateSource = document.getElementById('tracks-template').innerHTML;
const tracksTemplate = Handlebars.compile(tracksTemplateSource);

const name_player = document.querySelector("#name-written");



const nb_tracks = 10;

const cover_track = document.querySelector('#cover');
const name_track = document.querySelector("#track-name");
const audio_track = document.querySelector("#audio");

const button_confirm_choice = document.querySelector(.long_btn);

const fetchTracksByGenre = fetch('http://api.napster.com/v2.2/genres/g.397/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4');

const randint = range  => trunc(Math.random()*range);

const changeValue =
      (value, element) => element.innerHTML = value || 'Default';

const changeCover_track = (e,tracks) => {
	const artist_id = tracks[e].artistId;
	const fetchArtist = fetch('http://api.napster.com/v2.2/artists/'+`#${artist_id}`+'/images?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4');
	fetchArtist
		.then((data) => {
			const covers_artist = data;
			const url_cover_chosen = covers_artist[0].url;
		});
	cover.style.background =
    `url('${url_cover_chosen}') no-repeat top / 100%`;
}

const changeAudio_track = (e,tracks) => {
	const url_audio = tracks[e].previewURL;
	$("source").attr("src",url_audio);
}

const changeName_track = (e,tracks) =>
	changeValue(tracks[e].name,name_track);

const changeTrack = (e,tracks) => {
	changeCover_track(e,tracks);
	changeAudio_track(e,tracks);
	changeName_track(e,tracks);
}

fetch('http://api.napster.com/v2.2/genres/g.397/tracks/top?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4');
	.then(data => {
		const tracks = data;
		const num_track = randint(nb_tracks);
		button_confirm_choice.addEventListener('click',
			changeTrack(num_track,tracks));
			
	})
>>>>>>> Stashed changes
