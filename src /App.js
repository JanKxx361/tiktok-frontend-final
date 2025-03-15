import React, { useState } from "react";

function App() {
  const [productName, setProductName] = useState("");
  const [script, setScript] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  const handleGenerateScript = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://dein-backend.onrender.com/generate_script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_name: productName }),
      });

      const data = await response.json();
      setScript(data.script);
    } catch (error) {
      console.error("Error generating script:", error);
    }

    setLoading(false);
  };

  const handleGenerateVideo = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://dein-backend.onrender.com/generate_video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_name: productName }),
      });

      const data = await response.json();
      setVideoLink(data.video_url);
    } catch (error) {
      console.error("Error generating video:", error);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>TikTok Produktvergleich Tool</h1>
      <input
        type="text"
        value={productName}
        onChange={handleInputChange}
        placeholder="Produktname eingeben"
      />
      <button onClick={handleGenerateScript} disabled={loading}>
        {loading ? "Generiere..." : "Skript generieren"}
      </button>

      {script && (
        <div>
          <h2>Generiertes Skript:</h2>
          <p>{script}</p>
        </div>
      )}

      <button onClick={handleGenerateVideo} disabled={loading}>
        {loading ? "Video wird erstellt..." : "Video generieren"}
      </button>

      {videoLink && (
        <div>
          <h2>Video ansehen:</h2>
          <a href={videoLink} target="_blank" rel="noopener noreferrer">
            Hier ansehen
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
