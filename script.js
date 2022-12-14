const audioStore = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
function App() {
    const [volume, setVolume] = React.useState(1);
    const [display, setDisplay] = React.useState("")

    return (
        <div id="drum-machine" className="box text-center">
            
                <h2 className="text-white">Drum Machine</h2>
                {audioStore.map((clip) => (<Pad clip={clip} volume={volume} key={clip.keyTrigger} setDisplay={setDisplay} />))}
                <br />
                <h4 className="text-white">Volume</h4>
                <input 
                    type="range" 
                    step="0.01" 
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)} 
                    max="1" 
                    min="0" 
                    className="w-50"/>
                <br />
                <h5 id="display" className="text-white p-3">{display}</h5>
        </div>
    );
}

function Pad({clip, volume, setDisplay}) {
    const [active, setActive] = React.useState(false);
    

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const handleKeyPress = (e) => {
        if ((e.key).toUpperCase() === clip.keyTrigger) {
            playSound()
        }
    }

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(() => setActive(false), 200);
        audioTag.volume = volume
        audioTag.currentTime = 0;
        audioTag.play();
        setDisplay(clip.id)
    }
    
    return (
            <div onClick={playSound} id={clip.id} className={`drum-pad btn btn-primary p-4 m-3 ${active && "btn-warning"}`}>
                <audio className="clip" id={clip.keyTrigger} src={clip.url} />
                {clip.keyTrigger}
            </div>  
    )
}

ReactDOM.render(
    <App />, document.getElementById("app")
)