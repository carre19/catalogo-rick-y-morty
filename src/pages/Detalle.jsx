import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Descriptions, Alert, Spin, Result, Card } from "antd";
import { getItemById } from "../services/api";

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchItem = () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    getItemById(id)
      .then((data) => setItem(data))
      .catch((err) => {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (notFound) {
    return (
      <Result
        status="404"
        title="Elemento no encontrado"
        subTitle="El personaje que buscás no existe."
        extra={
          <Button type="primary" onClick={() => navigate("/catalogo")}>
            Volver al catálogo
          </Button>
        }
      />
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
        <Alert
          type="error"
          message="Ocurrió un error al cargar el personaje"
          description={error.message}
          showIcon
          action={
            <a onClick={fetchItem} style={{ cursor: "pointer" }}>
              Reintentar
            </a>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
      <Button onClick={() => navigate("/catalogo")} style={{ marginBottom: 16 }}>
        Volver
      </Button>
      <Card cover={<img alt={item.name} src={item.image} />}>
        <Descriptions title={item.name} column={1} bordered>
          <Descriptions.Item label="Estado">{item.status}</Descriptions.Item>
          <Descriptions.Item label="Especie">{item.species}</Descriptions.Item>
          <Descriptions.Item label="Género">{item.gender}</Descriptions.Item>
          <Descriptions.Item label="Origen">{item.origin?.name}</Descriptions.Item>
          <Descriptions.Item label="Última ubicación conocida">
            {item.location?.name}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
