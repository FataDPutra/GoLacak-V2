import React from "react";
import { useForm } from "@inertiajs/react";

const AnggaranForm = ({ anggarans, programs, subprograms, kegiatans }) => {
    const { data, setData, post, reset, errors } = useForm({
        program_id: "",
        sub_program_id: "",
        kegiatan_id: "",
        anggaran_murni: "",
        pergeseran: "",
        perubahan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/anggaran", {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Program</label>
                    <select
                        value={data.program_id}
                        onChange={(e) => setData("program_id", e.target.value)}
                    >
                        <option value="">Pilih Program</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.nama_program}
                            </option>
                        ))}
                    </select>
                    {errors.program_id && <div>{errors.program_id}</div>}
                </div>

                <div>
                    <label>Sub Program</label>
                    <select
                        value={data.sub_program_id}
                        onChange={(e) =>
                            setData("sub_program_id", e.target.value)
                        }
                    >
                        <option value="">Pilih Sub Program</option>
                        {subprograms.map((subprogram) => (
                            <option key={subprogram.id} value={subprogram.id}>
                                {subprogram.nama_subprogram}
                            </option>
                        ))}
                    </select>
                    {errors.sub_program_id && (
                        <div>{errors.sub_program_id}</div>
                    )}
                </div>

                <div>
                    <label>Kegiatan</label>
                    <select
                        value={data.kegiatan_id}
                        onChange={(e) => setData("kegiatan_id", e.target.value)}
                    >
                        <option value="">Pilih Kegiatan</option>
                        {kegiatans.map((kegiatan) => (
                            <option key={kegiatan.id} value={kegiatan.id}>
                                {kegiatan.nama_kegiatan}
                            </option>
                        ))}
                    </select>
                    {errors.kegiatan_id && <div>{errors.kegiatan_id}</div>}
                </div>

                <div>
                    <label>Anggaran Murni</label>
                    <input
                        type="number"
                        value={data.anggaran_murni}
                        onChange={(e) =>
                            setData("anggaran_murni", e.target.value)
                        }
                    />
                    {errors.anggaran_murni && (
                        <div>{errors.anggaran_murni}</div>
                    )}
                </div>

                <div>
                    <label>Pergeseran</label>
                    <input
                        type="number"
                        value={data.pergeseran}
                        onChange={(e) => setData("pergeseran", e.target.value)}
                    />
                    {errors.pergeseran && <div>{errors.pergeseran}</div>}
                </div>

                <div>
                    <label>Perubahan</label>
                    <input
                        type="number"
                        value={data.perubahan}
                        onChange={(e) => setData("perubahan", e.target.value)}
                    />
                    {errors.perubahan && <div>{errors.perubahan}</div>}
                </div>

                <button type="submit">Simpan Anggaran</button>
            </form>

            {/* Tabel Anggaran */}
            <table>
                <thead>
                    <tr>
                        <th>Program</th>
                        <th>Sub Program</th>
                        <th>Kegiatan</th>
                        <th>Anggaran Murni</th>
                        <th>Pergeseran</th>
                        <th>Perubahan</th>
                    </tr>
                </thead>
                <tbody>
                    {anggarans.map((anggaran) => (
                        <tr key={anggaran.id}>
                            <td>
                                {anggaran.program
                                    ? anggaran.program.nama_program
                                    : "N/A"}
                            </td>
                            <td>
                                {anggaran.subprogram
                                    ? anggaran.subprogram.nama_subprogram
                                    : "N/A"}
                            </td>
                            <td>
                                {anggaran.kegiatan
                                    ? anggaran.kegiatan.nama_kegiatan
                                    : "N/A"}
                            </td>
                            <td>Rp{anggaran.anggaran_murni}</td>
                            <td>Rp{anggaran.pergeseran}</td>
                            <td>Rp{anggaran.perubahan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnggaranForm;
