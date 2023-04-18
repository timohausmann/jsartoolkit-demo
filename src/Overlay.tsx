import { CSSProperties } from "react";




export function Overlay() {


    const style: CSSProperties = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: 'min(90vh, 90vw)',
        height: 'min(90vh, 90vw)',
        transform: 'translate(-50%, -50%)',
        border: '2px solid white',
    };

    return (
        <div style={style}></div>
    )
}