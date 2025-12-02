// src/components/NavButtons.tsx
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function NavButtons() {
  const navigate = useNavigate();
  return (
    <div
      style={Style.bar}
    >
      <div style={Style.buttonContainer}>
        <button style={Style.button} onClick={() => navigate("/")} >Pesquisa</button>
        <button style={Style.button} onClick={() => navigate("/filters")} className="btn">Filtros</button>
      </div>
      <p style={Style.p}>TDW-M2B</p>

    </div>
  );
}


const Style: Record<string, CSSProperties> = {
  bar: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    justifyContent: 'space-between',
    padding: '20px',
    borderBottom: '3px solid black',
    borderRadius: '100px',

  },
  p: {
    marginRight: '20px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginRight: '50px',
    marginLeft: '10px',
    paddingLeft: '10px',
    height: 'fit-content',
    display: 'flex',
    gap: '8px',
  },
  button: {
    height: 'fit-content',
    textTransform: 'capitalize',
    backgroundColor: '#e2e8f0',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  }
}