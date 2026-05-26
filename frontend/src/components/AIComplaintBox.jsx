import React, { useState } from "react";

const AIComplaintBox = () => {

    const [text, setText] = useState("");

    const [priority, setPriority] = useState("");

    const detectPriority = () => {

        const msg = text.toLowerCase();

        if (
            msg.includes("fire") ||
            msg.includes("urgent") ||
            msg.includes("electric") ||
            msg.includes("water leakage")
        ) {

            setPriority("HIGH PRIORITY");

        } else if (
            msg.includes("fan") ||
            msg.includes("wifi") ||
            msg.includes("clean")
        ) {

            setPriority("MEDIUM PRIORITY");

        } else {

            setPriority("LOW PRIORITY");

        }
    };

    return (

        <div className="card p-4 shadow-lg mt-4">

            <h3>AI Complaint Analyzer</h3>

            <textarea
                className="form-control mt-3"
                rows="4"
                placeholder="Enter Complaint..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                className="btn btn-dark mt-3"
                onClick={detectPriority}
            >
                Analyze Complaint
            </button>

            {priority && (

                <h4 className="mt-4">

                    Result:

                    <span
                        style={{
                            color:
                                priority === "HIGH PRIORITY"
                                    ? "red"
                                    : priority === "MEDIUM PRIORITY"
                                        ? "orange"
                                        : "green",

                            marginLeft: "10px",
                        }}
                    >
                        {priority}
                    </span>

                </h4>

            )}

        </div>
    );
};

export default AIComplaintBox;