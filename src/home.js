import React from "react";
import { useCSVReader } from "react-papaparse";
import JSZip from "jszip";
import FileSaver from "file-saver";
import html2canvas from "html2canvas";

import HTMLPlaceholder from "./placeholder";

export default function Home() {
  const [lista, setLista] = React.useState([]);
  const [refs, setRefs] = React.useState([]);
  const { CSVReader } = useCSVReader();

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  function downloadAllImages() {
    const zip = new JSZip();
    const promisesArray = refs.map((value) => {
      return html2canvas(value.ref.current, {
        backgroundColor: "#FFFFFF",
      }).then((canvas) => {
        return {
          name: value.name,
          file: dataURLtoFile(canvas.toDataURL("png")),
        };
      });
    });
    Promise.all(promisesArray).then((results) => {
      results.forEach((value) => zip.file(`${value.name}.png`, value.file));
      zip.generateAsync({ type: "blob" }).then((content) => {
        FileSaver.saveAs(content, "download.zip");
      });
    });
  }

  function DownloadButton() {
    if (lista.length >= 1) {
      return (
        <button className="download" onClick={downloadAllImages}>
          Exportar tudo como PNG
        </button>
      );
    }

    return <></>;
  }

  function UploadCSVButton({ getRootProps, acceptedFile }) {
    return (
      <div className="upload_button">
        <button type="button" {...getRootProps()}>
          Selecionar arquivo CSV
        </button>
        <h4>{acceptedFile && acceptedFile.name}</h4>
      </div>
    );
  }

  return (
    <>
      <CSVReader
        onUploadAccepted={(results) => {
          results.data.shift();
          setLista(results.data);
        }}
      >
        {UploadCSVButton}
      </CSVReader>
      <DownloadButton />
      <HTMLPlaceholder values={lista} refs={refs} setRefs={setRefs} />
    </>
  );
}
