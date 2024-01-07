import Router from "express";
import systemBroker from "../controllers/system-broker.controller";

const brokerCourt = new systemBroker();
const routerBrokerSystem = Router();
const pathSystemBroker = "/api/v1";

// routerBrokerSystem.post(`${pathSystemBroker}/close-court`, (req, res) => {
//     // todo: route to finish court
//   brokerCourt.closeCourt(req, res);
// });

// todo: view history court
routerBrokerSystem.get(
  `${pathSystemBroker}/view-history/:id`,
  (req, res) => {}
);

export default routerBrokerSystem;
