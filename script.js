

const $$ = document.querySelectorAll.bind (document);
const $ = document.querySelector.bind (document);


const heading=$('header h2');
const cDThumb=$('.cd-thumb');
const audio=$('#audio')
const playIcon=$('.icon-play');
const pauseIcon=$('.icon-pause');
const cd=$('.cd');
const playBtn=$('.toogle-play-btn')
const player=$('.player')
const progress=$('#progress')
const nextBtn=$('.next-btn')
const prevBtn=$('.prev-btn')
const randomBtn=$('.random-btn')
const repeatBtn=$('.repeat-btn') 
const playlist=$('.playlist')
console.log(playlist);

const app={
    currentIndex: 0,
    isPlaying : false,
    isRandom: false,
    isRepeat: false,
   songs: [
    {
        name:'Chìm Sâu',
        singer:'MCK',
        path:'./song/chim-sau.mp3',
        img:'./img/chim-sau.jpg'
    },
    {
        name:'Tại vì Sao',
        singer:'MCK',
        path:'https://www.mboxdrive.com/tai%20vi%20sao.mp3',
        img:'./img/tai-vi-sao.jfif'
    },
    {
        name:'Roses',
        singer:'Finn Askew',
        path:'./song/roses.mp3',
        img:'./img/roses.jpg'
    },
    {
        name:'3107',
        singer:'W/n Duong Nau',
        path:'./song/3107.mp3',
        img:'./img/3107.jpg'
    },
    {
        name:'Say dam trong lan dau ',
        singer:'RPT GROOVIE',
        path:'./song/say-dam-trong-lan-dau.mp3',
        img:'https://i1.sndcdn.com/artworks-8svTrajaoEKvVnLi-3Bf7yw-t500x500.jpg'
    },
    {
        name:'Anh đã lạc vào ',
        singer:'Green Ft Truzg',
        path:'./song/anh-da-lac-vao.mp3',
        img:'https://i1.sndcdn.com/avatars-aO2WfhRk8D65iARg-DFU6Kg-t500x500.jpg'
    },
    {
        name:'Đâu cần một bài ca tình yêu',
        singer:'Tiên Tiên  ',
        path:'./song/dau-can-mot-bai-ca.mp3',
        img:'https://i1.sndcdn.com/artworks-000523188894-pfbbzg-t500x500.jpg'
    },
    {
        name:'Thich em hơi nhiều ',
        singer:'Wren EVans',
        path:'./song/thich-em-hoi-nhieu.mp3',
        img:'https://i1.sndcdn.com/artworks-gjuwJety5q5z8W9x-uK95Lw-t500x500.jpg'
    },
    {
        name:'Cảm giác lúc ấy sẽ ra sao  ',
        singer:'Lou Hoàng',
        path:'./song/cam-giac-lucay.mp3',
        img:'https://i1.sndcdn.com/artworks-000512004984-txd9gk-t500x500.jpg'
    },
    {
        name:'Thu cuối ',
        singer:'MR.T ft YanBi &Hang BingBong',
        path:'./song/thu-cuoi.mp3',
        img:'./img/thu-cuoi.jpg'
    },
   ],
   render:function () {
       const htmls =this.songs.map((song,index)=>{
           return `<div class="song ${index === this.currentIndex ? 'active' :''}"data-index="${index}">
           <div class="thumb" style=" background-image: url(${song.img});
           width: 44px;">
           </div>
           <div class="body">
             <h3 class="title">${song.name}</h3>
             <p class="author">${song.singer}</p>
           </div>
           <div class="option">
             <i class="fas fa-ellipsis-h"></i>
           </div>
         </div>`
       })
       $('.playlist').innerHTML=htmls.join('');
   },
   defineProperties: function(){
        Object.defineProperty(this,'currentSong', {
        get: function(){
            return this.songs[this.currentIndex];
                }}  );
   },
   handleEvents : function(){
       var cdWidth=cd.offsetWidth;


       // handle the spin of the cd 
       const cdThumbAnimation= cDThumb.animate([
           {transform :'rotate(360deg)'}
       ],{
           duration: 10000,
           iterations:Infinity
       })
       cdThumbAnimation.pause();
       //handle the scroll event 
    document.onscroll=function(){
        const scrollTop=window.screenY||document.documentElement.scrollTop;
        const newCdWidth=cdWidth-scrollTop;
        if(newCdWidth>0){
        cd.style.width=newCdWidth+'px';
        cd.style.opacity=newCdWidth/cdWidth;
        }else{
            cd.style.width=0;
        }
    }
    // handle when the play button is hitted
    playBtn.onclick= function(){
        if(app.isPlaying===false){
            app.isPlaying=true;
        audio.play();
        player.classList.add('playing');
        cdThumbAnimation.play();
        }else{
            app.isPlaying=false;
        audio.pause();
        player.classList.remove('playing');
        cdThumbAnimation.pause();
        }

        audio.ontimeupdate = function(){
            const progressPercent=Math.floor(audio.currentTime/audio.duration*100);
            progress.value = progressPercent;
        }

        progress.onchange =function(e){
             audio.currentTime=e.target.value/100*audio.duration;
        }
        
    }
    nextBtn.onclick=function(){
        if(app.isRandom===true){
            app.randomSong();
        }else{
        if(app.isPlaying){
        app.nextSong();
        audio.play();
        }else{
            app.nextSong();
        }
    }
    app.render();
    }
    prevBtn.onclick=function(){
        if(app.isRandom===true){
            app.randomSong();
        }else{
        if(app.isPlaying){
            app.prevSong();
        audio.play();
        }else{
        app.prevSong();
        }
    }
    app.render();
    }
    randomBtn.onclick=function(e){
        if(app.isRandom===false){
        randomBtn.classList.add("active");
        app.isRandom=true;
        }else{
            randomBtn.classList.remove("active");
            app.isRandom=false;
        }
    }
    repeatBtn.onclick = function(){
        if(app.isRepeat===false){
            repeatBtn.classList.add("active");
            app.isRepeat=true;
        }else{
            repeatBtn.classList.remove("active");
            app.isRepeat=false;
        }
      
    }

     audio.onended = function(){
         if(app.isRepeat===true){
             audio.play();
         }else{
         nextBtn.click();
         }
     }
     playlist.onclick=function(e){
         const songElement =e.target.closest('.song:not(.active)');
         if(songElement||e.target.closest('.option')){
            if(e.target.closest('.song:not(.active)')){
               app.currentIndex=Number(songElement.dataset.index);
               app.loadCurrentSong();
                audio.play();
                if(app.isPlaying===false){
                    app.isPlaying=true;
                    cdThumbAnimation.play();
                    player.classList.add('playing');
                }
                app.render();
            }   
         }
     }
   },
   loadCurrentSong: function(){



        heading.textContent =this.currentSong.name;
        cDThumb.style.backgroundImage=`url('${this.currentSong.img}')`;
        audio.src=this.currentSong.path;
   },
  
   scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
   nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex>=app.songs.length-1){
            app.currentIndex=0;
        }
        this.loadCurrentSong();
   },
   prevSong: function(){
    this.currentIndex--;
    console.log(app.songs.length)
    if(this.currentIndex<0){
        app.currentIndex=app.songs.length-1;
    }
    this.loadCurrentSong();
},
    randomSong:function(){
        let a=this.currentIndex;
        do{
        this.currentIndex=Math.floor(Math.random()*app.songs.length);
        }while(this.currentIndex===a);
    
        this.loadCurrentSong();
    },
   start:function(){
       //define property
       this.defineProperties();


    // handle event happen to the wweb 
       this.handleEvents();


    //load the current song 
    this.loadCurrentSong();


       //render the song 
       this.render();
   }
    
}


app.start();