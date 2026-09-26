import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, Col, Row, Input, Spin, Alert, Empty, Tag } from "antd";
import { getItems } from "../services/api";

const { Search } = Input;

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscar = searchParams.get("buscar") || "";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    setError(null);
    getItems({ name: buscar })
      .then((data) => setItems(data.results || []))
      .catch((err) => {
        if (err.response?.status === 404) {
          setItems([]);
        } else {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscar]);

  const handleSearch = (value) => {
    const params = {};
    if (value) params.buscar = value;
    setSearchParams(params);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 16px" }}>
      <h1>Catálogo de personajes</h1>
      <Search
        placeholder="Buscar personaje por nombre..."
        defaultValue={buscar}
        onSearch={handleSearch}
        allowClear
        style={{ marginBottom: 24, maxWidth: 400 }}
      />

      {loading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </div>
      )}

      {!loading && error && (
        <Alert
          type="error"
          message="Ocurrió un error al cargar los personajes"
          description={error.message}
          showIcon
          action={
            <a onClick={fetchItems} style={{ cursor: "pointer" }}>
              Reintentar
            </a>
          }
        />
      )}

      {!loading && !error && items.length === 0 && <Empty description="No se encontraron personajes" />}

      {!loading && !error && items.length > 0 && (
        <Row gutter={[16, 16]}>
          {items.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <Link to={`/catalogo/${item.id}`}>
                <Card hoverable cover={<img alt={item.name} src={item.image} />}>
                  <Card.Meta
                    title={item.name}
                    description={
                      <>
                        <Tag color={item.status === "Alive" ? "green" : item.status === "Dead" ? "red" : "default"}>
                          {item.status}
                        </Tag>
                        <span>{item.species}</span>
                      </>
                    }
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
