import { type Rate } from "../utilities/ShippoAPIShipment";
import { Row, Col } from "react-bootstrap";
import "../ShippingForm.css";
import { formatCurrency } from "../utilities/formatCurrency";

interface Props {
  rates: Rate[] | undefined;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
}

export default function ShippingListGroup({
  rates,
  selectedIndex,
  setSelectedIndex,
}: Props) {
  function displayRate(rate: Rate) {
    return (
      <>
        <Row>
          <Col xs={10} md={10}>
            <div>
              <ul style={{ listStyleType: "none", }}>
                <li className="small">{rate.provider + " " + rate.servicelevel.name}</li>
                <li className="small">{formatCurrency(parseFloat(rate.amount))}</li>
                <li className="fst-italic" style={{ fontSize: ".65rem" }}>{rate.durationTerms}</li>
              </ul>
            </div>
          </Col>
          <Col xs={2} md={2}>
            <img src={rate.providerImage75} style={{ marginTop: "10px"}}></img>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <div className="shipping-list-group">
        <ul className="list-group">
          {rates ? (
            <li className="list-group-item trans hovery">
              <h2 style={{ textAlign: "center"}}>
                Choose Carrier and Shipping Rates
              </h2>
            </li>
          ) : null}
          {rates
            ? rates.map((rate, index) => (
                <li
                  key={index}
                  className={
                    selectedIndex === index
                      ? "list-group-item trans hovery sel"
                      : "list-group-item trans hovery"
                  }
                  onClick={() => setSelectedIndex(index)}
                >
                  {displayRate(rate)}
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
}
