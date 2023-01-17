import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useGetPatientsQuery } from "../store/patientSlice";

function Patient() {
  const { data: patients, isLoading, isSuccess, isError, error } = useGetPatientsQuery();

  function dateFormat(data) {
    let date = new Date(data);
    return date.toLocaleDateString();
  }

  let content;

  if (isLoading) {
    content = <div className="lds-dual-ring"></div>;
  } else if (isSuccess) {
    console.log(patients);

    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Kişi Bilgileri
              </TableCell>
              <TableCell align="center" colSpan={4}>
                Detaylar
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>İsim</TableCell>
              <TableCell>Kaynak Tipi</TableCell>
              <TableCell>Kod</TableCell>
              <TableCell>Sistem</TableCell>
              <TableCell>Son Güncelleme</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {patients.id}
              </TableCell>
              <TableCell>{patients.name[0].family}</TableCell>
              <TableCell>{patients.resourceType}</TableCell>
              <TableCell>{patients.identifier[0].type.coding[0].code}</TableCell>
              <TableCell>{patients.identifier[0].type.coding[0].system}</TableCell>
              <TableCell>{dateFormat(patients.meta.lastUpdated)}</TableCell>
            </TableRow> */}

            {patients.entry.map((patient, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {patient.resource.id}
                  {/* {console.log(patient.resource.identifier ? patient.resource.identifier.map((item) => (item.type ? item.type.coding.map((item) => item.code) : "Yok ")) : "Yok")} */}
                </TableCell>
                {/* <TableCell>{patient.resource.name[0].family}</TableCell> */}
                <TableCell>{patient.resource.name.map((item) => item.family)}</TableCell>
                <TableCell>{patient.resource.resourceType}</TableCell>
                <TableCell>{patient.resource.identifier ? patient.resource.identifier.map((item) => (item.type ? item.type.coding.map((item) => item.code ?? "--") : "-- ")) : "--"}</TableCell>
                <TableCell>{patient.resource.identifier ? patient.resource.identifier.map((item) => (item.type ? item.type.coding.map((item) => item.system ?? "--") : "-- ")) : "--"}</TableCell>
                <TableCell>{dateFormat(patient.resource.meta.lastUpdated)}</TableCell>

                {/* {patient.resource.identifier ? (
                  patient.resource.identifier.map((item) =>
                    item.type ? (
                      item.type.coding.map((item) => (
                        <>
                          <TableCell>{item.code ?? "--"}</TableCell> <TableCell>{item.system ?? "--"}</TableCell>
                        </>
                      ))
                    ) : (
                      <>
                        <TableCell>--</TableCell> <TableCell>--</TableCell>
                      </>
                    )
                  )
                ) : (
                  <>
                    <TableCell>--</TableCell> <TableCell>--</TableCell>
                  </>
                )} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Hasta</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{content}</div>
    </div>
  );
}

export default Patient;
