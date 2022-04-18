import React from "react";
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from "react-component-export-image";
import { useCSVReader } from "react-papaparse";
import JSZip from "jszip";
import FileSaver from "file-saver";

import "./style.css";
import fundo_grade from "../static/fundo_grade.png";
import forma from "../static/forma.png";
import logo_iniciativa from "../static/logo_iniciativa.png";
import fru_branco from "../static/fru_branco.png";
import fru_azul from "../static/fru_azul.png";
import powered_by from "../static/powered_by.png";

function ComponenteImage(props) {
  let array = [];
  props.values.shift();
  let values = props.values;
  let teste = values.map((texto, index) => {
    const componentRef = React.useRef();
    // console.log(texto[0]);
    // array.push({ ref: componentRef, nome: texto[0].trim() });
    array.push(
      <div ref={componentRef} className="container" key={index}>
        <img src={fundo_grade} alt="" className="fundo" />
        <img src={logo_iniciativa} alt="" className="logo" />
        <div className="barras">
          <div className="barra"></div>
          <h4>fisweek</h4>
          <div className="barra"></div>
        </div>
        <b>
          <h1>CONVITE</h1>
        </b>
        <h3>
          {texto[2].toLowerCase() === "masculino" ? "Prezado" : "Prezada"}{" "}
          <b>{texto[0].trim()},</b>
        </h3>
        <h3>
          24 meses depois,{" "}
          <b className="fru_azul">
            VOCÊ <img src={fru_azul} alt="" />
          </b>
          <br /> é{" "}
          {texto[2].toLowerCase() === "masculino"
            ? "nosso convidado"
            : "nossa convidada"}{" "}
          para o grande reencontro da Saúde.
        </h3>
        <div className="blue_hour">
          <img src={forma} alt="" className="forma" />
          <b className="fru_branco">
            <img src={fru_branco} alt="" />
            <h2>BLUE HOUR</h2>
          </b>
          <h2>
            o momento em que os <br />
            grandes da Saúde se reencontram
          </h2>
          <h4>
            O espaço projetado para funcionar no centro do Rio de Janeiro foi
            preparado para promover inteira- cões e conexões <b>presenciais</b>{" "}
            entre as lideranças, parceiros, empreendedores e startups.
          </h4>
          <h4 className="small">
            <b>Endereço:</b> Casa do Empresário Rua da Candelária 9, Mezanino
          </h4>
          <b>
            <h4>Venha viver conosco esta experiência!</h4>
          </b>
          <div className="data">
            <b>
              <h2>{texto[1]}</h2>
            </b>
            <b>
              <h2>16:00 às 21:00</h2>
            </b>
          </div>
          <h5>RSVP {texto[3].toLowerCase()} para este número.</h5>
        </div>
        <img src={powered_by} alt="" className="powered_by" />
      </div>
    );
    return {
      ref: componentRef,
      nome: texto[0].trim(),
    };
  });

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

  return (
    <>
      <button
        className="download"
        onClick={async function (event) {
          event.target.disabled = true;
          const zip = new JSZip();

          var array;
          array = teste.map((value) => {
            return html2canvas(value.ref.current, {
              backgroundColor: "#FFFFFF",
            }).then((canvas) => {
              return {
                nome: value.nome,
                file: dataURLtoFile(canvas.toDataURL("png")),
              };
            });
          });
          // zip.file("tst2e.txt", "PMID:29651880\r\nPMID:29303721");
          Promise.all(array).then(function (results) {
            results.forEach((value, index) => {
              zip.file(`${value.nome}.png`, value.file);
            });
            zip.generateAsync({ type: "blob" }).then(function (content) {
              FileSaver.saveAs(content, "download.zip");
            });
          });
        }}
      >
        Exportar tudo como PNG
      </button>
      {array}
    </>
  );
}

function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    // The file's text will be printed here
    console.log(event.target.result);
  };

  reader.readAsText(file);
}

function Generator(props) {
  return (
    <div>
      <form>
        <input type="file" accept=".csv" id="csvFile" onChange={onChange} />
      </form>
    </div>
  );
}

function App() {
  const [lista, setLista] = React.useState([]);
  const { CSVReader } = useCSVReader();
  return (
    <>
      <CSVReader
        onUploadAccepted={(results) => {
          setLista(results.data);
        }}
      >
        {({ getRootProps, acceptedFile }) => (
          <div className="upload_button">
            <button type="button" {...getRootProps()}>
              Selecionar arquivo CSV
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
          </div>
        )}
      </CSVReader>
      <ComponenteImage values={lista} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
