import { Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
      <Title>Catálogo de Rick y Morty</Title>
      <Paragraph>
        Explorá los personajes del universo de Rick y Morty usando datos
        traídos en vivo desde la{" "}
        <a
          href="https://rickandmortyapi.com/documentation"
          target="_blank"
          rel="noreferrer"
        >
          Rick and Morty API
        </a>
        . Podés buscar por nombre y ver el detalle de cada personaje.
      </Paragraph>
      <Link to="/catalogo">
        <Button type="primary">Ver catálogo</Button>
      </Link>
    </div>
  );
}
