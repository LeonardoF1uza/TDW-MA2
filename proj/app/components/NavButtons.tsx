// src/components/NavButtons.tsx
import { useNavigate } from "react-router-dom";

export default function NavButtons() {
  const navigate = useNavigate();
  return (
    <div 
    style={{ display: "flex", gap: '8px', width:'100%', textTransform: 'lowercase' }}
    className="flex  w-full justify-content-start  text-lowercase gap-2">
      <button onClick={() => navigate("/")} className="btn">Home</button>
      <button onClick={() => navigate("/filters")} className="btn">Filters</button>
    </div>
  );
}
