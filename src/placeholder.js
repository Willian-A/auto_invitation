import React from "react";

import fundo_grade from "../static/fundo_grade.png";
import forma from "../static/forma.png";
import logo_iniciativa from "../static/logo_iniciativa.png";
import fru_branco from "../static/fru_branco.png";
import fru_azul from "../static/fru_azul.png";
import powered_by from "../static/powered_by.png";

function Random(props) {
  return props.values.map((text, index) => {
    const componentRef = React.useRef();
    React.useEffect(
      () =>
        props.setRefs((old) => [...old, { ref: componentRef, name: text[0] }]),
      []
    );
    return (
      <div className="box_shadow">
        <section ref={componentRef} className="container" key={index}>
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
            {text[2].toLowerCase() === "masculino" ? "Prezado" : "Prezada"}{" "}
            <b>{text[0].trim()},</b>
          </h3>
          <h3>
            24 meses depois,{" "}
            <b className="fru_azul">
              VOCÊ <img src={fru_azul} alt="" />
            </b>
            <br /> é{" "}
            {text[2].toLowerCase() === "masculino"
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
              preparado para promover inteira- cões e conexões{" "}
              <b>presenciais</b> entre as lideranças, parceiros, empreendedores
              e startups.
            </h4>
            <h4 className="small">
              <b>Endereço:</b> Casa do Empresário Rua da Candelária 9, Mezanino
            </h4>
            <b>
              <h4>Venha viver conosco esta experiência!</h4>
            </b>
            <div className="data">
              <b>
                <h2>{text[1]}</h2>
              </b>
              <b>
                <h2>16:00 às 21:00</h2>
              </b>
            </div>
            <h5>RSVP {text[3].toLowerCase()} para este número.</h5>
          </div>
          <img src={powered_by} alt="" className="powered_by" />
        </section>{" "}
      </div>
    );
  });
}

export default function HTMLPlaceholder(props) {
  const values = props.values;

  React.useEffect(() => console.log(props.refs), [props.refs]);

  return <Random setRefs={props.setRefs} values={values} />;
}
