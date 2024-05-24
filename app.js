const music = new Audio('audios/2.mp3');

const songs = [
    {
        id:'1',
        songname:`Something in the way
        <div class="subtitle">
            Nirvana
        </div>`,
        poster:'poster/1.jpg'
    },
    {
        id:'2',
        songname:`All time low
        <div class="subtitle">
            Jon Bellion
        </div>`,
        poster:'poster/2.jpg'
    },
    {
        id:'3',
        songname:`Kaise ho tum 
        <div class="subtitle">
            Agnee
        </div>`,
        poster:'poster/3.jpg'
    },
    {
        id:'4',
        songname:`lag ja gale 
        <div class="subtitle">
            Lata Mangeshkar
        </div>`,
        poster:'poster/4.jpg'
    },
    {
        id:'5',
        songname:`Another Love 
        <div class="subtitle">
            Tom Odell
        </div>`,
        poster:'poster/5.jpg'
    },
    {
        id:'6',
        songname:`Bekhayli 
        <div class="subtitle">
            Sachet Tandon
        </div>`,
        poster:'poster/6.jpg'
    },
    {
        id:'7',
        songname:`Aadat
        <div class="subtitle">
            Atif Aslam
        </div>`,
        poster:'poster/7.jpg'
    },
    {
        id:'8',
        songname:`Haan tu hai 
        <div class="subtitle">
            K.K.
        </div>`,
        poster:'poster/8.jpg'
    },
    {
        id:'9',
        songname:`Snap 
        <div class="subtitle">
            Karan Sehmbi
        </div>`,
        poster:'poster/9.jpg'
    },
    {
        id:'10',
        songname:`Under the influence 
        <div class="subtitle">
            Elle King
        </div>`,
        poster:'poster/10.jpg'
    },
    {
        id:'11',
        songname:`Romantic Homocide 
        <div class="subtitle">
            Olivia Holt
        </div>`,
        poster:'poster/11.jpg'
    },
    {
        id:'12',
        songname:`I wanna be yours
        <div class="subtitle">
            Arctic Monkeys
        </div>`,
        poster:'poster/12.jpg'
    },
    {
        id:'13',
        songname:`Chitta 
        <div class="subtitle">
            Manan Bhardwaj
        </div>`,
        poster:'poster/13.jpg'
    },
    {
        id:'14',
        songname:`Another love (2)
        <div class="subtitle">
            Tom Odell
        </div>`,
        poster:'poster/14.jpg'
    },
    {
        id:'15',
        songname:`Haan tu hai (2) 
        <div class="subtitle">
            K.K.
        </div>`,
        poster:'poster/15.jpg'
    },
    {
        id:'16',
        songname:`Under Influence
        <div class="subtitle">
            Elle King
        </div>`,
        poster:'poster/16.jpg'
    },
    {
        id:'17',
        songname:`Kaise ho tum (2)
        <div class="subtitle">
            Agnee
        </div>`,
        poster:'poster/17.jpg'
    },
    {
        id:'18',
        songname:`Romantic Homocide (2)
        <div class="subtitle">
            Olivia Holt
        </div>`,
        poster:'poster/18.jpg'
    },
    {
        id:'19',
        songname:`lag ja gale (2)
        <div class="subtitle">
            Lata Mangeshkar
        </div>`,
        poster:'poster/19.jpg'
    },
    {
        id:'20',
        songname:`Snap (2)
        <div class="subtitle">
            Karan Sehmbi
        </div>`,
        poster:'poster/20.jpg'
    },
]


Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songname
})

Array.from(document.getElementsByClassName('song_item')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songname
})



let master_play = document.getElementById('master_play');
let wave = document.getElementsByClassName('wave')[0];




master_play.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0 ) {
        music.play();
        master_play.classList.remove('fa-play')
        master_play.classList.add('fa-pause')
        wave.classList.add('active2');
    } else {
        music.pause();   
        master_play.classList.add('fa-play')
        master_play.classList.remove('fa-pause')
        wave.classList.remove('active2');
    }
})

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
        
    })
}

let index = 0;
let master_play_poster = document.getElementById('master_play_poster');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        index = e.target.id;
        makeAllPlay();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        music.src = `audios/${index}.mp3`;
        master_play_poster.src = `poster/${index}.jpg`;
        music.play();

        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            title.innerHTML = ele.songname;
        })
        master_play.classList.remove('fa-play')
        master_play.classList.add('fa-pause')
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            master_play.classList.add('fa-play')
            master_play.classList.remove('fa-pause')
            wave.classList.remove('active2');
        })
    })
})

let current = document.getElementById('currentStart');
let end = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_crr = music.currentTime;
    let music_drr = music.duration;

    let min = Math.floor(music_drr/60);
    let sec = Math.floor(music_drr%60);

    if (sec < 10) {
        sec = `0${sec}`       
    }
    end.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_crr/60);
    let sec1 = Math.floor(music_crr%60);

    if (sec1 < 10) {
        sec1 = `0${sec1}`       
    }
    if (min1 < 10) {
        min1 = `0${min1}`
    }
    current.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100)
    seek.value = progressbar;
    let seekbar = seek.value;
    dot.style.left = `${seekbar}%`;
    bar2.style.width = `${seekbar}%`;

})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended',()=>{
    master_play.classList.add('fa-play')
    master_play.classList.remove('fa-pause')
    wave.classList.remove('active2');
})

document.addEventListener('DOMContentLoaded', function () {
    const leftScroll = document.getElementById('left_scroll');
    const rightScroll = document.getElementById('right_scroll');
    const songsContainer = document.querySelector('.pop_song');
    const scrollAmount = 300; // Adjust the scroll amount as needed

    leftScroll.addEventListener('click', () => {
        songsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightScroll.addEventListener('click', () => {
        songsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});
