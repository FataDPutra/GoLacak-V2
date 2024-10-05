// resources/js/Components/TableComponent.jsx
import React from "react";

const TableComponent = ({ data, type }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Nama {type === "program" ? "Program" : "Subprogram"}
                    </th>
                    <th>No Rekening</th>
                    {type === "subprogram" && <th>Program</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.nama_program || item.nama_subprogram}</td>
                        <td>{item.no_rekening}</td>
                        {type === "subprogram" && (
                            <td>{item.program.nama_program}</td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
