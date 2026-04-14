import { useState } from "react";
import "@/styles/button.css";
import "@/types/typesCrud";
import Card from "@/components/layout/card";
import { createPortal } from "react-dom";

export default function Button() {
    const [toglebutton, setToggleButton] = useState(false);

    return (
        <div>
            <div className="button-panel">
                <button
                    type="button"
                    className="button-primary"
                    onClick={() => setToggleButton(true)}
                >
                    <span className="button-primary-icon" aria-hidden="true">+</span>
                    <span>Add User</span>
                </button>
            </div>
            {toglebutton && createPortal(
                <Card variant="add" data={{ id: 0, nome: "", email: "", senha: "", cargo: "" }} onClose={() => setToggleButton(false)} />
                , document.body
            )}
        </div>
    );
}
