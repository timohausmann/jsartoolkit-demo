//@ts-ignore
import { start } from './multi_worker_ES6.js';
import yeah from '@webarkit/jsartoolkit-nft'
import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Overlay } from './Overlay.js';

const markerUrls = [ 
    "/marker/david/david",
    "/marker/garten/garten", 
    "/marker/green-april/green-april",
    "/marker/knabe/knabe",
    "/marker/kreuzigung/kreuzigung",
    "/marker/menschen/menschen",
    "/marker/picasso/picasso",
    "/marker/tierschicksale/tierschicksale",
    "/marker/toteninsel/toteninsel", 
    "/marker/waschweiber/waschweiber",
];
// const markerUrls = [ "/DataNFT/pinball", "/DataNFT/chalk_multi", "/DataNFT/kuva" ];

function App() {

    const { ARToolkitNFT, ARControllerNFT } = yeah;

    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // ----

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let hint: MediaStreamConstraints = {
                audio: false,
                video: true
            };
            
            var width = (window.innerWidth < window.innerHeight) ? 240 : 360;
            var height = (window.innerWidth < window.innerHeight) ? 360 : 240;

            //   var aspectRatio = window.innerWidth / window.innerHeight;

            console.log(width, height);

            hint = {
                audio: false,
                video: {
                    facingMode: 'environment',
                    width: { min: width, max: width }
                },
            };

            console.log(hint);

            navigator.mediaDevices.getUserMedia(hint).then(function (stream) {

                if (!video.current) return;

                console.log('getting stream', stream);

                video.current.srcObject = stream;
                video.current.addEventListener('loadedmetadata', doStuff);
            });
        }

        function doStuff() {
            if (!video.current) return;
            video.current.play();

            // console.log('video', video.current, video.current.videoWidth, video.current.videoHeight);
            
            start(
                markerUrls, 
                video.current, 
                video.current.videoWidth, 
                video.current.videoHeight, 
                function() { /*statsMain.update()*/ }, 
                function() { /*statsWorker.update()*/ },
                foundIndex,
            );
        }

        function foundIndex(index:number) {
            alert(['Marker found!', index, markerUrls[index]].join(' '));
        }

        return () => {
            if(!video.current) return;
            video.current.removeEventListener('loadedmetadata', doStuff);
            video.current.srcObject = null;
        };
        // ----
    }, []);


    return (
        <div className="app">
            <Overlay />
            <video
                ref={video}
                loop
                autoPlay
                muted
                playsInline
            ></video>
        </div>
    )
}

export default App
