import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import ExcelService from './services/ExcelService';

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {

        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsArrayBuffer(file);
    });


    promise.then((data) => {
      console.table(data);
      setItems(data);
    });
  };

  const sendExcel = async () => {
    const response = await ExcelService.send( items )
    console.log( 'user:', response.user );
    console.log( 'date:', response.date );
    console.table( response.products );
  }

  return (
    <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />

        <button 
          onClick={sendExcel}
        >
          Enviar</button>

        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Percentual</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.Codigo}>
                <td>{d.Codigo}</td>
                <td>{d.Percentual}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
}

export default App;
