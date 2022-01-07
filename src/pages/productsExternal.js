import React, { useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import Title from "../components/title/title";
import ProductsMenu from "../components/menu/productsMenu";
import CustomPagination from "../components/pagination/pagination";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { foreignBrands } from "../queries/queries";

// css
import "../assets/css/_products.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductsExternal = () => {
  const [page, setPage] = useState(0);
  const totalRef = useRef(null);
  const { slug } = useParams();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery(
    ["foreignBrands", slug !== undefined ? "/" + slug : "", page],
    foreignBrands,
    {
      refetchOnWindowFocus: false,
      onSuccess: function (succ) {
        totalRef.current = succ.meta;
      },
    }
  );

  return (
    <div className="products">
      <Title title={t("mehsullar")} />
      <Container>
        <div className="products__wrapper">
          <ProductsMenu type="external-products" data={data} />
          <div className="products__info">
            <Row>
              {isLoading === false &&
                data !== undefined &&
                data.data.map((item, index) => (
                  <Col lg="4" key={index}>
                    <Link
                      to={
                        slug !== undefined
                          ? `/products-detail/${item.slug}`
                          : `/external-products/category/${item.slug}`
                      }
                    >
                      <div className="productSlider__items">
                        <div className="productSlider__items--img">
                          <img
                            data-fancybox="gallery"
                            data-src={item.image}
                            src={item.image}
                            alt={item.title}
                          />
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
            </Row>
            <div className="d-flex justify-content-center">
              {totalRef.current !== null &&
                totalRef.current.total > totalRef.current.per_page && (
                  <CustomPagination
                    defaultCurrent={1}
                    total={totalRef.current.total}
                    pageSize={totalRef.current.per_page}
                    setPage={setPage}
                  />
                )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default React.memo(ProductsExternal);
