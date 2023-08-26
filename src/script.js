var playlist = [];
const urlParams = new URLSearchParams(window.location.search);
const argsParam = urlParams.get('args');
const currentDir = urlParams.get('currentDir'); // Assuming 'currentDir' is provided in the URL
const fs = require('fs'); // this is used for checking things, don't remove it, please
const { platform } = require('os');
let currentIndex = 0;
const args = JSON.parse(argsParam);
console.log(args);

if (args.length > 2) {
    for (let i = 2; i < args.length; i++) {
        const dirContents = fs.readdirSync(currentDir);
        const isFileInDir = dirContents.includes(args[i]);
        const mediaPath = isFileInDir ? `${currentDir}/${args[i]}` : args[i];
        playlist.push(mediaPath);
    }
}

const container = document.getElementById('container');

// Create media element
const mediaElement = args[0] === 'video' ? 'video' : 'audio';
var media = new Media('media', mediaElement);
media.element.controls = true;
media.element.src = playlist[0];

// Create volume slider
const volumeSlider = new Slider('volumeSlider');
volumeSlider.element.min = 0;
volumeSlider.element.max = 1;
volumeSlider.element.step = 0.001;
volumeSlider.element.value = 0.5;

// Create video progress bar
const videoProgress = new Progress('videoProgress');
videoProgress.element.value = 0;
videoProgress.element.max = 100;
videoProgress.addTo(container);

// Attach event listeners
media.element.addEventListener('timeupdate', () => {
    const currentTime = media.element.currentTime;
    const duration = media.element.duration;
    const progressPercentage = (currentTime / duration) * 100;
    videoProgress.element.value = progressPercentage;
});
media.element.onended = function(){
    
    currentSrc = media.element.src.replace('file://', '');
    currentSrc = decodeURI(currentSrc)
    console.log(currentSrc)

    for (let i = 0; i < playlist.length; i++) {
        const currentItem = playlist[i];
        const nextItem = playlist[i + 1];
        console.log(nextItem)

        if (currentItem === currentSrc && nextItem) {
            console.log(nextItem)
            trackDropdown.onChange(nextItem);
            trackDropdown.setValue(nextItem)
            break; // Exit the loop once the next item is found and handled.
        }
    }
};

volumeSlider.onChange = function () {
    media.element.volume = this.element.value;
};
window.addEventListener('keydown', (event) => {
    if (media.element.src) {
        currentIndex = playlist.indexOf(decodeURI(media.element.src));
        switch (event.key) {
            case ' ':
                playPauseButton.element.click();
                break;
            case 'ArrowLeft':
                media.element.currentTime -= 10;
                break;
            case 'ArrowRight':
                media.element.currentTime += 10;
                break;
            case 'ArrowUp':
                volumeSlider.element.value = Math.min(parseFloat(volumeSlider.element.value) + 0.05, 1);
                volumeSlider.onChange();
                break;
            case 'ArrowDown':
                volumeSlider.element.value = Math.max(parseFloat(volumeSlider.element.value) - 0.05, 0);
                volumeSlider.onChange();
                break;
            case 'Home':
                if (playlist.length > 0) {
                    trackDropdown.onChange(playlist[0]);
                }
                break;
            case 'End':
                if (playlist.length > 0) {
                    trackDropdown.onChange(playlist[playlist.length - 1]);
                }
                break;
            case 'PageUp':
                currentSrc = media.element.src.replace('file://', '');
                currentSrc = decodeURI(currentSrc)
                console.log(currentSrc)
            
                for (let i = 0; i < playlist.length; i++) {
                    const currentItem = playlist[i];
                    const nextItem = playlist[i + 1];
                    console.log(nextItem)
            
                    if (currentItem === currentSrc && nextItem) {
                        console.log(nextItem)
                        trackDropdown.onChange(nextItem);
                        trackDropdown.setValue(nextItem)
                        break; // Exit the loop once the next item is found and handled.
                    }
                }
                break;
            case 'PageDown':
                currentSrc = media.element.src.replace('file://', '');
                currentSrc = decodeURI(currentSrc)
                console.log(currentSrc)
            
                for (let i = playlist.length - 1; i >0;i--) {
                    const currentItem = playlist[i];
                    const nextItem = playlist[i - 1];
                    console.log(nextItem)
            
                    if (currentItem === currentSrc && nextItem) {
                        console.log(nextItem)
                        trackDropdown.onChange(nextItem);
                        trackDropdown.setValue(nextItem)
                        break; // Exit the loop once the next item is found and handled.
                    }
                }
                break;
            // Add more custom controls as needed
        }
    }
});

// Create play/pause button
const playPauseButton = new Button('playPauseButton', 'Play');
let isPlaying = false;
playPauseButton.onClick = function () {
    if (isPlaying) {
        media.element.pause();
        playPauseButton.element.textContent = 'Play';
    } else {
        media.element.play();
        playPauseButton.element.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
};

// Create track dropdown
const trackDropdown = new Dropdown('trackDropdown', playlist);
trackDropdown.onChange = function (selectedValue) {
    const isVideo = selectedValue.endsWith('.mp4');
    const newMediaElement = isVideo ? 'video' : 'audio';
    removeComponentFromBody(media);
    media = new Media('media', newMediaElement);
    media.element.controls = true;
    media.element.src = selectedValue;
    videoProgress.element.value = 0;
    addComponentToBody(media);
    playPauseButton.element.textContent = 'Play';
    isPlaying = false;
};

// Add components to container
addComponentToBody(media);
addComponentToBody(videoProgress);
addComponentToBody(volumeSlider);
addComponentToBody(playPauseButton);
addComponentToBody(trackDropdown);
