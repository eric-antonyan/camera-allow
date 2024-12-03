const BarcodeScanner = () => {
    const videoRef = useRef(null);
    const [result, setResult] = useState("Ожидание...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const codeReader = new BrowserBarcodeReader();
        let selectedDeviceId;

        // Получаем список камер
        codeReader
            .listVideoInputDevices()
            .then((devices) => {
                if (devices.length > 0) {
                    selectedDeviceId = devices[0].deviceId;

                    // Сканируем штрих-код
                    codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (scanResult, err) => {
                        if (scanResult) {
                            setResult(scanResult.text);
                            console.log(scanResult.text);

                            // Если найден URL, переходим на него
                            if (scanResult.text.startsWith("http")) {
                                window.location.href = scanResult.text;
                            }
                        }
                        if (err && !(err instanceof codeReader.NotFoundException)) {
                            setError(err.message || "Ошибка сканирования");
                            console.error(err);
                        }
                    });
                } else {
                    setError("Камера не найдена.");
                }
            })
            .catch((err) => setError(err.message || "Ошибка получения камеры."));

        // Очистка при размонтировании
        return () => {
            codeReader.reset();
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Сканер штрих-кодов</h1>
            <video ref={videoRef} style={{ width: "100%", maxWidth: "400px", border: "1px solid black" }} />
            <p>Результат: <strong>{result}</strong></p>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default BarcodeScanner;
