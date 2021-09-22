import React, { useRef } from "react";
import { Button, Modal, ModalBody, Table } from "reactstrap";
import { exportComponentAsPNG } from "react-component-export-image";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function TableModal({ isOpen, toggleModal, data, exportTo }) {
  const ref = useRef();
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalBody>
          <table
            className="table"
            id="table"
            style={{ margin: 0, textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>SubjectName</th>
                <th>date</th>
                <th>time</th>
              </tr>
            </thead>
            <tbody ref={ref}>
              {Array.from(data).map((sub, id) => (
                <tr key={id}>
                  <th scope="row">{id + 1}</th>
                  <td style={{ color: "#000" }}>{sub.subjectName}</td>
                  <td style={{ color: "#000" }}>{sub.date}</td>
                  <td style={{ color: "#000" }}>{sub.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
}
