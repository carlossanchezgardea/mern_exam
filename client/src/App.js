import logo from './logo.svg';
import './App.css';
import {Link, Navigate, Route, Routes,} from "react-router-dom";
import Main from "./components/main";
import NewPet from "./components/newPet";
import EditPet from "./components/editPet";
import ViewPet from "./components/viewPet";

const styles = {
    mainContainer: {
        display: "flex",
        justifyContent: "center"
    },
    routsContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px solid black",
        width: "600px",
        padding: "10px 10px 20px 10px",
        borderRadius: "10px"
    }
}

function App() {
    return (
        <div style={styles.mainContainer}>
            <div style={styles.routsContainer}>
                <div>
                    <h1>Pet Shelter</h1>
                </div>
                <Routes>
                    <Route path="/pets" element={<Main/>}/>
                    <Route path="/" element={<Navigate to="/pets"/>}/>
                    <Route path="/pets/new" element={<NewPet/>}/>
                    <Route path="/pets/:id/edit" element={<EditPet/>}/>
                    <Route path="/pets/:id" element={<ViewPet/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
