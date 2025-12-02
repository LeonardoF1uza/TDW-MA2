// src/components/BackButton.tsx
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="bg-gray-300 px-3 py-1 rounded">
      ← Voltar
    </button>
  );
}
