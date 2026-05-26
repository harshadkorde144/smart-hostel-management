import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/student";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { listStudents } from "../actions/studentActions";
import Paginate from "../components/paginate";

import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Container,
} from "react-bootstrap";

import StudentsTableView from "./studentTableView";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import AIComplaintBox from "../components/AIComplaintBox";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomeView = ({ match, history }) => {

  const [isGrid, setIsGrid] = useState(true);

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);

  const { loading: userLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);

  const { loading, error, students, page, pages } = studentsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      history.push("/login");
    }

    dispatch(listStudents(keyword, pageNumber));

  }, [dispatch, keyword, pageNumber, history, userInfo, userLoading]);

  const data = {
    labels: ["Occupied", "Available", "Maintenance"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          "#6f42c1",
          "#28a745",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <>

      <Container className="mb-4">

        <Row className="mb-4">

          <Col md={4}>
            <div className="card shadow-lg p-4 text-center">
              <h5>Total Students</h5>
              <h2>120</h2>
            </div>
          </Col>

          <Col md={4}>
            <div className="card shadow-lg p-4 text-center">
              <h5>Rooms Occupied</h5>
              <h2>65</h2>
            </div>
          </Col>

          <Col md={4}>
            <div className="card shadow-lg p-4 text-center">
              <h5>Complaints</h5>
              <h2>14</h2>
            </div>
          </Col>

        </Row>

        <Row className="mb-4">

          <Col md={6}>
            <div className="card p-4 shadow-lg">
              <h4>Hostel Analytics</h4>

              <Pie data={data} />
            </div>
          </Col>

          <Col md={6}>
            <AIComplaintBox />
          </Col>

        </Row>

      </Container>

      <Container>

        <Row className="justify-content-md-center mb-4">

          <Col xs lg="2"></Col>

          <Col md="auto">

            <ButtonGroup>

              {["Grid", "Table"].map((type) => (

                <ToggleButton
                  key={type}
                  type="radio"
                  variant="dark"
                  name="radio"
                  value={type}
                  checked={(isGrid ? "Grid" : "Table") === type}
                  onChange={(e) =>
                    setIsGrid(e.target.value === "Grid")
                  }
                >
                  {type}
                </ToggleButton>

              ))}

            </ButtonGroup>

          </Col>

          <Col xs lg="2"></Col>

        </Row>

      </Container>

      <h1>Students</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : isGrid ? (
        <>
          <Row>

            {students.map((student) => (

              <Col
                key={student._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Student stuentDetails={student} />
              </Col>

            ))}

          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />

        </>
      ) : (
        <>
          <StudentsTableView
            keyword={keyword}
            pageNumber={pageNumber}
          />
        </>
      )}
    </>
  );
};

export default HomeView;