import { useState } from "react";
import Select from 'react-select';
import "./Admin.css";

export default function Admin() {
    const [data, setData] = useState({});
    const [selectedPhone, setSelectedPhone] = useState("");
    const [editTrainee, setEditTrainee] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [mode, setMode] = useState("select"); // "select" or "new"

    const phoneOptions = Object.keys(data).map(phone => ({
        value: phone,
        label: `${phone} - ${data[phone].name}`,
    }));

    function handlePhoneSelect(option) {
        setSelectedPhone(option.value);
        if (data[option.value]) {
            setEditTrainee(JSON.parse(JSON.stringify(data[option.value])));
        } else {
            setEditTrainee(null);
        }
    }

    function handleManualPhoneChange(e) {
        const phone = e.target.value;
        setSelectedPhone(phone);
        if (data[phone]) {
            setEditTrainee(JSON.parse(JSON.stringify(data[phone])));
        } else {
            setEditTrainee({
                name: "",
                age: "",
                weight: "",
                height: "",
                Fat: "",
                VF: "",
                date: "",
                shldNo: "",
                injuries: "",
                gender: "",
                program: "",
                MM: "",
                water: "",
                bmi: "",
                longName: false,
                exerciseRoutine: Array.from({ length: 6 }, (_, i) => ({
                    heading: "",
                    exerciseList: Array.from({ length: 6 }, () => ({
                        name: "",
                        set: "",
                        rep: "",
                    })),
                })),
            });
        }
    }

    function handleFieldChange(field, value) {
        setEditTrainee(prev => ({ ...prev, [field]: value }));
    }

    function handleExerciseChange(routineIndex, exerciseIndex, field, value) {
        const updated = { ...editTrainee };
        if (exerciseIndex !== null) {
            updated.exerciseRoutine[routineIndex].exerciseList[exerciseIndex][field] = value;
        } else {
            updated.exerciseRoutine[routineIndex][field] = value;
        }
        setEditTrainee(updated);
    }

    function handleSave() {
        if (!selectedPhone) {
            alert("Please enter or select a phone number.");
            return;
        }
        setData(prev => ({
            ...prev,
            [selectedPhone]: editTrainee,
        }));
        alert("Changes saved!");
    }

    function handleFileUpload(event) {
        setUploadError("");
        const file = event.target.files[0];
        if (!file) {
            setData({})
            return
        };

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                if (typeof json !== "object" || Array.isArray(json)) {
                    setUploadError("Invalid JSON format: Expected an object.");
                    return;
                }
                setData(json);
                setSelectedPhone("");
                setEditTrainee(null);
                alert("Data uploaded successfully!");
            } catch (err) {
                setUploadError("Error parsing JSON: " + err.message);
            }
        };
        reader.readAsText(file);
    }

    function handleDownload() {
        const updatedData = {
            ...data,
            [selectedPhone]: editTrainee,
        };
        const jsonStr = JSON.stringify(updatedData, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "traineesData.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className="container">
            <h2>Trainee Editor</h2>

            <div className="upload-div">
                <label className="select-label">Upload Trainees JSON File:</label>
                <label className="custom-file-upload">
                    <input type="file"
                        accept=".json,application/json"
                        onChange={handleFileUpload}
                        aria-label="Upload JSON file"
                    />
                    Upload
                </label>
            </div>
            {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}

            {Object.keys(data).length > 0 &&
                <>
                    <div className="mode-toggle">
                        <label>
                            <input
                                type="radio"
                                name="mode"
                                value="select"
                                checked={mode === "select"}
                                onChange={() => {
                                    setMode("select");
                                    setSelectedPhone("");
                                    setEditTrainee(null);
                                }}
                            />
                            Select Existing Trainee
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="mode"
                                value="new"
                                checked={mode === "new"}
                                onChange={() => {
                                    setMode("new");
                                    setSelectedPhone("");
                                    setEditTrainee({
                                        name: "",
                                        age: "",
                                        weight: "",
                                        height: "",
                                        Fat: "",
                                        VF: "",
                                        date: "",
                                        shldNo: "",
                                        injuries: "",
                                        gender: "",
                                        program: "",
                                        MM: "",
                                        water: "",
                                        bmi: "",
                                        longName: false,
                                        exerciseRoutine: Array.from({ length: 6 }, (_, i) => ({
                                            heading: "",
                                            exerciseList: Array.from({ length: 6 }, () => ({
                                                name: "",
                                                set: "",
                                                rep: "",
                                            })),
                                        })),
                                    });
                                }}
                            />
                            Add New Trainee
                        </label>
                    </div>

                    {mode === "select" && (
                        <div className="field-group">
                            <label>Select Trainee by Phone:</label>
                            <Select
                                options={phoneOptions}
                                value={phoneOptions.find(opt => opt.value === selectedPhone)}
                                onChange={handlePhoneSelect}
                                isSearchable
                                placeholder="Search trainee by phone"
                            />
                        </div>
                    )}

                    {mode === "new" && (
                        <div className="field-group">
                            <label>Enter Trainee Phone Number:</label>
                            <input
                                type="text"
                                placeholder="Phone number"
                                value={selectedPhone}
                                onChange={handleManualPhoneChange}
                            />
                        </div>
                    )}

                    {editTrainee ? (
                        <>
                            <div className="profile-grid">
                                {[
                                    "name", "age", "weight", "height", "Fat", "VF", "date", "shldNo",
                                    "injuries", "gender", "program", "MM", "water", "bmi"
                                ].map(field => (
                                    <div key={field} className="field-group">
                                        <label>{capitalize(field)}</label>
                                        <input
                                            type={["age", "weight", "height", "Fat", "VF", "shldNo", "MM", "water", "bmi"].includes(field) ? "number" : "text"}
                                            value={editTrainee[field]}
                                            onChange={(e) => handleFieldChange(field, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <section className="exercise-section">
                                {editTrainee.exerciseRoutine.map((routine, rIndex) => (
                                    <div key={rIndex} className="exercise-card">
                                        <strong>{`Day ${rIndex + 1}`}</strong>
                                        <input
                                            type="text"
                                            className="routine-heading"
                                            placeholder="Routine Heading"
                                            value={routine.heading}
                                            onChange={(e) =>
                                                handleExerciseChange(rIndex, null, "heading", e.target.value)
                                            }
                                        />
                                        {routine.exerciseList.map((ex, eIndex) => (
                                            <div key={eIndex} className="exercise-row">
                                                <input
                                                    type="text"
                                                    className="exercise-name"
                                                    placeholder="Exercise"
                                                    value={ex.name}
                                                    onChange={(e) =>
                                                        handleExerciseChange(rIndex, eIndex, "name", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Set"
                                                    value={ex.set}
                                                    onChange={(e) =>
                                                        handleExerciseChange(rIndex, eIndex, "set", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Rep"
                                                    value={ex.rep}
                                                    onChange={(e) =>
                                                        handleExerciseChange(rIndex, eIndex, "rep", e.target.value)
                                                    }
                                                />
                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </section>
                            <div className="upload-div">
                                <label className="select-label">Download Trainees JSON File:</label>
                                <button className="save-btn" onClick={handleDownload}>Download</button>
                            </div>
                        </>
                    ) : selectedPhone ? (
                        <p className="no-data">No trainee data found for {selectedPhone}</p>
                    ) : null}
                </>
            }
        </div>
    );
}
