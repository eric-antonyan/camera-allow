import React, {
    useState
} from "react";
import QrReader from "react-web-qr-reader";

const Example = () => {
    const delay = 500;

    const previewStyle = {
        height: 240,
        width: 320
    };

    const [result, setResult] = useState("No result");

    const handleScan = (result) => {
        if (result) {
            setResult(result);
        }
    };

    const handleError = (error) => {
        console.log(error);
    };

    const isCameraSupported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

    if (!isCameraSupported) {
        return <p>Your browser does not support camera access. Please try a different browser.</p>;
    }


    return (
        <>
            <QrReader
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <p>{result}</p>
        </>
    );
};

export default Example;
