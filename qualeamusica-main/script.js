const audioPlayer = document.getElementById("audioPlayer");
const checkButton = document.getElementById("check-button");
const resultMessage = document.getElementById("result-message");
const audio = document.getElementById('audio')

let player;
let trackName;
let pontos = 0;
let gameOver = 0;

var pontuacao = document.getElementById('pontos')

window.onSpotifyWebPlaybackSDKReady = () => {
  //Trocar o token abaixo a cada hora, precisa estar logado, através do link https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started 
  const token ="BQB4-PGsoKtyyW3-48LweMnWWUB5RHhdX6QBFGKsZMu9dG84aeXbTCDkYdRPnyIajxIHjhEAB-Ib0WYmFtLL7WfDS_mX35WIjuk9XjSYkyuy15JbJzPaQwDYVGfup_KP3daM7IBHTd3b-57eeRluQ4uLO2f2VKm2GUoUTLctZ3_I0a5ywwUO9hv4daJpo6vqncITDsTgDAZuQSFg8EliZ0-qaecd"
    player = new Spotify.Player({
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    const connect_to_device = () => {
      let album_uri = "spotify:playlist/1ww16bNkMqp46mDTXxiDWO"
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: album_uri,
          play: false,
        }),
        headers: new Headers({
            "Authorization": "Bearer " + token,
        }),
    }).then(response => console.log(response))
    .then(data => {
      // Adicionar listener para o evento de mudança de estado de reprodução
      player.addListener('player_state_changed', ({
        track_window
      }) => {
        trackName = track_window.current_track.name;
        trackName = trackName.toLowerCase();
        console.log('Current Track:', trackName);
      });})}
    connect_to_device();
  });

//botão play music para tocar a musica por 13 segundos
document.getElementById("play-music").addEventListener('click',() => {
    player.togglePlay();
    setTimeout(() => {
      player.pause();
    }, 13000);
  });
  
//botão resposta para verificar se a resposta está correta apagar a resposta e mudar a musica do play-music para a proxima
 document.getElementById("btn-resposta").addEventListener('click',(event) => {
  event.preventDefault();
  let resposta = document.getElementById("resposta").value;
  resposta = resposta.toLowerCase();
  if (resposta == trackName) {
    alert("Você Acertou, Parabéns!");
    document.getElementById("resposta").value = "";
        player.nextTrack();
        setTimeout(() => {
        player.pause();
        }, 1300);
      
        pontos += 5;
        pontuacao.textContent = pontos
        

        } else {
        alert("Você errou, tente novamente!");

      pontos -= 5;
      pontuacao.textContent = pontos
      gameOver++
      
        resultMessage.textContent = 'Você errou'
      }

     if(gameOver===3){
         alert('Game Over');
         window.open('game_over.html');
     }
    });
  player.connect(); 
  }

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const albumsHeader = document.querySelector(".spotify-playlists h2");

  darkModeToggle.addEventListener("click", function () {
      if (document.body.classList.contains("dark-mode")) {
          document.body.classList.remove("dark-mode");
          albumsHeader.classList.remove("black-text");
      } else {
          document.body.classList.add("dark-mode");
          albumsHeader.classList.add("black-text");
      }
  });
});

// Função para iniciar o jogo
function startGame() {

// Seleciona a classe "dark-mode-container" e remove a classe "hidden"
const darkModeContainer = document.querySelector(".dark-mode-container");
darkModeContainer.classList.remove("hidden");

// Remova a classe "hidden" de todos os elementos dentro da "dark-mode-container"
const playerButton = darkModeContainer.querySelector("#play-music");
const lblResposta = darkModeContainer.querySelector("#lbl-resposta");
const resposta = darkModeContainer.querySelector("#resposta");
const btnResposta = darkModeContainer.querySelector("#btn-resposta");

playerButton.classList.remove("hidden");
lblResposta.classList.remove("hidden");
resposta.classList.remove("hidden");
btnResposta.classList.remove("hidden");
}




