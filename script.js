
function showingLyrics(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics;
        const lyricsResult = document.getElementById('get-lyrics');
        lyricsResult.innerHTML = `<h2 class = "text-success mb-4">${artist} - ${title}</h2>
        <pre class = "lyric text-white">${lyrics}</pre>
        ` 
    })
    document.getElementById('search-input').innerHTML = '';
}

function searchSong(){
    const songTitle = document.getElementById('search-input').value;
    document.getElementById('song-list').innerHTML = '';
    document.getElementById('get-lyrics').innerHTML = '';
    fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        const songList = data.data;
        for (let i = 0; i < 10; i++) {
            const song = songList[i];
            const songTitle = song.title;
            const artistName = song.artist.name;
            const album = song.type;
            const result = document.getElementById('song-list');
            result.innerHTML += `
            <div class="single-result row align-items-center my-4 p-4">
           
            <div class="col-md-9">
            <h4 class="lyrics-name">${songTitle}</h4>
            <p class="author lead">${album} by <span>${artistName}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="showingLyrics('${artistName}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>
     `
            
        }
    })
}