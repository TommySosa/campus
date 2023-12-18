import { useState, useEffect } from "react";
import Increaste from "./IncreaseSvg";
import Decrease from "./Decrease";

export default function AccesibilityButtons({sizes}) {
    const [fontSize, setFontSize] = useState(16);
    const [h1Size, setH1Size] = useState(32)
    const [h2Size, setH2Size] = useState(30)
    const [h3Size, setH3Size] = useState(24)
    const [h4Size, setH4Size] = useState(20)

    const increaseFontSize = () => {
        setFontSize(fontSize + 1);
        setH1Size(h1Size + 1)
        setH2Size(h2Size + 1)
        setH3Size(h3Size + 1)
        setH4Size(h4Size + 1)
    };

    useEffect(() => {
        const sizes = {
            fontSize,
            h1Size,
            h2Size,
            h3Size,
            h4Size,
        };

        localStorage.setItem("tamaños", JSON.stringify(sizes));
    }, [h1Size, h2Size, h3Size, h4Size, fontSize]);

    useEffect(() => {
        if (sizes) {
            const parsedSizes = JSON.parse(sizes);
            setFontSize(parsedSizes.fontSize)
            setH1Size(parsedSizes.h1Size);
            setH2Size(parsedSizes.h2Size);
            setH3Size(parsedSizes.h3Size);
            setH4Size(parsedSizes.h4Size);
        }
        console.log('sizes',sizes);
    }, [sizes]);

    const decreaseFontSize = () => {
        setFontSize(fontSize - 1);
        setH1Size(h1Size - 1)
        setH2Size(h2Size - 1)
        setH3Size(h3Size - 1)
        setH4Size(h4Size - 1)
        console.log(fontSize);
        const tamaños = localStorage.getItem("tamaños")
        console.log(tamaños);
    };
    return (
        <div className="w-full">
            <div className="flex items-center">
                <button onClick={increaseFontSize} className="text-xs px-2">
                    <Increaste style={{ fontSize: "1em" }} />
                    Fuente
                </button>
                <button onClick={decreaseFontSize} className="text-xs px-2">
                    <Decrease style={{ fontSize: "1em" }} />
                    Fuente
                </button>
            </div>

            <style jsx global>{`
        body {
          font-size: ${fontSize}px;
        }
        h1{
            font-size: ${h1Size}px;
        }
        h2{
            font-size: ${h2Size}px;
        }
        h3{
            font-size: ${h3Size}px;
        }
        h4{
            font-size: ${h4Size}px;
        }
      `}</style>
        </div>
    )
}