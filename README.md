# 🎉 Birthday Celebration App

A beautiful, interactive birthday celebration web application with personalized greetings, image slideshow, and background music.

## ✨ Features

- **Splash Screen**: Eye-catching entrance with animated image
- **Voice Greeting**: Personalized voice message using text-to-speech
- **Interactive Form**: Name and date of birth input with enhanced calendar picker
- **Image Slideshow**: Automatic slideshow with navigation dots
- **3D Heart Animation**: Floating hearts with 3D effects
- **Background Music**: Birthday song with play/pause controls
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)

### Installation

1. Clone or download this repository
2. Ensure all image files are in the `images/` folder
3. Ensure the music file is in the `song/` folder
4. Open `index.html` in your web browser

### File Structure
```
birthday/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── styles.css          # CSS styling and animations
├── README.md           # This file
├── images/             # Birthday photos
│   ├── sathya1.jpeg
│   ├── sathya2.jpeg
│   └── ...
└── song/               # Background music
    └── Yaramma-Ivalu-Cheluve (1) (mp3cut.net).mp3
```

## 🎯 How to Use

1. **Launch**: Open `index.html` in your browser
2. **Wait**: Enjoy the 5-second splash screen
3. **Listen**: Hear the personalized voice greeting
4. **Enter Details**: Fill in your name and date of birth
5. **Celebrate**: Watch the slideshow and enjoy the music!

## 🎨 Customization

### Adding More Images
1. Add your images to the `images/` folder
2. Update the slideshow section in `index.html`
3. Add corresponding navigation dots

### Changing the Music
1. Replace the music file in the `song/` folder
2. Update the file path in `index.html` (line 162)

### Modifying the Greeting
- Edit the message in `script.js` (line 36)
- Customize voice parameters (rate, pitch, volume)

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
- **JavaScript**: Interactivity and dynamic content
- **Bootstrap 5**: UI components and grid system
- **Web Speech API**: Text-to-speech functionality

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Key Features Implementation

#### Date Input Calendar
- Native HTML5 date picker
- Custom styling with calendar icon
- Automatic validation (past dates only)
- Cross-browser compatibility

#### Voice Synthesis
- Automatic voice selection (Siri-like voices preferred)
- Fallback mechanism for different browsers
- Error handling for unsupported browsers

#### Image Slideshow
- Smooth fade transitions
- Auto-advance every 3 seconds
- Click navigation with dots
- Responsive design

## 🎵 Audio Requirements

The app expects an audio file in the `song/` folder. Supported formats:
- MP3 (recommended)
- WAV
- OGG

## 📱 Mobile Compatibility

The app is fully responsive and works on:
- Smartphones (iOS/Android)
- Tablets
- Desktop computers

## 🔧 Troubleshooting

### Calendar Not Showing
- Ensure you're using a modern browser
- Check if JavaScript is enabled
- Try clicking directly on the calendar icon

### Voice Not Playing
- Check browser permissions for audio
- Ensure speakers/headphones are connected
- Some browsers require user interaction before playing audio

### Images Not Loading
- Verify image files exist in the `images/` folder
- Check file names match exactly (case-sensitive)
- Ensure proper file extensions (.jpeg, .jpg, .png)

### Music Not Playing
- Check if the music file exists in the `song/` folder
- Verify the file path in `index.html`
- Some browsers block autoplay - click the music button

## 📄 License

This project is for personal use. Feel free to customize and modify for your own birthday celebrations!

## 🎂 Credits

Created with ❤️ for birthday celebrations. Enjoy your special day!
