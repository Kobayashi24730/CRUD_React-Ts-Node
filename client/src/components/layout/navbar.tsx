import Button from "@/components/ui/button";
import "@/styles/navbar.css";

export default function Navbar() {
    return (
        <div className="navbar-shell">
            <div className="navbar-container">
                <h1 className="navbar-title">Task List</h1>
                <Button />
            </div>
        </div>
    );
}
